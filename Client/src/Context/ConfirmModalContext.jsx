import { useState } from "react";
import { createContext } from "react";

export const ConfirmModalContext = createContext();

export const ConfirmModalContextProvider = ({children}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showConfirmModal = () => {
        setIsModalOpen(true);
    }
    const hideConfirmModal = () => {
        setIsModalOpen(false);
    }
    return <ConfirmModalContext.Provider value={{isModalOpen, showConfirmModal, hideConfirmModal}}>
        {children}
    </ConfirmModalContext.Provider>
}