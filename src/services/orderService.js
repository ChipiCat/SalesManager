import {firestore} from './firebase-config';
import { collection, getDocs } from "firebase/firestore"; 

const ordersCollection = collection(firestore, 'Orders');
const ITEMS_PER_PAGE = 10;

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


const getNumberOfOrders = async () => {
  try {
    const snapshot = await getDocs(ordersCollection);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
};


const getNextPage = async (lastVisibleOrder) => {
  try {
    const snapshot = await getDocs(query(ordersCollection, orderBy('timestamp', 'desc'), startAfter(lastVisibleOrder), limit(ITEMS_PER_PAGE)));
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return { orders, lastVisible };
  } catch (error) {
    console.error('Error getting next page: ', error);
    throw error;
  }
};

export { getAllOrders, getNextPage, getNumberOfOrders };
