import { IProduct } from "../../../types/products";

async function getProductData(id: number) {
  const rawResponse = await fetch(`https://fakestoreapi.com/products/${id}`);

  const response = await rawResponse.json();

  return response;
}

export default async function ProductItemScreen({ params }) {
  const product: IProduct = await getProductData(params.id);

  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-[30px] my-[60px]">
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
            <strong className="text-slate-500">{product.rating.rate}</strong> of
            rating obtained from{" "}
            <strong className="text-slate-500">{product.rating.count}</strong>{" "}
            reviews
          </p>
        </div>
        <p className="text-xl leading-lg">{product.description}</p>
      </div>
    </div>
  );
}
