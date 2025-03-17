import { useState } from "react";
import axios from "axios";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/category/create", {
        name: categoryName,
      });

      if (response.status === 201) {
        setMessage("Category created successfully!");
        setCategoryName(""); // Clear input field
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setMessage("Failed to create category.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create a Category</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-2 border rounded-md mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default Category;
