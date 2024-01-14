import React from "react";
import "../styles/global.css";
import "../styles/lateralNav.css";
import {  useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FiInbox } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
const LateralNav = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container-lateral-nav">
            <Button onClick={() => navigate('/')} variant="text" sx={{width:"80px", height:"80px"}}>
                <div className="box-button-nav">
                    <FiInbox className="icon-nav"/>
                    <small>Pedidos</small>
                </div>
            </Button>
            <Button onClick={() => navigate('/inventario')} variant="text" sx={{width:"80px", height:"80px"}}>
                <div className="box-button-nav">
                    <CiBoxes className="icon-nav"/>
                    <small>Inventario</small>
                </div>
            </Button>
            <Button onClick={() => navigate('/estadisticas')} variant="text" sx={{width:"80px", height:"80px"}}>
                <div className="box-button-nav">
                    <TbChartInfographic className="icon-nav"/>
                    <small>Estadisticas</small>
                </div>
            </Button>
        </div>
    );
};

export default LateralNav;
