import {firestore} from './firebase-config';
import { collection, getDocs, getDoc, doc, query, orderBy, limit, startAfter  } from "firebase/firestore"; 

const ordersCollection = collection(firestore, 'Users');

const getUserById = async (id) => {
    const idString = String(id);
    const idNumber = idString.replace(/\s/g, '');

    try {
        const userRef = doc(firestore, 'Users', idNumber);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          return { id: userSnap.id, ...userSnap.data() };
        } else {
          return null;
        }
      } catch (error) {
        throw error;
      }
}

const getAllUsers = async () => {
    try {
      const snapshot = await getDocs(ordersCollection);
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return users;
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
};

export {getUserById, getAllUsers};