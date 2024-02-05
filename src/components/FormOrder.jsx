
"use client";
import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/FormOrder.css";
import "../styles/global.css";
import { getAllProducts, verifyStockAvailable } from "../services/productService";
import { NumberInput } from "keep-react";
import { validateInputNumber, validateText } from "../utils/Validator";
import { uploadOrder } from "../services/orderService";
import { useSelector } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const FormOrder = ({openForm, setOpenForm}) => {

    const [place, setPlace] = useState("");
    const [nameCient, setNameCient] = useState("");
    const [productList, setProductList] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0);
    const [visitDate, setVisitDate] = useState(dayjs());

    const [openListProduct, setOpenListProduct] = useState(false);
    const [productsAvailable, setProductsAvailable] = useState([]);
    const [openQuantityDialog, setOpenQuantityDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [quantityCurrentProduct, setQuantityCurrentProduct] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorQuantityMessage, setErrorQuantityMessage] = useState("");

    const [idUser, setIdUser] = useState("");

    const globalIdUser = useSelector((state) => state.user.idUser);

    const fetchData = async () => {
        const data = await getAllProducts();
        setProductsAvailable(data);
    }


    const handleQuantity = (product) => {
        setCurrentProduct(product);
        setOpenQuantityDialog(true);

        console.log(currentProduct, "product");
    }

    const addToProductList = (product, quantity) => {
        setProductList(prevProductList => [...prevProductList, {product, quantity}]);
        setOpenQuantityDialog(false);
        setOpenListProduct(false);
        setQuantityCurrentProduct(0);
      
    }

    const removeItemToTheList = (product) => {
        setProductList(productList.filter((item) => item.product.id !== product.product.id));
    }

    

    const calculateTotalPrice = () => {
        let total = 0;
        productList.forEach((product) => {
            total += product.product.price * product.quantity;
        });
        setTotalPrice(total);   
    }

    const changeQauantity = (quantity) => {
        const quantityString = quantity.toString();
        console.log("\"",quantityString,"\"" , "quantity string");
        const quantityWithoutZero = quantity.replace(/^0+/, '');
        if(validateInputNumber(quantityWithoutZero) || quantityWithoutZero === ""){
            setQuantityCurrentProduct(Number(quantityWithoutZero));
            setErrorQuantityMessage("");
        }else{
            setErrorQuantityMessage("Debe ingresar un numero");
        }
    }

    const saveItemOrder = () => {
        
        if(quantityCurrentProduct === ""){
            setErrorQuantityMessage("Llene todos los campos");
            return;
        }

        if(quantityCurrentProduct === 0){
            setErrorQuantityMessage("La cantidad no puede ser 0");
            return;
        }

        if(Number(quantityCurrentProduct) <= currentProduct.stock){
            addToProductList(currentProduct, quantityCurrentProduct);
            setErrorQuantityMessage("");

        }else{
            setErrorQuantityMessage("La cantidad no puede ser mayor al stock");
        }
    }

    const closeOrder = () => {
        setOpenForm(false);
        setPlace("");
        setNameCient("");
        setProductList([]);
        setTotalPrice(0);
        setErrorMessage("");
    }

    const saveOrder = async() => {
        const stockChecks = productList.map((product) => verifyStockAvailable(product.product.id, product.quantity));
        const stockResults = await Promise.all(stockChecks);

        for (let i = 0; i < stockResults.length; i++) {
            if (!stockResults[i]) {
                setErrorMessage("No hay stock disponible para el producto " + productList[i].product.name);
                fetchData();
                return; // Salir de la función si no hay stock disponible
            }
        }
        if(validateText(place) && validateText(nameCient) && productList.length > 0){
            setErrorMessage("");
            const order = {
                clientName: nameCient,
                date: new Date(),
                idUserSeller: idUser,
                pendingPrice: totalPrice,
                place: place,
                state: 'Incompleto',
                totalPrice: totalPrice,
                ProductList: [
                    ...productList.map((product) => {
                        console.log(product);
                        return {idProduct: product.product.id , quantity: product.quantity, state: "Pendiente"}
                    })
                ],
                visitDate: visitDate.toDate(),
                observations: [],
                economicState: "Por cancelar"
                };
                
            console.log("guardar", order);

            uploadOrder(order);
            closeOrder();
            
        }else{
            setErrorMessage("Debe llenar todos los campos");
        }
    }

    const containsProduct = (product) => {
        let contains = false;
        productList.forEach((item) => {
            if(item.product.id === product.id){
                contains = true;
            }
        });
        return contains;
    }

    

    useEffect(() => {
        calculateTotalPrice();
    }, [productList]);

    useEffect(() => {
           
            fetchData();
        }, []);

    useEffect(() => {
        setIdUser(globalIdUser);
    }, [globalIdUser]);

    return <>
        <Dialog open={openForm} fullWidth={true}>
            <DialogTitle>Formulario de pedido</DialogTitle>
            <DialogContent>
                <form className="form-product">
                    <TextField fullWidth onChange={(e) => setPlace(e.target.value)} label="Lugar de entrega" variant="standard" />
                    <TextField  fullWidth onChange={(e) => setNameCient(e.target.value)} label="Cliente(a)" variant="standard" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={"Fecha de visita"} sx={{width:"100%"}} value={visitDate} onChange={(newValue) => {setVisitDate(newValue)}} />
                    </LocalizationProvider>
                    <div className="title-section-add-product">
                        <h6>Productos</h6>
                        <Button onClick={() => setOpenListProduct(true)} variant="contained" color="primary">Agregar</Button>
                    </div>
                    
                    
                    <List sx={{width: "100%", bgcolor: "#EDF0F7"}}>
                        <ListItem>
                        <div className="product-item-list">
                            <h6>Nombre</h6>
                            <h6 className="detail-item">Precio</h6>
                            <h6 className="detail-item-center" >Cantidad</h6>
                         </div>
                         <div className="space"><h6>Accion</h6></div>
                        </ListItem>   
                        {productList.map((product) => (
                            <ListItem key={product.product.id}>
                                <div className="product-item-list">
                                    <h6>{product.product.name}</h6>
                                    <h6 className="detail-item"> {product.product.price} Bs</h6>
                                    <h6 className="detail-item-center">{product.quantity} </h6>
                                </div>
                                <Button onClick={() => removeItemToTheList(product)} variant="contained" color="primary">Eliminar</Button>
                            </ListItem>
                        ))    
                        }
                    </List>
                    <p className="total-price-text">Precio Total: {totalPrice} Bs</p>
                    <p className="error-message">{errorMessage}</p>
                    <div className="buttons-form">
                        <Button onClick={() => closeOrder()} variant="outlined" color="primary">Cancelar</Button>
                        <Button onClick={() => saveOrder() }variant="contained" color="primary">Guardar</Button>
                    </div>
                </form>


                <Dialog fullWidth open={openListProduct}>
                    <DialogTitle>Lista de productos</DialogTitle>
                    <DialogContent>
                        <List sx={{width: "100%", bgcolor: "#EDF0F7", marginBottom:"10px"}}>
                            <ListItem>
                            <div className="product-item-list">
                                <h6>Nombre</h6>
                                <h6 className="detail-item">Precio</h6>
                                <h6 className="detail-item-center" >Cantidad</h6>
                            </div>
                            <div className="space"><h6>Accion</h6></div>
                            </ListItem>   
                            {productsAvailable.map((product) => (
                                <ListItem  key={product.id}>
                                    <div className="product-item-list">
                                        <h6>{product.name}</h6>
                                        <h6 className="detail-item"> {product.price} Bs</h6>
                                        <h6 className="detail-item-center">{product.stock} </h6>
                                    </div>
                                    <Button disabled={containsProduct(product)} onClick={() => handleQuantity(product)} variant="contained" color="primary">Agregar</Button>
                                    
                                </ListItem>
                                    
                                ))}
                        </List>
                        <Button onClick={() => setOpenListProduct(false)} variant="outlined" color="primary">Cancelar</Button>
                    </DialogContent>
                </Dialog>    
                <Dialog  open={openQuantityDialog}>
                    <DialogTitle>Ingrese la cantidad</DialogTitle>
                        <DialogContent>
                            <p>Producto: {currentProduct.name}</p>
                            <p>Disponible: {currentProduct.stock}</p>
                            <TextField type="text" fullWidth variant="standard" label="Cantidad" 
                                value={quantityCurrentProduct} 
                                InputProps={{
                                    inputProps: {
                                    pattern: '[0-9]*',
                                    inputMode: 'numeric',
                                    },
                                }}
                                onChange={(e) => changeQauantity(e.target.value)}/>
                            <p className="error-message">{errorQuantityMessage}</p>
                            <div className="buttons-form">
                                <Button onClick={() => setOpenQuantityDialog(false)} variant="outlined" color="primary">Cancelar</Button>
                                <Button onClick={() => saveItemOrder()} variant="contained" color="primary">Guardar</Button> 
                            </div>
                        </DialogContent>
                </Dialog>                
            </DialogContent>
        </Dialog>
    </>
}


export default FormOrder;