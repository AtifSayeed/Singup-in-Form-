import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter basename="/">
          <Nav className="ml-auto" />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
};

export default App;
