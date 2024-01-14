import React from "react";
import { getAllOrders } from "../services/orderService";
import { useState,useEffect } from "react";
import { NavbarComponent } from "../components/NavBarComponent";
import "../styles/global.css";
import "../styles/OrderPage.css";
import LateralNav from "../components/lateralNav";

const OrderPage = () => {

    const [orders, setOrders] = useState("");
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const ordersData = await getAllOrders();
            setOrders(ordersData);
          } catch (error) {
            console.error('Error al obtener las órdenes:', error);
          }
        };
        fetchOrders();
      }, []); 

    console.log(orders);
    return (
        <div className="page">
            <NavbarComponent/>
            <div className="body-page">
                <LateralNav/>
            </div>
        </div>
    );
};

export default OrderPage;