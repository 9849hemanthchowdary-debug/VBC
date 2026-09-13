import React from "react";

import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminProducts from "./pages/admin/Products";


function PrivateWebsite() {
  return <>
    <Navbar />
    <div className="site-content"><Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></div>
    <Footer />
  </>;
}

function App() {
  const Router = import.meta.env.VITE_DEPLOY_TARGET === "github-pages" ? HashRouter : BrowserRouter;
  return <Router><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/*" element={<ProtectedRoute><PrivateWebsite /></ProtectedRoute>} />
  </Routes></Router>;
}

export default App;
