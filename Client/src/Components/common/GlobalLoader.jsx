import { useContext } from "react";
import { LoaderContext } from "../../Context/LoaderContext";
import { LineWave } from "react-loader-spinner";
import { useEffect } from "react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const GlobalLoader = () => {
  const { isLoading } = useContext(LoaderContext);

 useLockBodyScroll(isLoading)
  return (
    isLoading && (
      <div className=" fixed inset-0 flex items-center justify-center bg-black/30 bg-blue">
        <LineWave
          visible={true}
          height="180"
          width="180"
          color="#2b7fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  );
};

export default GlobalLoader;
