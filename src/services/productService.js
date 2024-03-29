import {firestore} from './firebase-config';
import { collection, getDocs, getDoc , doc, addDoc, updateDoc,deleteDoc} from "firebase/firestore"; 

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

const saveDataProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, product);
    console.log("Product written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
}

const decrementStock = async (idProduct, quantity) => {
  const product = await getProductById(idProduct);
  const newStock = product.stock - quantity;
  try {
    await updateDoc(doc(firestore, "Producto", idProduct), {
      stock: newStock
    });
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
}

const verifyStockAvailable = async (idProduct, quantity) => {
  const product = await getProductById(idProduct);
  if (product.stock >= quantity) {
    return true;
  }else{
    return false;
  }
}

const updateProduct = async (productId, updatedProduct) => {
  try {
    const productRef = doc(firestore, 'Producto', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      await updateDoc(productRef, updatedProduct);
      console.log(`Product with ID ${productId} updated successfully`);
    } else {
      console.log('No such product!');
      
    }
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;

  }
}

const deleteProduct = async (productId) => {
  try {
    const productRef = doc(firestore, 'Producto', productId);
    await deleteDoc(productRef);
    console.log(`Producto con ID ${productId} eliminado correctamente.`);
  } catch (error) {
    console.error("Error al eliminar el producto: ", error);
    throw error;
  }
};


export {getProductById, getAllProducts, saveDataProduct, updateProduct, decrementStock, verifyStockAvailable, deleteProduct};
