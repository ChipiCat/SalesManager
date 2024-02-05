import { Dialog, Tab, Table, TableContainer } from "@mui/material";
import React from "react";
import { DialogTitle, DialogContent,TableHead, TableCell, TableRow, TableBody  } from "@mui/material";
import Switch from "@mui/material/Switch";

const UpdateStateOrderItem = ({order, openUpdateDialog, setOpenUpdateDialog}) => {
    
    return (
        <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
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
                        {order.ProductList.map((product) => (
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell> {product.quantity} </TableCell>
                                <TableCell>
                                    <Switch
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))    
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </DialogContent>
        </Dialog>
    );
    }

export default UpdateStateOrderItem;