import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";

export default function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 7500 }}
      />
      <Router>
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route path="/products/search/:category/:name" Component={Products} />
          <Route path="/dashboard/:action" Component={Dashboard} />
          <Route path="/Authentication/:action" Component={Authentication} />
        </Routes>
      </Router>
    </Provider>
  );
}
