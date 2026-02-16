import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, Suspense } from "react";
import apiCall from "../Custom-Hooks/apiCall.js";
import Cards from "../Components/Cards.jsx";
import { toast } from "react-toastify";
import { LoaderContext } from "../Context/LoaderContext.jsx";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Skeleton card shown while loading
const SkeletonCard = () => (
  <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-white/8" />
    <div className="p-4 space-y-3">
      <div className="h-3.5 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/8 rounded w-1/2" />
      <div className="h-5 bg-white/10 rounded w-1/3 mt-1" />
      <div className="flex gap-2 pt-1">
        <div className="flex-1 h-9 bg-blue-600/20 rounded-xl" />
        <div className="flex-1 h-9 bg-white/8 rounded-xl" />
      </div>
    </div>
  </div>
);

const Products = () => {
  const { productCategory } = useParams();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const { showLoading, hideLoading } = useContext(LoaderContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchProducts = async () => {
      try {
        setLoading(true);
        showLoading();
        const res = await apiCall.get("/products/category/" + productCategory);
        setProducts(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Error fetching products");
      } finally {
        setLoading(false);
        hideLoading();
      }
    };
    fetchProducts();
  }, [productCategory]);

  return (
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400 mb-2">Browse</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight capitalize">
          {productCategory}
        </h1>
        {!loading && products.length > 0 && (
          <p className="text-sm text-white/40 mt-2">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        )}
        <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-3" />
      </div>

      {/* Skeleton grid */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <span className="text-6xl">🔍</span>
          <p className="text-white/50 text-lg font-medium">No products found</p>
          <p className="text-white/30 text-sm">Try a different category or check back later.</p>
        </div>
      )}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {products.map((p, idx) => (
            <motion.div key={p?._id || idx} variants={cardVariant}>
              <Suspense fallback={<SkeletonCard />}>
                <Cards
                  id={p?._id}
                  title={p?.title}
                  rating={p?.rating}
                  price={p?.price}
                  productCategory={productCategory}
                />
              </Suspense>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Products;