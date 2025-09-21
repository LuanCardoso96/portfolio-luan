import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "@/layout/Layout";
import HomePage from "@/pages/HomePage";
import Portfolio from "@/pages/Portfolio";
import Noticias from "@/pages/Noticias";
import NoticiasMarvel from "@/pages/NoticiasMarvel";
import NoticiasFofocas from "@/pages/NoticiasFofocas";
import Vendas from "@/pages/Vendas";
import Admin from "@/pages/Admin";

const router = createBrowserRouter([
  { path: "/", element: <Layout><HomePage /></Layout> },
  { path: "/portfolio", element: <Layout><Portfolio /></Layout> },
  { path: "/noticias", element: <Layout><Noticias /></Layout> },
  { path: "/noticias/marvel-dc", element: <Layout><NoticiasMarvel /></Layout> },
  { path: "/noticias/fofocas", element: <Layout><NoticiasFofocas /></Layout> },
  { path: "/vendas", element: <Layout><Vendas /></Layout> },
  { path: "/admin", element: <Layout><Admin /></Layout> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
