"use client";

import {
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
  ];

  const rows = products;

  return (
    <div className="my-[80px]">
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
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
