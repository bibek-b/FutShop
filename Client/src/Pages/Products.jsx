import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import apiCall from "../Custom-Hooks/apiCall.js";
import Cards from "../Components/Cards.jsx";
import { Suspense } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LoaderContext } from "../Context/LoaderContext.jsx";

const Products = () => {
  const { productCategory } = useParams();
  const [products, setProducts] = useState([]);
  const { showLoading, hideLoading } = useContext(LoaderContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchProductByCategory = async () => {
      try {
        showLoading();
        const res = await apiCall.get("/products/category/" + productCategory);
        setProducts(res.data);
      } catch (error) {
        toast.error(error.response.data.error || "Error fetching products")
      } finally {
        hideLoading()
      }
    };
    fetchProductByCategory();
  }, [productCategory]);
  return (
    <div className="min-h-[100vh]  p-5 space-y-4">
      <h1 className="font-bold  text-5xl">{productCategory}</h1>
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
