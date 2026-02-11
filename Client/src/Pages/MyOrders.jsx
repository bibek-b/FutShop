import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { UserContext } from "../Context/UserContext"

const MyOrders = () => {
  const { user } = useContext(UserContext)
  const { carts } = useContext(CartContext)

  const userOrders = carts?.filter(c => c.userId === user?._id);

 const totalPrice = userOrders.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div>
        <p>Name: Bibek Bk</p>
        <p>Roll No: 05</p>
      </div>
      {userOrders && userOrders.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Unit Price</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map(c => (
              <tr key={c.id}>
                <td className="border border-gray-300 px-4 py-2">{c.title}</td>
                <td className="border border-gray-300 px-4 py-2">{c.quantity || 1}</td>
                <td className="border border-gray-300 px-4 py-2">{c.price}</td>
                <td className="border border-gray-300 px-4 py-2">{c.price * (c.quantity || 1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-right">
          Total Price: {totalPrice} 
          </tfoot>
        </table>
      ) : (
        <span className="text-gray-500 mt-4">No Orders Found!</span>
      )}
    </div>
  )
}

export default MyOrders
