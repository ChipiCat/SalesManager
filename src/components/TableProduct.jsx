import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch y useSelector
import { setShowNegativeQuantityAlert } from "../redux/alertSlice"; // Importar la acción para establecer la alerta
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
import { deleteProduct, getAllProducts, updateProduct } from "../services/productService"; 
import "../styles/global.css";
import "../styles/InventaryPage.css";

const TableProduct = (props) => {
  const [productList, setProductList] = useState(props.productList);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({name: "", price: 0, stock: 0});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch(); // Obtener la función dispatch de Redux

  useEffect(() => {
    fetchData();
  }, [props.productList]);

  const fetchData = async () => {
    try {
      const data = await getAllProducts();
      setProductList(data);

      // Verificar si hay cantidades negativas y establecer la alerta en Redux
      const hasNegativeQuantity = data.some(product => product.stock < 0);

      dispatch(setShowNegativeQuantityAlert(hasNegativeQuantity));
      console.log(hasNegativeQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (product) => {
    try {
      await deleteProduct(product.id);
      console.log(`Producto con ID ${product.id} eliminado correctamente.`);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
    setOpenDeleteDialog(false);
  };

  const handleSaveEdit = async () => {
    await updateProduct(selectedProduct.id, selectedProduct);
    fetchData();
    setEditDialogOpen(false);
  };

  const setNameSelectedProduct = (name) => {
    setSelectedProduct({...selectedProduct, name: name});
  }

  const setPriceSelectedProduct = (price) => {
    setSelectedProduct({...selectedProduct, price: price});
  }

  const setStockSelectedProduct = (stock) => {
    setSelectedProduct({...selectedProduct, stock: stock});
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList && productList.map((product) => (
            <TableRow 
              key={product.id} 
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: product.stock < 0 ? 'rgba(255, 0, 0, 0.2)' : 'inherit' // Aplicar fondo rojo si la cantidad es negativa
              }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell> {product.price} Bs</TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={() => {setSelectedProduct(product); setEditDialogOpen(true)}} style={{ color: '#FFAE35' }}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => {setSelectedProduct(product); setOpenDeleteDialog(true);}} style={{ color: '#FFAE35' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog fullWidth open={editDialogOpen}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <form className="form-product">
              <TextField fullWidth variant="standard" label="Nombre" value={selectedProduct.name} onChange={(e) => setNameSelectedProduct(e.target.value)}/>
              <TextField fullWidth type="number" variant="standard" label="Precio(Bs)" value={selectedProduct.price} onChange={(e) => setPriceSelectedProduct(e.target.value)} />
              <TextField fullWidth type="number" variant="standard" label="Cantidad" value={selectedProduct.stock} onChange={(e) => setStockSelectedProduct(e.target.value)} />
              <div className="buttons-form">
                <Button variant="outlined" onClick={() => setEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleSaveEdit()}>
                  Guardar
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
    </Dialog>

    <Dialog open={openDeleteDialog} >
        <DialogTitle>Eliminar {selectedProduct.name} </DialogTitle>
        <DialogContent>
          <p>¿Está seguro que desea eliminar este producto?</p>
          <div className="buttons-form">
            <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleDelete(selectedProduct)}>
              Eliminar
            </Button>
          </div>
        </DialogContent>
    </Dialog>

    </>
  );
}

export default TableProduct;
