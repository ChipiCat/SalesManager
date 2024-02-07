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
import { MdPlace } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { MdUpdate } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

import "../styles/OrderItem.css";
import "../styles/global.css";
import { getUserById } from "../services/userService";
import { Button, Dialog, DialogTitle, IconButton, List } from "@mui/material";
import DialogDeleteOrder from "./OrderItem/DialogDeleteOrder";
import ObservacionesSection from "./OrderItem/ObservationsSection";
import { Update } from "@mui/icons-material";
import UpdateStateOrderItem from "./OrderItem/UpdateStateOrderItem";
import { updateStateOrder } from "../services/orderService";

const OrderItem = ({displayEditButtons, order}) => {
    const props = order;
   
    
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
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [products, setProducts] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserById(idUserSeller);
            setUser(data);
        };
        fetchData();
        console.log("Cambios en order detectados");

       
    }, [order]);

    useEffect(() => {
        let newState = "Completo";
        for (let product of ProductList) {
            if (product.state !== "Entregado") {
                newState = "Incompleto";
                break;
            }
        }
        setState(newState);
        updateStateOrder(order.id, newState);
    }, [ProductList]);

    const transformDateToString = (date) =>{
        let dateObject = date.toDate(); // convierte el timestamp de Firebase en una instancia de Date
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <Accordion style={{width: '100%', backgroundColor: "#F2F2F2"}}>
                <AccordionSummary
                    
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className="order-text-item">
                        <div className="box-details">
                            <div className="container-text-details"> 
                                <h6><MdPlace /> {place}</h6> 
                                <h6><FaUser/> {clientName}</h6>
                            </div>
                            <div className="container-text-details">
                                <h6 className="right-value"> <GiArchiveRegister/> {day}/{month}/{year}</h6> 
                                <h6><MdUpdate/> {transformDateToString(visitDate)}</h6> 
                                <h6><FaUserTie/> {user && user.name}</h6>
                            </div>
                            <div className="container-text-details">
                                <h6 className="right-value"> <FaBook/> {state}</h6>
                                <h6> <MdAttachMoney/> {pendingPrice} Bs</h6>
                            </div>
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
                                                                                    setOpenUpdateDialog(true);
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
                             products={products}
                             setProducts={setProducts}
                            
                             />
                        <div className="text-price-detail">
                        <ObservacionesSection order={order} displayEditButtons={displayEditButtons}/>
                        <h6>Precio total: {totalPrice} Bs</h6>
                        
                    </div>
                </AccordionDetails>
                </Accordion>

                <DialogDeleteOrder order={order} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog}/>
                <UpdateStateOrderItem orderId={order.id} ProductList={ProductList} setProductList={setProductList} products={products} openUpdateDialog={openUpdateDialog} setOpenUpdateDialog={setOpenUpdateDialog}/>
        </>
    );
}

export default OrderItem;