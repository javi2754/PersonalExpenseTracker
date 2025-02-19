import { useState } from "react";
import { addTransaction } from "../firestoreFunctions";
import { auth } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionForm = () => {
    const [category, setCategory] = useState("Category");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = auth.currentUser?.uid;

        if (!userId) {
            setError("You must be logged in to add a transaction.");
            setSuccess("");
            return;
        }

        if (category === "Category") {
            setError("Please select a valid category.");
            setSuccess("");
            return;
        }

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount.");
            setSuccess("");
            return;
        }

        if (!date) {
            setError("Please select a date and time.");
            setSuccess("");
            return;
        }

        try {
            // Call the function to add the transaction with the date
            await addTransaction(userId, category, parseFloat(amount), type, date);

            // Clear form after submitting
            setCategory("Category");
            setAmount("");
            setType("income");
            setDate("");

            // Set success message and clear error
            setSuccess("Transaction added successfully!");
            setError("");
        } catch (error) {
            console.error("Error adding transaction:", error);
            setError("There was an error adding your transaction.");
            setSuccess("");
        }
    };

    return (
        <section className="container ">

            <form className=" mx-auto col-12 col-md-12 col-lg-6" onSubmit={handleSubmit}>

                <div className="d-flex  custom-box-shadow rounded p-5 flex-column ">
                    <h3 className="text-center text-light mb-3"><b>Enter the transaction</b></h3>
                    <input
                        className="p-2 mx-3 row rounded-pill border-0 text-light custom-form-color"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="row  m-3 justify-content-between">
                    <select className="p-2 col-5 rounded-pill border-0  custom-form-color" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>



                    
                    <select className="rounded-pill  col-6  p-2 border-0  custom-form-color" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Category">Select Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Gifts">Gifts</option>
                        <option value="Home">Home</option>
                        <option value="Foods & Drinks">Foods & Drinks</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Transport">Transport</option>
                        <option value="Other">Other</option>
                        <option value="Housing">Housing</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Leisure">Leisure</option>


                    </select>
                    
                    </div>

                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select date & time"
                        className="p-2 rounded-pill mx-3 col-11 border-0 custom-form-color custom-datetime-input text-light"
                    />

                    <button className="p-2 rounded-pill mx-3 mt-3 border-0 text-light custom-btn-color" type="submit">Add Transaction</button>
                    {error && <p className="text-center" style={{ color: "red" }}>{error}</p>}
                    {success && <p className="text-center" style={{ color: "green" }}>{success}</p>}
                </div>
            </form>

        </section>
    );
};

export default TransactionForm;
