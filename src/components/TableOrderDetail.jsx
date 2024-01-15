import React, { useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, } from "react";
import { getProductById, getAllProducts} from "../services/productService";



const TableOrderDetail = (props) => {
    const productList = props.productList;
    const totalPrice = props.totalPrice;
    const pendingPrice = props.pendingPrice;
    const [products, setProducts] = useState({});

    useEffect(() => {
        const fetchProductNames = async () => {
            const productData = {};
            for (const product of productList) {
                const data = await getProductById(product.idProduct);
                productData[product.idProduct] = data;
            }
            setProducts(productData);
        };
        fetchProductNames();
    }, [productList]);

    const calculateSubtotal = (quantity, price) => {
        return quantity * price;
    }

    
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio por unidad</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Estado)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList? productList.map((orderItem) => (
            <TableRow key={orderItem.quantity} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {products[orderItem.idProduct]?.name}
              </TableCell>
              <TableCell align="right"> {products[orderItem.idProduct]?.price} Bs</TableCell>
              <TableCell align="right"> {orderItem.quantity} </TableCell>
              <TableCell align="right"> {calculateSubtotal(orderItem.quantity, products[orderItem.idProduct]?.price)} Bs </TableCell>
              <TableCell align="right"> {orderItem.state} </TableCell>
            </TableRow>
          )): null}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default TableOrderDetail;