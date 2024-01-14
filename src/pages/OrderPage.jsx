import React from "react";
import { getAllOrders } from "../services/orderService";
import { useState,useEffect } from "react";
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
        <div>
            <h2>Listado de Órdenes</h2>
         
        </div>
    );
};

export default OrderPage;