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
          console.log('No such user!');
          return null;
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
      }
}

export {getUserById};