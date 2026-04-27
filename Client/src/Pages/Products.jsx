import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext, Suspense } from "react";
import apiCall from "../Custom-Hooks/apiCall.js";
import Cards from "../Components/Cards.jsx";
import { toast } from "react-toastify";
import { LoaderContext } from "../Context/LoaderContext.jsx";
import { motion } from "framer-motion";
import SkeletonCard from "../Components/products/SkeletonCard.jsx";
import { FaBolt } from "react-icons/fa";
import ConfirmModal from "../Components/common/ConfirmModal.jsx";
import { ConfirmModalContext } from "../Context/ConfirmModalContext.jsx";
import BackBtn from "../Components/common/BackBtn.jsx";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Products = () => {
  const { productCategory } = useParams();
  const [products, setProducts] = useState([]);
  const { showLoading, hideLoading, isLoading } = useContext(LoaderContext);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const nav = useNavigate();
  const { showConfirmModal, hideConfirmModal } =
    useContext(ConfirmModalContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchProducts = async () => {
      try {
        showLoading();
        const res = await apiCall.get("/products/category/" + productCategory);
        setProducts(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Error fetching products");
      } finally {
        hideLoading();
      }
    };
    fetchProducts();
  }, [productCategory]);

  const buyNowConfirmed = () => {
    if (!user) {
      toast.error("Please login to buy this item");
      onClose();
      return;
    }
    nav("/cartDetails/checkout", {
      state: {
        quantity: 1,
        directBuy: {
          title: buyNowItem.title,
          price: buyNowItem.price,
        },
      },
    });
    hideConfirmModal();
  };
  return (
   <>
         <BackBtn />
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">
      <ConfirmModal
        ConfirmIcon={FaBolt}
        confirmColor="blue"
        confirmBtnTxt="Yes, Buy Now"
        onConfirm={buyNowConfirmed}
        title="Confirm Purchase"
        detail={"Are You Sure? You Want to Buy Now!"}
      />

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400 mb-2">
          Browse
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight capitalize">
          {productCategory}
        </h1>
        {!isLoading && products?.length > 0 && (
          <p className="text-sm text-white/40 mt-2">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        )}
        <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-3" />
      </div>

      {/* Skeleton grid */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <span className="text-6xl">🔍</span>
          <p className="text-white/50 text-lg font-medium">No products found</p>
          <p className="text-white/30 text-sm">
            Try a different category or check back later.
          </p>
        </div>
      )}

      {/* Products grid */}
      {!isLoading && products?.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {products?.map((p, idx) => (
            <motion.div key={p?._id || idx} variants={cardVariant}>
              <Suspense fallback={<SkeletonCard />}>
                <Cards
                  id={p?._id}
                  title={p?.title}
                  rating={p?.rating}
                  price={p?.price}
                  productCategory={productCategory}
                  onBuyNow={(item) => {
                    setBuyNowItem(item);
                    showConfirmModal();
                  }}
                />
              </Suspense>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
   </>
  );
};

export default Products;
