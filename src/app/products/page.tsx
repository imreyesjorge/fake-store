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

export default function ProductsScreen() {
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

  const rows = products;

  const renderCell = (item, columnKey) => {
    if (columnKey === "actions") {
      return (
        <div className="flex gap-[10px]">
          <Button variant="flat" color="danger" isIconOnly>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </Button>
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
            onSortChange={(event) => {
              console.log(event);
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} allowsSorting>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
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
