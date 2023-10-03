"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { IProduct } from "../../../types/products";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

async function getProductData(id: number) {
  const rawResponse = await fetch(`https://fakestoreapi.com/products/${id}`);

  const response = await rawResponse.json();

  return response;
}

export default function ProductItemScreen({ params }) {
  const [product, setProduct] = useState<IProduct>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const asyncSetProduct = async () => {
      const response = await getProductData(params.id);
      setProduct(response);
    };

    asyncSetProduct();
  }, []);

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const rawResponse = await fetch(
        `https://fakestoreapi.com/products/${params.id}`,
        { method: "PUT", body: JSON.stringify(product) }
      );

      toast.success(`Product ${params.id} updated!`);
    } catch (error) {
      toast.error(`An error ocurred while updating the product.`);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    product && (
      <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-[30px] my-[60px]">
        <Modal
          isOpen={isModalOpen}
          size="lg"
          onClose={() => setIsModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>Create a new user</ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleFormSubmit}
              >
                <fieldset className="flex flex-col gap-[10px]">
                  <legend className="mb-[10px]">Update product</legend>
                  <Input
                    placeholder="Title"
                    name="title"
                    variant="bordered"
                    value={product.title}
                    onChange={handleValueChange}
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    variant="bordered"
                    value={String(product.price)}
                    onChange={handleValueChange}
                  />
                  <Input
                    placeholder="Description"
                    name="description"
                    variant="bordered"
                    value={product.description}
                    onChange={handleValueChange}
                  />
                  <Input
                    placeholder="Image"
                    name="image"
                    variant="bordered"
                    value={product.image}
                    onChange={handleValueChange}
                  />
                  <Input
                    placeholder="Category"
                    name="category"
                    variant="bordered"
                    value={product.category}
                    onChange={handleValueChange}
                  />
                </fieldset>
                <Button type="submit" color="primary" className="mb-[20px]">
                  Update product
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        <img
          src={product.image}
          className="w-full lg:w-[200px]  rounded-[10px]"
        ></img>
        <div>
          <div className="mb-[20px]">
            <small className="text-xs font-medium">{product.id}</small>
            <h1 className="text-2xl font-bold mb-[5px]">{product.title}</h1>
            <p className="text-xs font-light py-[5px] px-[10px] bg-slate-700 rounded inline">
              {product.category}
            </p>
          </div>
          <div className="mb-[30px] flex flex-col gap-[5px]">
            <p className="text-4xl font-bold">${product.price}</p>
            <p className="text-xs text-slate-600">
              <strong className="text-slate-500">{product.rating.rate}</strong>{" "}
              of rating obtained from{" "}
              <strong className="text-slate-500">{product.rating.count}</strong>{" "}
              reviews
            </p>
          </div>
          <p className="text-xl leading-lg">{product.description}</p>
          <Button
            color="primary"
            className="mt-[20px]"
            onClick={() => setIsModalOpen(true)}
          >
            Update Product
          </Button>
        </div>
      </div>
    )
  );
}
