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
import SettingsPage from "../pages/Settings";
import { useAuth } from "../context/AuthContext";

const CustomerRoutes = () => {
  const { addToast } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute addToast={addToast}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute addToast={addToast}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
              <SettingsPage />
            </div>
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
        <Route index element={<CategoriesHome />} />
        <Route path="sneakers" element={<Sneakers />} />
        <Route path="streetwear" element={<Streetwear />} />
        <Route path="denim" element={<Denim />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="outerwear" element={<Outerwear />} />
      </Route>

      <Route
        path="/trending"
        element={
          <ProtectedRoute addToast={addToast}>
            <Trending />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute addToast={addToast}>
            <Contact />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default CustomerRoutes;