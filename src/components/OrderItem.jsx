import React, { useEffect, useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableOrderDetail from "./TableOrderDetail";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

import "../styles/OrderItem.css";
import "../styles/global.css";
import { getUserById } from "../services/userService";
import { IconButton } from "@mui/material";

const OrderItem = (props) => {
    const orderId = props.idOrder;
    const displayEditButtons = props.displayEditButtons;
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
                        {displayEditButtons?(<div className="buttons-edit-container">
                            <IconButton className="icon-button">
                                <MdDelete />
                            </IconButton>
                            <IconButton className="icon-button">
                                <TbEdit />
                            </IconButton>
                        </div>):(<></>)}
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