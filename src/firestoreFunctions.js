import { db } from "./firebase";
import { collection, addDoc, getDoc, setDoc, doc, query, where, getDocs, Timestamp } from "firebase/firestore";


export const addTransaction = async (userId, category, amount, type, date) => {
  try {
    console.log("User ID:", userId);
    console.log("Transaction Data:", { category, amount, type, date });

    if (!userId) {
      throw new Error("User ID is missing! Transaction cannot be added.");
    }

    // Convert the manually entered date to a Firestore Timestamp
    const selectedDate = date ? Timestamp.fromDate(new Date(date)) : Timestamp.now();

    const transactionRef = await addDoc(collection(db, "transactions"), {
      userId,
      category,
      amount,
      type,
      date: selectedDate,
    });

    console.log("Transaction successfully added with ID:", transactionRef.id);

    // Update balance
    const balanceDocRef = doc(db, "balances", userId);
    const balanceDocSnap = await getDoc(balanceDocRef);

    if (balanceDocSnap.exists()) {
      const currentBalance = balanceDocSnap.data().balance;
      const newBalance = type === "income" ? currentBalance + amount : currentBalance - amount;

      await updateDoc(balanceDocRef, { balance: newBalance });
      console.log("Balance updated successfully!");
    } else {
      await setDoc(balanceDocRef, { balance: type === "income" ? amount : -amount });
      console.log("Balance document created successfully!");
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};

export const getTransactions = async (userId) => {
  try {
    const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
