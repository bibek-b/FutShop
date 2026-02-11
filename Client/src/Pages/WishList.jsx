import { useWishlist } from "../Context/WishListContex";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>


      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => (
            <li key={item.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>Price: ₹{item.price}</p>
                <p>Rating: ⭐ {item.rating.toFixed(1)}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
