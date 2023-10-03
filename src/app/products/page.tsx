"use client";

import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useFetcher } from "../../hooks/useFetcher";
import { IProduct } from "../../types/products";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsScreen() {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [sortDescriptor, setSortDescriptor] = useState<any>(undefined);

  const { data: products, isLoading: productsLoading } = useFetcher<IProduct[]>(
    {
      url: "https://fakestoreapi.com/products",
    }
  );

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = (item, columnKey) => {
    if (columnKey === "actions") {
      return (
        <div className="flex gap-[10px]">
          <Button
            as={Link}
            variant="flat"
            color="primary"
            isIconOnly
            href={`/products/${item.id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 rotate-[45deg]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </div>
      );
    }

    return getKeyValue(item, columnKey);
  };

  useEffect(() => {
    console.log(sortDescriptor)

    if (!sortDescriptor && products) {
      setSortedProducts(products);
      return;
    }

    if (products) {
      const sorted = products.sort((a, b) => {
        if (sortDescriptor.direction === "ascending") {
          return b[sortDescriptor.column] - a[sortDescriptor.column];
        }
        return a[sortDescriptor.column] - b[sortDescriptor.column];
      });
      setSortedProducts(sorted);
    }
  }, [products, sortDescriptor]);

  return (
    <div className="w-full my-[80px] flex justify-center items-center">
      {productsLoading && <Spinner />}
      {products && (
        <div>
          <div className="mb-[40px]">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-slate-600">You’re now seeing all the products</p>
          </div>
          <Table
            aria-label="Products Table"
            onSortChange={(sortStatus) => {
              setSortDescriptor(sortStatus);
            }}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} allowsSorting>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={sortedProducts}>
              {(item) => (
                <TableRow>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
