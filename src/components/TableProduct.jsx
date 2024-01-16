import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Button } from "@mui/material";
import "../styles/global.css";
import "../styles/InventaryPage.css";

const TableProduct = (props) => {
  const productList = props.productList;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (productId) => {
    setSelectedProduct(productId);
    setEditDialogOpen(true);
  };

  const handleDelete = (productId) => {
    console.log(`Eliminar producto con ID: ${productId}`);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList ? productList.map((product) => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell> {product.price} Bs</TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={() => handleEdit(product.id)} style={{ color: '#FFAE35' }}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(product.id)} style={{ color: '#FFAE35' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <form className="form-product">
              <TextField fullWidth variant="standard" label="Nombre" value={selectedProduct.name}/>
              <TextField
                fullWidth
                type="number"
                variant="standard"
                label="Precio"
                value={selectedProduct.price}
              />
              <TextField
                fullWidth
                type="number"
                variant="standard"
                label="Cantidad"
                value={selectedProduct.stock}
              />
              <div className="buttons-form">
                <Button variant="outlined" onClick={handleCloseEditDialog}>
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                  Guardar
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TableProduct;