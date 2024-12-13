import React from "react";
import Header from "./Components/Header"; // Import your Header component
import Footer from "./Components/Footer";


import AppRouter from "./allRoutes"


import { BrowserRouter } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import Home from "./Components/Home";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    
    <BrowserRouter>
    
    <AppRouter/>
    
  </BrowserRouter>

  );
}

export default App;
