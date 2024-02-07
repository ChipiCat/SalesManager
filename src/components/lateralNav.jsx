import React from "react";
import { useSelector } from "react-redux"; // Importar el hook useSelector
import "../styles/global.css";
import "../styles/lateralNav.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FiInbox } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
import { MdError } from "react-icons/md"; // Importar el icono de error de Material-UI

const LateralNav = () => {
    const navigate = useNavigate();
    const hasNegativeQuantityAlert = useSelector((state) => state.alert.showNegativeQuantityAlert);
    console.log(hasNegativeQuantityAlert);

    return (
        <div className="container-lateral-nav">
            <Button onClick={() => navigate('/')} variant="text" sx={{ width: "80px", height: "80px" }}>
                <div className="box-button-nav">
                    <FiInbox className="icon-nav" />
                    <small>Pedidos</small>
                </div>
            </Button>
            <Button onClick={() => navigate('/inventario')} variant="text" sx={{ width: "80px", height: "80px" }}>
                <div className="box-button-nav">
                {hasNegativeQuantityAlert && (
                        <MdError className="alert-icon" /> // Mostrar el icono de alerta si hay alerta de cantidades negativas
                    )}
                    <CiBoxes className="icon-nav" />
                    <small>Inventario</small>
                </div>
            </Button>
            <Button onClick={() => navigate('/estadisticas')} variant="text" sx={{ width: "80px", height: "80px" }}>
                <div className="box-button-nav">
                    <TbChartInfographic className="icon-nav" />
                    <small>Visitas</small>
                </div>
            </Button>
        </div>
    );
};

export default LateralNav;
