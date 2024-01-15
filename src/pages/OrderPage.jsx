import React from "react";
import { getAllOrders } from "../services/orderService";
import { useState,useEffect } from "react";
import { NavbarComponent } from "../components/NavBarComponent";
import "../styles/global.css";
import "../styles/OrderPage.css";
import LateralNav from "../components/lateralNav";
import { Tabs, Tab, Button } from "@mui/material";

import OrderList from "../components/OrderList";

const OrderPage = () => {

    const [valueTab, setValueTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    }

    return (
        <div className="page">
            <NavbarComponent/>
            <div className="body-page">
                <LateralNav/>
                <div className="content-page container">
                  <Tabs value={valueTab} sx={{width:"100%"}} variant="fullWidth" onChange={handleChangeTab} >
                      <Tab label="MIS PEDIDOS" />
                      <Tab label="TOTAL PEDIDOS " />
                  </Tabs>

                  {valueTab === 0 && (
                    <div className="content-tab">
                       <div className="head-content-tab">
                          <h2>Mis Pedidos</h2>
                          <Button variant="contained" color="primary">Nuevo Pedido</Button>
                        </div>
                    </div>
                  )}
                  {valueTab === 1 && (
                     <div className="content-tab">
                        <div className="head-content-tab">
                          <h2>Total Pedidos</h2>
                        </div>
                        <OrderList/>  
                   </div>
                  )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage; 