import React from "react";
import "../styles/global.css";
import "../styles/OrderList.css";
import { getAllOrders, getNumberOfOrders, getPage } from "../services/orderService";
import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { Pagination, Stack } from "@mui/material";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    let numberOrders = 0;
    const itemsPerPage = 10;
    const [numberPages, setNumberPages] = useState(0);
    const [lastIdInPage, setLastIdInPage] = useState("example");
    useEffect(() => {
        const fetchData = async () => {
            try{

                let data;

                numberOrders = await getNumberOfOrders();
                setNumberPages(Math.ceil(numberOrders/10));
                console.log(numberPages, "orders --- juas");

                if(numberOrders < 10){
                    data = await getPage(0, numberOrders-1,"null-first");
                }else{
                    data = await getPage(0, 10,"null-first");
                }

                setOrders(data);
                setLastIdInPage(() => data?.[data.length-1]?.id);
                
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(orders.length, "orders leeeeenght --- juas");
    
    const handlePagination = (event, value) => {
        let initIndex = (value-1)*10;
        let endIndex = value*10;
        const fetchData = async () => {
            const data = await getPage(initIndex, endIndex,lastIdInPage);
            setOrders(data);
            setLastIdInPage(() => data?.[data.length-1]?.id);
        }

        fetchData();

        console.log("pagina cambiada: pag:" , value, "initIndex: ", initIndex, "endIndex: ", endIndex);
    }

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
            <div className="pagination-component">
                <Stack spacing={2}>
                    <Pagination 
                        count={numberPages} 
                        variant="outlined" 
                        shape="rounded" 
                        onChange={handlePagination}
                        />
                </Stack>
            </div>
        </div>
    );
}

export default OrderList;