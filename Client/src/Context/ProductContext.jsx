import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false);
    const [isBuyNow, setIsBuyNow] = useState(false);

    return (
        <ProductContext.Provider value={{showModal, setShowModal, isBuyNow, setIsBuyNow}}>
            {children}
        </ProductContext.Provider>
    )
}