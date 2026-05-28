import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Categories from "../pages/Categories";
import CategoriesHome from "../pages/CategoriesHome";
import Sneakers from "../pages/Sneakers";
import Streetwear from "../pages/Streetwear";
import Denim from "../pages/Denim";
import Accessories from "../pages/Accessories";
import Outerwear from "../pages/Outerwear";
import Trending from "../pages/Trending";


export default function CustomerRoutes({ products, onAddToCart, addToast }) {
  return (
    <Routes>
  
      <Route
        path="/"
        element={
          <ProtectedRoute addToast={addToast}>
            <Home products={products} onAddToCart={onAddToCart} />
          </ProtectedRoute>
        }
      />


      <Route
        path="/categories"
        element={
          <ProtectedRoute addToast={addToast}>
            <Categories />
          </ProtectedRoute>
        }
      >
       
        <Route
          index
          element={<CategoriesHome />}
        />
        
     
        <Route
          path="sneakers"
          element={<Sneakers products={products} onAddToCart={onAddToCart} />}
        />
        <Route
          path="streetwear"
          element={<Streetwear products={products} onAddToCart={onAddToCart} />}
        />
        <Route
          path="denim"
          element={<Denim products={products} onAddToCart={onAddToCart} />}
        />
        <Route
          path="accessories"
          element={<Accessories products={products} onAddToCart={onAddToCart} />}
        />
        <Route
          path="outerwear"
          element={<Outerwear products={products} onAddToCart={onAddToCart} />}
        />
      </Route>

     
      <Route
        path="/trending"
        element={
          <ProtectedRoute addToast={addToast}>
            <Trending products={products} onAddToCart={onAddToCart} />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/contact"
        element={
          <ProtectedRoute addToast={addToast}>
            <Contact addToast={addToast} />
          </ProtectedRoute>
        }
      />

     
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}