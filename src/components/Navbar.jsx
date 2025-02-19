import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    
    <nav className="navbar navbar-expand-md navbar-dark fixed-top custom-navbar  ">
      <div className="container ">
        <a className="navbar-brand text-light fs-1" href="#">Expense Tracker</a>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        {/* Normal Navbar (Desktop View) */}
        <div className="collapse navbar-collapse d-none d-md-block">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item fs-lg-5 fs-6 mx-2">
              <a className="nav-link text-light" href="#" onClick={() => navigate("/home")}>Home</a>
            </li>
            <li className="nav-item fs-lg-5 fs-6 mx-2">
              <a className="nav-link text-light" href="#" onClick={() => navigate("/transaction")}>Transactions</a>
            </li>
            <li className="nav-item fs-lg-5 fs-6 mx-2">
              <a className="nav-link text-light" href="#">Categories</a>
            </li>
            <li className="nav-item fs-lg-5 fs-6 mx-2">
              <a className="nav-link text-light" href="#">Analytics</a>
            </li>
          </ul>
        </div>

        {/* Offcanvas Sidebar (Mobile View) */}
        <div
          className="offcanvas offcanvas-end text-bg-dark d-md-none"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate("/home")}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate("/transaction")}>Transactions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Analytics</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  
  );
};

export default Navbar;
