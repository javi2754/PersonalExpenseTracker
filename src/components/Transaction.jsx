import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Transaction() {
  return (
    <section className="container position-relative col-12 col-md-9 mx-auto pb-5 vh-100 ">
      <Navbar/>
      <div className="position-relative " style={{top:"15%",bottom:"10%"}}>
      <h1 className="text-white "><b>Transactions</b></h1>
      <div  className="p-2  pt-5 p-md-5 rounded custom-box-shadow">
      
      <TransactionForm />
      <TransactionList />
      
      </div>
      
      <div className=" position-relative" style={{ height: '50px',width:"100%" }}></div>

      </div>
      
      
  
    </section>
  );
}

export default Transaction;
