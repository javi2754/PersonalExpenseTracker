import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Ensure correct path
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transaction from "./components/Transaction";
import TransactionList from "./components/TransactionList";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>; // Prevent flashing

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={user ? <Home /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/transaction"
                    element={user ? <Transaction /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/transactionlist"
                    element={user ? <TransactionList /> : <Navigate to="/login" replace />}
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
