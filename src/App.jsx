import { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ToastContainer from "./components/Toast/ToastContainer";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Sneakers from "./pages/Sneakers";
import Streetwear from "./pages/Streetwear";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
const products = [
  {
    id: 1,
    name: "Tokyo Oversized Tee",
    category: "Streetwear",
    price: 2199,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Seoul Cargo Pants",
    category: "Bottomwear",
    price: 2899,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Indie Crop Hoodie",
    category: "Women",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Orbit Chunky Sneakers",
    category: "Sneakers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Urban Denim Jacket",
    category: "Outerwear",
    price: 3599,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Monsoon Co-ord Set",
    category: "Ethnic Fusion",
    price: 3199,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Retro Varsity Jacket",
    category: "Streetwear",
    price: 4299,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Layered Chain + Ring Set",
    category: "Accessories",
    price: 1499,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const featuredProducts = useMemo(() => products, []);

  // Check if user is logged in on app load
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleAddToCart = () => setCartCount((count) => count + 1);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar 
        cartCount={cartCount} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        addToast={addToast}
      />
      
      <Routes>
       
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home products={featuredProducts} onAddToCart={handleAddToCart} />
            </ProtectedRoute>
          } 
        />
        
        
        <Route path="/sneakers" element={<Sneakers products={featuredProducts} onAddToCart={handleAddToCart} />} />
        <Route path="/streetwear" element={<Streetwear products={featuredProducts} onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} addToast={addToast} />} />
        <Route path="/register" element={<Register addToast={addToast} />} />
        <Route path="/contact" element={<Contact addToast={addToast} />} />
      </Routes>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
}