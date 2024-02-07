import { Dialog, Tab, Table, TableContainer } from "@mui/material";
import React, { useEffect, useState} from "react";
import { DialogTitle, DialogContent,TableHead, TableCell, TableRow, TableBody  } from "@mui/material";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { updateProductListStateOfOrder } from "../../services/orderService";

import "../../styles/OrderItem/UpdateStateOrderItem.css";

const UpdateStateOrderItem = ({orderId,ProductList, setProductList, openUpdateDialog, setOpenUpdateDialog, products}) => {

    const [productListBackup, setProductListBackup] = useState([]);
    

    useEffect(() => {
        const newProductListBackup = [];
        ProductList.forEach((product) => {
            newProductListBackup.push({...product});
        });
        setProductListBackup(newProductListBackup);
    }, [openUpdateDialog]);

    const handleSwitchChange = (index) => (event) => {
        const newProductListBackup = [...productListBackup];
        newProductListBackup[index].state = event.target.checked ? "Entregado" : "Pendiente";
        setProductListBackup(newProductListBackup);
    };

    const updateProductListToOrder = async () => {
        setProductList(productListBackup);
        console.log(productListBackup, "product list backpu")
        console.log(orderId, "order id")
        await updateProductListStateOfOrder(orderId, productListBackup);
        setOpenUpdateDialog(false);
    }
    
    return (
        <Dialog fullWidth open={openUpdateDialog}>
            <DialogTitle>Actualizar estado de orden</DialogTitle>
            <DialogContent>
             <TableContainer>
                <Table sx={{minWidth: "0px"}} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Entregado</TableCell>
                        </TableRow>
                    </TableHead>
                   
                    <TableBody>
                        {productListBackup.map((product, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {products[product.idProduct]?.name}
                                </TableCell>
                                <TableCell> {product.quantity} </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={product.state !== "Pendiente"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onChange={handleSwitchChange(i)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))    
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="buttons-update-form">
                <Button variant="outlined" onClick={() => {setOpenUpdateDialog(false);} }> Cancelar </Button>
                <Button variant="contained" onClick={() => updateProductListToOrder()} > Actualizar </Button>
             </div>
            </DialogContent>
        </Dialog>
    );
    }

export default UpdateStateOrderItem;