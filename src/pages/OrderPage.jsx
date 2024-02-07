import React from "react";
import { getAllOrders } from "../services/orderService";
import { useState,useEffect } from "react";
import { NavbarComponent } from "../components/NavBarComponent";
import "../styles/global.css";
import "../styles/OrderPage.css";
import LateralNav from "../components/lateralNav";
import { Tabs, Tab, Button, Dialog, DialogContent } from "@mui/material";
import {useSelector} from "react-redux";

import OrderList from "../components/OrderList";
import FormOrder from "../components/FormOrder";

const OrderPage = () => {
    const [idUser, setIdUser] = useState("");
    const [valueTab, setValueTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    }

    const globalIdUser = useSelector((state) => state.user.idUser);

    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        setIdUser(globalIdUser);
    }, [globalIdUser]);

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
                          <Button onClick={() => setOpenForm(true)} variant="contained" color="primary">Nuevo Pedido</Button>
                       </div>
                       <FormOrder openForm={openForm} setOpenForm={setOpenForm}/>  
                        <OrderList filterByUser={true}/>
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