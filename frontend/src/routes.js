import React from "react";
import {  
    Routes,
    Route,
     } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NewTravel from "./pages/new-travel";
import SeeTravel from "./pages/see-travel/intex";
import EditTravel from "./pages/edit-travel/intex";
import SignUp from "./pages/sign-up";


const AllRoutes = () => {
    return (
        <Routes >    
          <Route path="/" element={<Login/>} />
          <Route path="/cadastro" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/nova-viagem" element={<NewTravel/>} />
          <Route path="/viagem/:id" element={<SeeTravel/>} />
          <Route path="/editar-viagem/:id" element={<EditTravel/>} />
        </Routes>
    )
}

export default AllRoutes;