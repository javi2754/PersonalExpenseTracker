import { useEffect, useState } from "react";
import { getTransactions } from "../firestoreFunctions";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getTransactions(user.uid);
        setTransactions(data);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  if (loading) return <p className="text-info">Loading transactions...</p>;

  return (


    <div>
      <h2 className="text-info text-center mt-5 mb-3"><b>Transaction History</b></h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="list-group">
          {transactions
            .slice()
            .sort((a, b) => {

              const dateA = a.date?.toDate ? a.date.toDate().getTime() : 0;
              const dateB = b.date?.toDate ? b.date.toDate().getTime() : 0;
              return dateB - dateA;
            })
            .map((txn) => (
              <li
                className="list-group-item rounded m-2 p-3 custom-bg-color text-light  shadow"
                key={txn.id}>
                <div className="d-flex align-items-center ">
                <p className="col-4 fs-6 text-center my-auto">{txn.category}</p>
                <p className="col-4 fs-6 text-center my-auto">{txn.type === "expense" ? ` - ₹${txn.amount}` : ` + ₹${txn.amount}`}</p>

                
                <p className="col-4 fs-6 text-center my-auto">{txn.date?.toDate ? txn.date.toDate().toDateString() : "No Date"} </p>
                </div>
              </li>
            ))}
        </ul>
      )}
      
    </div>
  );
};

export default TransactionList;
