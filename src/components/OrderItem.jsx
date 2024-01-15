import React, { useEffect, useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableOrderDetail from "./TableOrderDetail";

import "../styles/OrderItem.css";
import "../styles/global.css";
import { getUserById } from "../services/userService";

const OrderItem = (props) => {
    
    const [state, setState] = useState(props.state);
    const [date, setDate] = useState(props.date);
    const [clientName, setClientName] = useState(props.clientName);
    const [place, setPlace] = useState(props.place);

    const [ProductList, setProductList] = useState(props.ProductList);
    const [totalPrice, setTotalPrice] = useState(props.totalPrice);
    const [pendingPrice, setPendingPrice] = useState(props.pendingPrice);
    const [idUserSeller, setIdUserSeller] = useState(props.idUserSeller);

    const [day, setDay] = useState(date.toDate().getDate());
    const [month, setMonth] = useState(date.toDate().getMonth() + 1);
    const [year, setYear] = useState(date.toDate().getFullYear());

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserById(idUserSeller);
            setUser(data);
        };
        fetchData();
    }, []);

    console.log(pendingPrice, "ProductList --- juas");

    return (
        <>
            <Accordion style={{width: '100%'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className="order-text-item">
                        <h6>{state}</h6>
                        <h6>{day}/{month}/{year}</h6>
                        <h6>{clientName}</h6>
                        <h6>{place}</h6>
                        <h6>{user.name}</h6>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                        <TableOrderDetail
                             productList={ProductList} 
                             totalPrice={totalPrice}
                            pendingPrice={pendingPrice}
                             />
                </AccordionDetails>
                </Accordion>
        </>
    );
}

export default OrderItem;