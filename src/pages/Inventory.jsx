import { useState } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", retailPrice: "", sellingPrice: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!product.name || !product.retailPrice || !product.sellingPrice) return alert("Fill all fields");
    setProducts([...products, product]);
    setProduct({ name: "", retailPrice: "", sellingPrice: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory Management</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input type="text" name="name" placeholder="Product Name" className="border p-2 mr-2" value={product.name} onChange={handleChange} />
        <input type="number" name="retailPrice" placeholder="Retail Price" className="border p-2 mr-2" value={product.retailPrice} onChange={handleChange} />
        <input type="number" name="sellingPrice" placeholder="Selling Price" className="border p-2 mr-2" value={product.sellingPrice} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>

      <h2 className="text-lg font-bold mb-2">Stock</h2>
      <ul>{products.map((p, i) => <li key={i}>{p.name} - ₹{p.retailPrice} / ₹{p.sellingPrice}</li>)}</ul>
    </div>
  );
};

export default Inventory;
