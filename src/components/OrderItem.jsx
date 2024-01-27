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
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className="order-text-item">
                        <h6>{place}</h6> 
                        <h6>{clientName}</h6>
                        <h6>{day}/{month}/{year}</h6> 
                        <h6>{transformDateToString(visitDate)}</h6> 
                        <h6>{user.name}</h6>
                        <h6>{state}</h6>
                        <h6>{pendingPrice} Bs</h6>
                        
                        {observations.length > 0 ? <IoIosAlert className="icon-button-alert"/> : null}

                        {displayEditButtons ? (
                            <div className="buttons-edit-container">
                                <IconButton className="icon-button">
                                    <MdDelete />
                                </IconButton>
                                <IconButton className="icon-button">
                                    <TbEdit />
                                </IconButton>
                            </div>
                        ) : null}
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                        <TableOrderDetail
                             productList={ProductList} 
                             totalPrice={totalPrice}
                            pendingPrice={pendingPrice}
                            
                             />
                        <div className="text-price-detail">
                        <div className="observations">
                            <h5> Observaciones </h5>
                            {displayEditButtons?(<Button variant="contained" color="primary"> Agregar Observacion</Button>): null}
                             
                        </div>
                        <List>
                            {observations.map((observation) => (
                                <div className="observation-item">
                                    <h6>{observation}</h6>
                                    {displayEditButtons?(<div className="observation-buttons">
                                        <IconButton className="icon-button">
                                            <MdDelete />
                                        </IconButton>
                                        <IconButton className="icon-button">
                                            <TbEdit />
                                        </IconButton>
                                    </div>) : null}
                                </div>
                            ))} 
                        </List>
                        <h6>Precio total: {totalPrice} Bs</h6>
                        
                    </div>
                </AccordionDetails>
                </Accordion>

                <Dialog open={openDeleteDialog}>
                    <DialogTitle>
                        <h1>hola</h1>
                    </DialogTitle>
                </Dialog>
        </>
    );
}

export default OrderItem;