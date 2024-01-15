import {firestore} from './firebase-config';
import { collection, getDocs, getDoc , doc} from "firebase/firestore"; 

const productsCollection = collection(firestore, 'Producto');

const getProductById = async (id) => {

    const idString = String(id);
    const idNumber = idString.replace(/\s/g, '');
    try {
        const productRef = doc(firestore, 'Producto', idNumber);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          return { id: productSnap.id, ...productSnap.data() };
        } else {
          console.log('No such product!');
          return null;
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
        throw error;
      }
}

const getAllProducts = async () => {
    try {
      const snapshot = await getDocs(productsCollection);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
};

export {getProductById, getAllProducts};