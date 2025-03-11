import { Link } from "react-router-dom";

// const LandingPage = () => {
//   return (
    // <div className="min-h-screen bg-gray-100">
    //   {/* Hero Section */}
    //   <header className="bg-blue-600 text-white py-20 text-center">
    //     <h1 className="text-4xl font-bold">Smart Inventory Management</h1>
    //     <p className="mt-4 text-lg">Track, manage, and optimize your inventory with ease.</p>
    //     <div className="mt-6">
    //       <Link to="/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md mr-4">Get Started</Link>
    //       <Link to="/login" className="border border-white px-6 py-2 rounded-lg font-semibold">Login</Link>
    //     </div>
    //   </header>

    //   {/* Features Section */}
    //   <section className="py-16 px-6 text-center">
    //     <h2 className="text-3xl font-bold">Why Choose Our Inventory System?</h2>
    //     <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    //       <FeatureCard 
    //         title="Real-Time Tracking"
    //         description="Monitor stock levels and movements in real-time."
    //       />
    //       <FeatureCard 
    //         title="Barcode Scanning"
    //         description="Fast & easy scanning for accurate inventory management."
    //       />
    //       <FeatureCard 
    //         title="Reports & Analytics"
    //         description="Get insights with automated reports & analytics."
    //       />
    //     </div>
    //   </section>

    //   {/* Call to Action */}
    //   <section className="bg-blue-600 text-white py-12 text-center">
    //     <h2 className="text-2xl font-bold">Ready to Simplify Your Inventory?</h2>
    //     <p className="mt-2">Sign up today and take control of your stock management.</p>
    //     <Link to="/signup" className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md">Get Started Now</Link>
    //   </section>

    //   {/* Footer */}
    //   <footer className="text-center py-4 text-gray-600">
    //     © {new Date().getFullYear()} Inventory Management | All rights reserved.
    //   </footer>
    // </div>
//   );
// };

// // Feature Card Component
// const FeatureCard = ({ title, description }) => {
//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h3 className="text-xl font-bold">{title}</h3>
//       <p className="mt-2 text-gray-600">{description}</p>
//     </div>
//   );
// };

// export default LandingPage;

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <header className="bg-yellow-600 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">Smart Inventory Management</h1>
          <p className="mt-4 text-lg">Track, manage, and optimize your inventory with ease.</p>
          <div className="mt-6">
            <Link to="/create" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md mr-4">Get Started</Link>
            <Link to="/login" className="border border-white px-6 py-2 rounded-lg font-semibold">Login</Link>
          </div>
        </header>
  
        {/* Features Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose Our Inventory System?</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Real-Time Tracking"
              description="Monitor stock levels and movements in real-time."
            />
            <FeatureCard 
              title="Barcode Scanning"
              description="Fast & easy scanning for accurate inventory management."
            />
            <FeatureCard 
              title="Reports & Analytics"
              description="Get insights with automated reports & analytics."
            />
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="bg-yellow-600 text-white py-12 text-center">
          <h2 className="text-2xl font-bold">Ready to Simplify Your Inventory?</h2>
          <p className="mt-2">Sign up today and take control of your stock management.</p>
          <Link to="/create" className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md">Get Started Now</Link>
        </section>
  
        {/* Footer */}
        <footer className="text-center py-4 text-gray-600">
          © {new Date().getFullYear()} Inventory Management | All rights reserved.
        </footer>
      </div>
    );
  };
  const FeatureCard = ({ title, description }) => {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default LandingPage; // ✅ Ensure this is included
  