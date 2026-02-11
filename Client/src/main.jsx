import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartContextProvider } from './Context/CartContext.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { ProductContextProvider } from './Context/ProductContext.jsx'
import { WishlistProvider } from './Context/WishListContex.jsx'

createRoot(document.getElementById('root')).render(
 <UserContextProvider>
 <WishlistProvider>
   <ProductContextProvider>
    <CartContextProvider>
    <StrictMode>
    <App />
  </StrictMode>
  </CartContextProvider>
   </ProductContextProvider>
   </WishlistProvider>
 </UserContextProvider>
)
