import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { firebaseApp } from './index.js';

const db = getFirestore(firebaseApp);

/**
 *
 * Get All Data
 */
export const getAllData = async (collectionName) => {
  try {
    const data = await getDocs(collection(db, collectionName));

    const allData = [];

    data.forEach((item) => {
      allData.push(item.data());
    });

    return allData;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * SnapShot to Get all Data Realtime
 */
export const getAllDataRealTime = async (collectionName, stateName) => {
  try {
    onSnapshot(
      query(
        collection(db, collectionName),
        orderBy('createdAt', 'desc')
        // where('status', '==', true)
      ),
      (snapshot) => {
        const allData = [];

        snapshot.docs.forEach((item) => {
          allData.push({ ...item.data(), id: item.id });
        });
        console.log(allData);

        stateName(allData);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * Create a Data
 */
export const createData = async (collectionName, data) => {
  try {
    const res = await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });

    return res.id;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * Get Single Data
 */
export const getSingleData = async (colName, id) => {
  try {
    const dev = await getDoc(doc(db, colName, id));
    console.log(dev.data());
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * Delete a Data
 */
export const deleteData = async (colName, id) => {
  try {
    await deleteDoc(doc(db, colName, id));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateData = async (colName, id, data) => {
  try {
    await updateDoc(doc(db, colName, id), data);
  } catch (error) {
    console.log(error.message);
  }
};
