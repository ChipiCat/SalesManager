import {firestore} from './firebase-config';
import { collection, getDocs } from "firebase/firestore"; 

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

export {getAllOrders};