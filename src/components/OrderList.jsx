import React from "react";
import "../styles/global.css";
import "../styles/OrderList.css";
import { getAllOrders, getNumberOfOrders } from "../services/orderService";
import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { Pagination, Stack } from "@mui/material";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    let numberOrders = 0;
    const [numberPages, setNumberPages] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrders();
            numberOrders = await getNumberOfOrders();
            setOrders(data);
            setNumberPages = Math.ceil(numberOrders/10);
            console.log(numberPages, "orders --- juas");
        };
        fetchData();
    }, []);

   
    
    return (
        <div className="order-list">
            {orders.map((order) => (
                <OrderItem 
                key={order.id}
                state={order.state} 
                date={order.date} 
                clientName={order.clientName}
                place={order.place}
                ProductList={order.ProductList}
                totalPrice={order.totalPrice}
                pendingPrice={order.pendingPrice}
                idUserSeller={order.idUserSeller}
                />
            ))}
            <Stack spacing={2}>
                <Pagination count={numberPages} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    );
}

export default OrderList;