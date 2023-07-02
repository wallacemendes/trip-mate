import React from "react";
import {  
    Routes,
    Route,
     } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NewTravel from "./pages/new-travel";


const AllRoutes = () => {
    return (
        <Routes >    
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/nova-viagem" element={<NewTravel/>} />
        </Routes>
    )
}

export default AllRoutes;