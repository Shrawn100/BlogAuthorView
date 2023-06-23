import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorPage from "./Author";
import Blog from "./Blog";
function Router() {
  return (
    <BrowserRouter basename="/BlogAuthorView">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/author/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
