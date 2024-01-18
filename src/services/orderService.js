import {firestore} from './firebase-config';
import { collection, getDocs, getDoc, addDoc, query, limit, startAfter, orderBy, doc, where, deleteDoc} from "firebase/firestore"; 
import { decrementStock } from './productService';

const ordersCollection = collection(firestore, 'Orders');

const getAllOrders = async () => {
    try {
      const snapshot = await getDocs(ordersCollection);
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return orders;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      throw error;
    }
};

const order = {
  clientName: 'Lou Juasd',
  date: '2021-10-10',
  idUserSeller: 'oUrTfLjw65lIYvj3q6q7',
  pendingPrice: 1000,
  place: 'Casa',
  state: 'Pendiente',
  totalPrice: 1000,
  ProductList: [
    {
      idProduct: 'RbJxQUHgiAx9uvVFGrnr',
      quantity: 1,
      state: 'Pendiente',
    },
    {
      idProduct: 'RbJxQUHgiAx9uvVFGrnr',
      quantity: 123,
      state: 'Cancelado',
    }
  ]};


const uploadOrder = async (order) => {
  try {
    const docRef = await addDoc(ordersCollection, order);
    order.ProductList.forEach(async (product) => {
      decrementStock(product.idProduct, product.quantity);
    });
    console.log("Order written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding order: ", error);
    throw error;
  }
}




const getNumberOfOrders = async () => {
  try {
    const snapshot = await getDocs(ordersCollection);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
};

const getNumberOfOrdersByUser = async (idUser) => {
  try {
    const q = query(ordersCollection, where("idUserSeller", "==", idUser));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
}

const getPageByUser = async (indexStart, indexFinish, idPrev, idUser) => {
  const idString = idPrev.replace(/\s/g, '');

  console.log('idPrev: ', idString);
  try {
    let q = query(ordersCollection, where("idUserSeller", "==", idUser), orderBy('date'));
    if (indexStart > 0) {
      const startAfterDoc = await getDoc(doc(ordersCollection, idString));
      q = query(q, startAfter(startAfterDoc));
    }
    q = query(q, limit(indexFinish - indexStart));

    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

const getPage = async (indexStart, indexFinish, idPrev) => {
  const idString = idPrev.replace(/\s/g, '');
  try {
    let q = query(ordersCollection, orderBy('date'));
    if (indexStart > 0) {
      const startAfterDoc = await getDoc(doc(ordersCollection, idString));
      q = query(q, startAfter(startAfterDoc));
    }
    q = query(q, limit(indexFinish - indexStart));

    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const deleteAllOrders = async () => {
  try {
    const snapshot = await getDocs(ordersCollection);
    snapshot.docs.forEach(async (doc) => {
      await deleteOrder(doc.id);
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
}



const deleteOrder = async (id) => {
  try {
    await deleteDoc(doc(ordersCollection, id));
  } catch (error) {
    console.error("Error deleting order: ", error);
    throw error;
  }
}



export { getAllOrders, getPage, getNumberOfOrders, uploadOrder
  , getPageByUser, getNumberOfOrdersByUser, deleteAllOrders, deleteOrder};
