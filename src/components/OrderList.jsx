import React from "react";
import "../styles/global.css";
import "../styles/OrderList.css";
import { getAllOrders, getNumberOfOrders, getNumberOfOrdersByUser, getPage, getPageByUser } from "../services/orderService";
import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { Pagination, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const OrderList = (props) => {
    const filterByUser = props.filterByUser;
    const [orders, setOrders] = useState([]);
    let numberOrders = 0;
    const itemsPerPage = 10;
    const [numberPages, setNumberPages] = useState(0);
    const [lastIdInPage, setLastIdInPage] = useState("example");
    
    let globalIdUser = useSelector((state) => state.user.idUser);

    useEffect(() => {
        const fetchData = async () => {
            try{
                let data;
                if(filterByUser){
                    console.log(globalIdUser, " FILTERRING BY USER ----Id");
                    numberOrders = await getNumberOfOrdersByUser(globalIdUser);
                }else{
                    numberOrders = await getNumberOfOrders();
                }
            
                setNumberPages(Math.ceil(numberOrders/10));
                console.log(numberPages, "orders --- juas");

                if(numberOrders < 10){
                    if(filterByUser){
                        data = await getPageByUser(0, numberOrders,"null-first", globalIdUser);
                    }else{
                        data = await getPage(0, numberOrders,"null-first");
                    }
                }else{
                    if(filterByUser){
                        data = await getPageByUser(0, 10,"null-first", globalIdUser);
                    }else{
                        data = await getPage(0, 10,"null-first");
                
                    }
                }
                setOrders(data);
                setLastIdInPage(() => data?.[data.length-1]?.id);
                
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();

    }, [globalIdUser]);     

    console.log(orders.length, "orders leeeeenght --- juas");
    
    const handlePagination = (event, value) => {
        let initIndex = (value-1)*10;
        let endIndex = value*10;
        const fetchData = async () => {
            let data;
            if(filterByUser){
                data = await getPageByUser(initIndex, endIndex,lastIdInPage, globalIdUser);
            }else{
                data = await getPage(initIndex, endIndex,lastIdInPage);
            }
            
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
                displayEditButtons={filterByUser}
                order={order}
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