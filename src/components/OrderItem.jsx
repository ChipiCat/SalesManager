import React, { useEffect, useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableOrderDetail from "./TableOrderDetail";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoIosAlert } from "react-icons/io";

import "../styles/OrderItem.css";
import "../styles/global.css";
import { getUserById } from "../services/userService";
import { Button, Dialog, DialogTitle, IconButton, List } from "@mui/material";
import DialogDeleteOrder from "./OrderItem/DialogDeleteOrder";
import ObservacionesSection from "./OrderItem/ObservationsSection";

const OrderItem = ({displayEditButtons, order}) => {
    const props = order;
    const orderId = props.idOrder;
    
    const [state, setState] = useState(props.state);
    const [date, setDate] = useState(props.date);
    const [clientName, setClientName] = useState(props.clientName);
    const [place, setPlace] = useState(props.place);

    const [ProductList, setProductList] = useState(props.ProductList);
    const [totalPrice, setTotalPrice] = useState(props.totalPrice);
    const [pendingPrice, setPendingPrice] = useState(props.pendingPrice);
    const [idUserSeller, setIdUserSeller] = useState(props.idUserSeller);
    const [observations, setObvservations] = useState(props.observations);
    const [economicState, setEconomicState] = useState(props.economicState);
    const [visitDate, setVisitDate] = useState(props.visitDate);
 
    const [day, setDay] = useState(date.toDate().getDate());
    const [month, setMonth] = useState(date.toDate().getMonth() + 1);
    const [year, setYear] = useState(date.toDate().getFullYear());

    const [user, setUser] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserById(idUserSeller);
            setUser(data);
        };
        fetchData();
    }, []);

    const transformDateToString = (date) =>{
        let dateObject = date.toDate(); // convierte el timestamp de Firebase en una instancia de Date
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <Accordion style={{width: '100%'}}>
                <AccordionSummary
                    
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className="order-text-item">
                        <div className="box-details">
                            <div className="container-text-details"> 
                                <h6>{place}</h6> 
                                <h6>{clientName}</h6>
                                <h6 className="right-value">{day}/{month}/{year}</h6> 
                            </div>
                            <div className="container-text-details">
                                <h6>{transformDateToString(visitDate)}</h6> 
                                <h6>{user.name}</h6>
                                <h6 className="right-value">{state}</h6>
                                
                            </div>
                            <h6>{pendingPrice} Bs</h6>
                            <div className="container-icons-item-details">
                            {observations.length > 0 ? <IoIosAlert className="icon-button-alert"/> : null}

                            {displayEditButtons ? (
                                <div className="buttons-edit-container">
                                    <IconButton className="icon-button-edit" onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    setOpenDeleteDialog(true);
                                                                                }}>
                                        <MdDelete />
                                    </IconButton>
                                    <IconButton className="icon-button-edit" onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    console.log("abriendo delete dialog");
                                                                                }}>
                                        <TbEdit />
                                    </IconButton>
                                </div>
                            ) : null}
                        </div>
                        </div>
                        
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                        <TableOrderDetail
                             productList={ProductList} 
                             totalPrice={totalPrice}
                            pendingPrice={pendingPrice}
                            
                             />
                        <div className="text-price-detail">
                        <ObservacionesSection order={order} displayEditButtons={displayEditButtons}/>
                        <h6>Precio total: {totalPrice} Bs</h6>
                        
                    </div>
                </AccordionDetails>
                </Accordion>

                <DialogDeleteOrder order={order} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog}/>

        </>
    );
}

export default OrderItem;