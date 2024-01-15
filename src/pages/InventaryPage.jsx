import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavBarComponent";
import LateralNav from "../components/lateralNav";
import { Button, Modal, Box, TextField,Dialog, DialogTitle, DialogContent } from "@mui/material";
import TableProduct from "../components/TableProduct";
import { getAllProducts, saveDataProduct } from "../services/productService";
import "../styles/global.css";
import "../styles/InventaryPage.css";

const InventaryPage = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const[nombre, setNombre] = useState("");
    const[precio, setPrecio] = useState(0);
    const[cantidad, setCantidad] = useState(0);

    let ressetComponent = true;

    const fetchData = async () => {
        try{
            const data = await getAllProducts();
            setProducts(data);
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const saveProduct = () => {
        const product = {
            name: nombre,
            price: precio,
            stock: cantidad,
            currency: "Bs"
        }

        saveDataProduct(product);
        setOpenModal(false);
        setNombre("");
        setPrecio(0);
        setCantidad(0);

        fetchData();
        
    }

    return (
        <div className="page">
            <NavbarComponent/>
            <div className="body-page">
                <LateralNav/>
                <div className="content-page container">
                    <div className="head-content-tab">
                        <h2>Inventario</h2>
                        <Button onClick={() => setOpenModal(true)} variant="contained" color="primary">Nuevo Producto</Button>
                    </div>
                    <TableProduct productList={products}/>
                </div>

                <Dialog 
                    open={openModal}
                    
                >    
                    <DialogTitle> Nuevo Producto </DialogTitle>
                    <DialogContent>
                        <form onSubmit={saveProduct} className="form-product">
                            <TextField fullWidth variant="standard" label="Nombre" 
                                value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            <TextField fullWidth type="number" variant="standard" label="Precio" 
                                value={precio} onChange={(e) => setPrecio(e.target.value)}   />
                            <TextField fullWidth type="number"  variant="standard" label="Cantidad"
                                value={cantidad} onChange={(e) => setCantidad(e.target.value)}     />
                            <div className="buttons-form">
                                <Button variant="outlined" onClick={() => setOpenModal(false)} > Cancelar </Button>
                                <Button onClick={saveProduct} variant="contained" color="primary">Guardar</Button>
                            </div>
                        </form>
                    </DialogContent>
                   
                </Dialog>
            </div>
        </div>
    );
}

export default InventaryPage;