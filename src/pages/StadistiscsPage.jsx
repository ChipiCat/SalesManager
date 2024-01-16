import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavBarComponent";
import LateralNav from "../components/lateralNav";
import { Button, Modal, Box, TextField,Dialog, DialogTitle, DialogContent } from "@mui/material";
import TableProduct from "../components/TableProduct";
import { getAllProducts, saveDataProduct } from "../services/productService";
import "../styles/global.css";
import "../styles/InventaryPage.css";

const StadistiscsPage = () => {
    return (
        <div className="page">
            <NavbarComponent/>
            <div className="body-page">
                <LateralNav/>
                <div className="content-page container">
                    <div className="head-content-tab">
                        <h2>Estadistica</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StadistiscsPage;