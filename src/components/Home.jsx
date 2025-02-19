import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import Navbar from "./Navbar.jsx";
import BalanceChart from "./BalanceChart.jsx";
import DonutChart from "./DonutChart.jsx";
import fetchFilteredTransactions from "./fetchFilteredTransactions.jsx";
function Home() {
    const [userName, setUserName] = useState("Guest");
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [chartData, setChartData] = useState({ dates: [], amounts: [] });

    const navigate = useNavigate();
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    const [startDate, setStartDate] = useState(() => {
        const defaultStart = new Date();
        defaultStart.setMonth(defaultStart.getMonth() - 1); 
        return defaultStart;
    });
    const [endDate, setEndDate] = useState(() => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        return tomorrow;
    });
    console.log(new Date().getDate()+1);

    const fetchChartData = async () => {
        try {
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = endDate.toISOString().split("T")[0];
    
            const { dates: newDates, balances: newBalances } = await fetchFilteredTransactions(formattedStartDate, formattedEndDate);
    
            setChartData({
                dates: newDates,
                balances: newBalances
            });
    
            console.log("Updated Chart Data:", { dates: newDates, balances: newBalances });
    
        } catch (error) {
            console.error("Error fetching filtered transactions:", error);
        }
    };
    

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserName(user.displayName || "User");
                const userId = user.uid;

                const transactionsRef = collection(db, "transactions");
                const q = query(transactionsRef, where("userId", "==", userId));

                const unsubscribeTransactions = onSnapshot(q, async (snapshot) => {
                    const txnList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setTransactions(txnList);

                    const income = txnList
                        .filter(txn => txn.type === "income")
                        .reduce((sum, txn) => sum + Number(txn.amount) || 0, 0);

                    const expense = txnList
                        .filter(txn => txn.type === "expense")
                        .reduce((sum, txn) => sum + Number(txn.amount) || 0, 0);

                    setTotalIncome(income);
                    setTotalExpense(expense);
                    setBalance(income - expense);

                    // 🟢 Call the fetchChartData function
                    fetchChartData();
                });

                return () => unsubscribeTransactions();
            } else {
                setUserName("Guest");
                setTransactions([]);
                setTotalIncome(0);
                setTotalExpense(0);
                setBalance(0);
                setChartData({ dates: [], amounts: [] });
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        fetchChartData();
    }, [startDate, endDate]);

    const handleDateFilter = (filter) => {
        let newStartDate;

        if (filter === "Week") {
            newStartDate = new Date();
            newStartDate.setDate(newStartDate.getDate() - 8); // Last 7 days
        } else if (filter === "Month") {
            newStartDate = new Date();
            newStartDate.setMonth(newStartDate.getMonth() - 1); // Last 1 month
        } else if (filter === "Year") {
            newStartDate = new Date();
            newStartDate.setFullYear(newStartDate.getFullYear() - 1); // Last 1 year
        } else if (filter === "All") {
            newStartDate = new Date("1999-12-31");
        }

        setStartDate(newStartDate);
    };
    return (
        <section className="container flex-column justify-content-center w-75 vh-100 position-relative">
            <Navbar />
            <div className="position-relative" style={{ top: "15%" }}>
                <div className="row">
                    <h1 className="text-light"><b>Total Balance</b></h1>
                </div>

                <div className="row p-md-3 mb-5  custom-box-shadow rounded">
                    <div className="col-12">
                        <div className="col">
                            <div className="row chart-container pb-3">
                                <BalanceChart dates={chartData.dates} amounts={chartData.balances} />
                            </div>
                            <div className="row pb-4">
                                {["All", "Year", "Month",  "Week" ].map((filter) => (
                                    <div className="col-3 d-flex justify-content-center" key={filter}>
                                        <button
                                            className="custom-date-btn text-light rounded-pill btn btn-outline-info px-3"
                                            onClick={() => handleDateFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md mb-5 mb-md-5 my-md-0 me-md-4 p-5 rounded custom-box-shadow">
                        <h3 className="mb-2 text-light">Categories</h3>
                        <p className="text-primary mb-2 fs-6 fst-italic">{formattedDate}</p>
                        <DonutChart transactions={transactions} />
                    </div>
                    <div className="col-md ms-md-4">
                        <div className="row p-4 rounded custom-box-shadow">
                            <h3 className="text-light"><b>Cash Flow</b></h3>
                            <p className="text-primary mb-2 fs-6 fst-italic">{formattedDate}</p>
                            <div className="row">
                                <p className="col-8 text-light">Total Income: </p>
                                <p className="col-4 text-end text-success">₹{totalIncome}</p>
                            </div>
                            <div className="row">
                                <p className="col-8 text-light">Total Expense: </p>
                                <p className="col-4 text-end text-danger">₹{totalExpense}</p>
                            </div>
                            <hr className="text-light" />
                            <div className="row">
                                <p className="col-8 text-light">Balance: </p>
                                <p className="col-4 text-end text-light">₹{balance}</p>
                            </div>
                        </div>

                        <div className="row p-5 mt-5 mb-5 rounded custom-box-shadow">
                            <p className="text-white fs-5">
                                &ldquo;Do not save what is left after spending, but <b>spend</b> what is left <b>after saving</b>.&rdquo;
                            </p>
                            <p className="text-light text-end mt-2"><i>— Warren Buffett</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
