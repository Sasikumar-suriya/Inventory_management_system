// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaBoxOpen, FaShoppingCart, FaChartBar, FaBars } from "react-icons/fa";

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [newPurchase, setNewPurchase] = useState({
//     name: "",
//     vendor: "",
//     purchasePrice: "",
//     sellingPrice: "",
//     quantity: "",
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const { data } = await axios.get("http://localhost:5000/api/products");
//     setProducts(data);
//   };

//   const handleChange = (e) => {
//     setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
//   };

//   const addPurchase = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/purchase", newPurchase);
//     setNewPurchase({ name: "", vendor: "", purchasePrice: "", sellingPrice: "", quantity: "" });
//     fetchProducts();
//   };

//   const sellProduct = async (id) => {
//     await axios.put(`http://localhost:5000/api/sell/${id}`, { quantity: 1 });
//     fetchProducts();
//   };

//   return (
//     <div className="flex h-screen bg-yellow-600">
//       {/* Sidebar */}
//       <div className={`w-75 bg-white text-grey p-4 space-y-6 ${sidebarOpen ? "block" : "hidden"} md:block`}>
//         <h2 className="text-2xl font-bold">Inventory</h2>
//         <nav className="space-y-4">
//           <button onClick={() => setActiveTab("dashboard")} className="flex items-center space-x-2 hover:text-lightGold">
//             <FaChartBar /> <span>Dashboard</span>
//           </button>
//           <button onClick={() => setActiveTab("purchase")} className="flex items-center space-x-2 hover:text-lightGold">
//             <FaShoppingCart /> <span>Add Purchase</span>
//           </button>
//           <button onClick={() => setActiveTab("stock")} className="flex items-center space-x-2 hover:text-lightGold">
//             <FaBoxOpen /> <span>Stock Management</span>
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
        

//         {/* Conditional Content Based on Active Tab */}
//         {activeTab === "dashboard" && (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold text-darkGold mb-4">Overview</h2>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-white p-4 rounded shadow-md">
//                 <h3 className="text-lg font-semibold text-darkGold">Total Products</h3>
//                 <p className="text-2xl">{products.length}</p>
//               </div>
//               <div className="bg-white p-4 rounded shadow-md">
//                 <h3 className="text-lg font-semibold text-darkGold">Total Stock</h3>
//                 <p className="text-2xl">{products.reduce((acc, item) => acc + item.availableStock, 0)}</p>
//               </div>
//               <div className="bg-white p-4 rounded shadow-md">
//                 <h3 className="text-lg font-semibold text-darkGold">Total Sold</h3>
//                 <p className="text-2xl">{products.reduce((acc, item) => acc + item.sold, 0)}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "purchase" && (
//           <div className="p-6 bg-white rounded shadow-md">
//             <h2 className="text-2xl font-semibold text-darkGold mb-4">Add Purchase</h2>
//             <form onSubmit={addPurchase} className="flex flex-row flex-wrap gap-4">
//               <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="image" placeholder="Product image" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="vendor" placeholder="Vendor Name" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="category" placeholder="Category" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="address" placeholder="Address" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="number" name="contactNumber" placeholder="Contact Number" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="date" name="manufactureDate" placeholder="Manufacture Date" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="date" name="expireDate" placeholder="Expire Date" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="number" name="actualPrice" placeholder="Actual Price" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="number" name="retailPrice" placeholder="Retail Price" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="description" placeholder="Description" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="status" placeholder="Status" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="availableStock" placeholder="Available Stock" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="sold" placeholder="Sold" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="text" name="totalStock" placeholder="Total Stock" onChange={handleChange} className="p-2 border rounded" required />
//               <input type="date" name="dateofPurchase" placeholder="Date of Purchase" onChange={handleChange} className="p-2 border rounded" required />
//               <button type="submit" className="col-span-5 bg-black text-white p-2 rounded hover:bg-gold">Add Purchase</button>
//             </form>
//           </div>
//         )}

//         {activeTab === "stock" && (
//           <div className="p-6 px-3 bg-white rounded shadow-md">
//             <h2 className="text-2xl font-semibold text-darkGold mb-2">Stock Management</h2>
//             <table className="w-full table-auto text-left">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Product</th>
//                   <th className="border p-2">Product Image</th>
//                   <th className="border p-2">Vendor</th>
//                   <th className="border p-2">Vendor Name</th>
//                   <th className="border p-2">Address</th>
//                   <th className="border p-2">Contact Nmuber</th>
//                   <th className="border p-2">Actual Price</th>
//                   <th className="border p-2">Retail Price</th>
//                   <th className="border p-2">Stock</th>
//                   <th className="border p-2">Sold</th>
//                   <th className="border p-2">Total Stock</th>
//                   <th className="border p-2">Date of Purchase</th>
//                   <th className="border p-2">Manufacture Date</th>  
//                   <th className="border p-2">Expire Date</th>
//                   <th className="border p-2">Description</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product._id} className="text-center">
//                     <td className="border p-2">{product.name}</td>
//                     <td className="border p-2">{product.vendor}</td>
//                     <td className="border p-2">${product.purchasePrice}</td>
//                     <td className="border p-2">${product.sellingPrice}</td>
//                     <td className="border p-2">{product.availableStock}</td>
//                     <td className="border p-2">
//                       <button onClick={() => sellProduct(product._id)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Sell</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaShoppingCart, FaChartBar, FaBars } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newPurchase, setNewPurchase] = useState({
    name: "",
    image: "",
    vendor: "",
    category: "",
    address: "",
    contactNumber: "",
    quantity: "",
    manufactureDate: "",
    expireDate: "",
    actualPrice: "",
    retailPrice: "",
    description: "",
    status: "",
    availableStock: "",
    sold: "",
    totalStock: "",
    dateofPurchase: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);
  const [vendors, setVendors] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
const [customers, setCustomers] = useState([]);
const [category, setCategory] = useState([]);

const fetchCategories = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/category/create");
    setCategory(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

useEffect(() => {
  fetchCategories();
}, []);

const fetchVendors = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/vendors");
    setVendors(data);
  } catch (error) {
    console.error("Error fetching vendors:", error);
  }
};

useEffect(() => {
  fetchProducts();
  fetchVendors(); // Fetch vendor details
}, []);



  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  const addPurchase = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/purchase", newPurchase);
      setNewPurchase({
        name: "",
        image: "",
        vendor: "",
        category: "",
        address: "",
        contactNumber: "",
        quantity: "",
        manufactureDate: "",
        expireDate: "",
        actualPrice: "",
        retailPrice: "",
        description: "",
        status: "",
        availableStock: "",
        sold: "",
        totalStock: "",
        dateofPurchase: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  const sellProduct = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/sell/${id}`, { quantity: 1 });
      fetchProducts();
    } catch (error) {
      console.error("Error selling product:", error);
    }
  };
  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/suppliers");
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/customers");
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchSuppliers();
    fetchCustomers(); // Fetch supplier details and customer details
  }, []);
  
  // Bar Chart Data
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Available Stock",
        data: products.map((product) => product.availableStock),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Sold Stock",
        data: products.map((product) => product.sold),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  

  return (
    <div className="flex h-screen bg-yellow-600">
      {/* Sidebar */}
      <div className={`w-64 bg-white text-gray-700 p-4 space-y-6 ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-bold">Inventory</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab("dashboard")} className="flex items-center space-x-2 hover:text-yellow-500">
            <FaChartBar /> <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveTab("purchase")} className="flex items-center space-x-2 hover:text-yellow-500">
            <FaShoppingCart /> <span>Add Purchase</span>
          </button>
          <button onClick={() => setActiveTab("vendors")} className="flex items-center space-x-2 hover:text-lightGold">
            <FaBoxOpen /> <span>Vendors</span>
          </button>

          <button onClick={() => setActiveTab("stock")} className="flex items-center space-x-2 hover:text-yellow-500">
            <FaBoxOpen /> <span>Stock Management</span>
          </button>
          <button onClick={() => setActiveTab("category")} className="flex items-center space-x-2 hover:text-yellow-500">
            <FaBoxOpen /> <span>Category</span>
          </button>

          <button onClick={() => setActiveTab("suppliers")} className="flex items-center space-x-2 hover:text-lightGold">
    <FaBoxOpen /> <span>Suppliers</span>
  </button>
  <button onClick={() => setActiveTab("customers")} className="flex items-center space-x-2 hover:text-lightGold">
    <FaBoxOpen /> <span>Customers</span>
  </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <button className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars />
        </button>

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
                <p className="text-2xl">{products.length}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Stock</h3>
                <p className="text-2xl">{products.reduce((acc, item) => acc + item.availableStock, 0)}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Sold</h3>
                <p className="text-2xl">{products.reduce((acc, item) => acc + item.sold, 0)}</p>
              </div>
            </div>
          </div>
          
        )}
        
        {activeTab === "dashboard" && (
                <div className="bg-white p-6 mt-6 rounded shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Stock vs. Sold</h3>
        <Bar data={chartData} />
      </div>
          
        )}
        
        {/* Purchase Form */}
        {activeTab === "purchase" && (
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Purchase</h2>
            <form onSubmit={addPurchase} className="grid grid-cols-2 gap-4">
              {Object.keys(newPurchase).map((key) => (
                <input
                  key={key}
                  type={key.includes("Date") ? "date" : "text"}
                  name={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={newPurchase[key]}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              ))}
              <button type="submit" className="col-span-2 bg-black text-white p-2 rounded hover:bg-yellow-500">
                Add Purchase
              </button>
            </form>
          </div>
        )}
        {activeTab === "vendors" && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-semibold text-darkGold mb-4">Vendor Details</h2>
    <table className="w-full table-auto text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Vendor Name</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map((vendor) => (
          <tr key={vendor._id} className="text-center">
            <td className="border p-2">{vendor.name}</td>
            <td className="border p-2">{vendor.category}</td>
            <td className="border p-2">{vendor.address}</td>
            <td className="border p-2">{vendor.contactNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{activeTab === "suppliers" && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-semibold text-darkGold mb-4">Supplier Details</h2>
    <table className="w-full table-auto text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Supplier Name</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier._id} className="text-center">
            <td className="border p-2">{supplier.name}</td>
            <td className="border p-2">{supplier.category}</td>
            <td className="border p-2">{supplier.address}</td>
            <td className="border p-2">{supplier.contactNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{activeTab === "customers" && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-semibold text-darkGold mb-4">Customer Details</h2>
    <table className="w-full table-auto text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Customer Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Address</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id} className="text-center">
            <td className="border p-2">{customer.name}</td>
            <td className="border p-2">{customer.email}</td>
            <td className="border p-2">{customer.phone}</td>
            <td className="border p-2">{customer.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{/* category */}
{activeTab === "category" && (
  <div className="p-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>
    <table className="w-full table-auto text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Category Name</th>
          <th className="border p-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {category.map((category) => (
          <tr key={category._id} className="text-center">
            <td className="border p-2">{category.categoryName}</td>
            <td className="border p-2">{category.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


        {/* Stock Management Table */}
        {activeTab === "stock" && (
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Management</h2>
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200">
                  {["Product", "Image", "Vendor", "Category", "Stock", "Sold", "Total Stock", "Action"].map((header) => (
                    <th key={header} className="border p-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2"><img src={product.image} alt={product.name} className="w-12 h-12" /></td>
                    <td className="border p-2">{product.vendor}</td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2">{product.availableStock}</td>
                    <td className="border p-2">{product.sold}</td>
                    <td className="border p-2">{product.totalStock}</td>
                    <td className="border p-2">
                      <button onClick={() => sellProduct(product._id)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


