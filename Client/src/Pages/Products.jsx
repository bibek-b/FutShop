import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import apiCall from "../Custom-Hooks/apiCall.js";
import Cards from "../Components/Cards.jsx";
import { Suspense } from "react";

const Products = () => {
  const { productCategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchProductByCategory = async () => {
      const res = await apiCall.get("/products/category/" + productCategory);
      setProducts(res.data);
    };
    fetchProductByCategory();
  }, [productCategory]);
  return (
    <div className="min-h-[100vh]  p-5 space-y-4">
      <h1 className="font-bold  text-5xl">{productCategory}</h1>
      <div>
        <p>Name: Bibek Bk</p>
        <p>Roll No: 05</p>
      </div>
      <div className="flex gap-7 flex-wrap">
        {products.length > 0 ? products.map((p, idx) => (
          <Suspense fallback={<p>Loading Products...</p>}>
            <Cards
            key={p?._id || idx}
            id={p?._id}
            // placeholderImage={placeholderImage}
            title={p?.title}
            // discount={10}
            rating={p?.rating}
            price={p?.price}
            productCategory={productCategory}
          />
          </Suspense>
        )) : <p>No products found for this category!</p>}
      </div>
    </div>
  );
};

export default Products;
