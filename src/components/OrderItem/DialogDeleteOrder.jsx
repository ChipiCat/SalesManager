import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { Button, DialogActions } from "@mui/material";
import { deleteOrder } from "../../services/orderService";

const DialogDeleteOrder = ({order, openDeleteDialog, setOpenDeleteDialog}) => {
    
    const handleClose = () => {
        console.log("Eliminando pedido");
        deleteOrder(order.id);
        setOpenDeleteDialog(false);
    }

    return (
        <div>
            <Dialog fullWidth open={openDeleteDialog} >
                <DialogTitle>
                    ¿Está seguro que desea eliminar el pedido?
                </DialogTitle>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default DialogDeleteOrder;