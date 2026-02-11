import { useNavigate } from "react-router-dom";
import apiCall from "../Custom-Hooks/apiCall";

const productCategories = ["Football Boots", "Football Balls", "Football Jerseys", "Gk Gloves"];
const AddProduct = () => {

  const nav = useNavigate('');

    const handleSubmit = async e => {
        e.preventDefault();


        const formData = new FormData(e.target);
        const { productTitle, productPrice, productCategory } = Object.fromEntries(formData);

        try {
          await apiCall.post('/products/create', {title: productTitle, price: productPrice, category: productCategory});
          alert("product added successfully!");
          nav('/products/'+productCategory);
          
        } catch (error) {
          alert(error);
          console.log(error);
        }
    } 
  return (
    <div className="flex flex-col items-center h-[100vh] pt-20 gap-2">

    <h1 className="text-4xl">Enter Product Detail</h1>
        <form className="flex flex-col border border-black/40 p-2 rounded w-110 gap-8" onSubmit={handleSubmit}>
            <div className="flex gap-8 items-center">
                <label htmlFor="productTitle" className="text-sm">Product Title</label>
            <input type="text" name="productTitle" className="border outline-0 rounded p-1 w-[60%]" />
            </div>

          <div className="flex gap-8 items-center">
              <label htmlFor="productPrice" className="text-sm">Product Price</label>
            <input  name="productPrice" type="number" onWheelCapture={e => {e.preventDefault(); e.target.blur()}} className="border outline-0 rounded p-1 w-[60%]"/>
          </div>
          <div className="flex gap-1 items-center ">
              <label htmlFor="productCategory">Product Category</label>
              <select name="productCategory" id="" className="border outline-0 p-1 rounded cursor-pointer">
                <option>Select Product Category</option>
                {productCategories.map((product, idx) => (
                    <option key={idx}  value={product}>{product}</option>
                ))}
              </select>
          </div>
           <div className="flex gap-8 items-center justify-between">
             <button className=" bg-red-500 p-1 outline-0 rounded text-white">Cancel</button>
            <button className="bg-green-500 p-1 outline-0 rounded text-white" type="submit">Submit</button>
           </div>
        </form>
    </div>
  )
}

export default AddProduct;