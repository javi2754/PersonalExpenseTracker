import React, { useEffect, useState } from "react";
import { getTransactions } from "../firestoreFunctions"; // Adjust the import based on your file structure


const TransactionFilter = ({ userId, startDate, endDate }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(userId);

        // Convert Firestore Timestamp to readable date format
        const transactionData = data
          .filter((txn) => txn.date && txn.amount !== undefined) // Ensure valid data
          .map((txn) => ({
            date: txn.date.toDate().toISOString().split("T")[0], // Format as YYYY-MM-DD
            amount: txn.amount,
            type: txn.type, // income or expense
          }));

        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId]);

  useEffect(() => {
    if (transactions.length > 0) {
      filterAndAggregateTransactions();
    }
  }, [transactions, startDate, endDate]);

  const filterAndAggregateTransactions = () => {
    const start = new Date(startDate).toISOString().split("T")[0];
    const end = new Date(endDate).toISOString().split("T")[0];

    // Filter transactions within the date range
    const filtered = transactions.filter(
      (txn) => txn.date >= start && txn.date <= end
    );

    // Aggregate transactions by date
    const aggregated = filtered.reduce((acc, txn) => {
      if (!acc[txn.date]) {
        acc[txn.date] = { date: txn.date, total: 0 };
      }
      acc[txn.date].total += txn.type === "income" ? txn.amount : -txn.amount; // Add income, subtract expense
      return acc;
    }, {});

    // Convert object to array and sort by date
    const aggregatedArray = Object.values(aggregated).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    setFilteredTransactions(aggregatedArray);
  };

  return (
    <div>
      <h2>Filtered Transactions</h2>
      {filteredTransactions.length === 0 ? (
        <p>No transactions found in this range.</p>
      ) : (
        <ul>
          {filteredTransactions.map((txn, index) => (
            <li key={index}>
              Date: {txn.date} | Net Amount: ₹{txn.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionFilter;
