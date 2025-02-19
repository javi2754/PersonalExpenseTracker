// AuthForm.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import myImg from "../assets/login.jpg"
import Design from './Design.jsx'


function AuthForm({ type, name, setName, email, setEmail, password, setPassword, onSubmit }) {
    const navigate = useNavigate();

    return (
        <>
        <Design position={"circle(40% at 5% -10%)" }  background={"rgb(63,94,251)"} color1={"rgba(63,94,251,1)"} color2={"rgba(255,203,154,1)"} />
        <Design position={"circle(25% at 90% 100%)" } background={"rgb(212,255,254)"} color1={" rgba(212,255,254,1)"} color2={"rgba(43,189,193,1)"}/>


            <div className="container d-flex justify-content-center align-items-center w-75 vh-100 ">

                <div className="custom-bshadow row rounded-start custom-body-color">
                    <div className="col rounded-start justify-content-center my-auto px-5 py-5 align-on-top">

                        <form onSubmit={onSubmit}>
                            <div className="d-flex flex-column justify-content-center ">
                                <h1 className="custom-font-color">
                                    <b>{type === "login" ? "LOG IN" : "REGISTER"}</b>
                                </h1>
                                {type === "register" && (<div className="my-3 ">
                                    <input
                                        type="text"
                                        className="form-control p-3 custom-form-color rounded-pill border-0"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="User name"
                                    />
                                </div>
                                )}
                                <div className="my-3 ">
                                    <input
                                        type="email"
                                        className="form-control p-3 custom-form-color rounded-pill border-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="my-3 ">
                                    <input
                                        type="password"
                                        className="form-control p-3 custom-form-color rounded-pill border-0"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="my-3 btn w-50 btn-primary p-2 custom-btn-color logreg-btn rounded-pill border-0"
                                    >
                                        {type === "login" ? "Login" : "Register"}
                                    </button>
                                </div>

                                {type === "login" && (
                                    <button
                                        type="button"
                                        onClick={() => navigate("/register")}
                                        className="new-user-btn w-50 mx-auto btn custom-font-color">
                                        New user? Sign up
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="col d-none d-lg-block d-xl-block d-xxl-block p-0 align-on-top">
                        <img className="img-fluid h-100 rounded-end custom-width" src={myImg} alt="Login" />
                    </div>
                </div>

            </div>
        </>
    );
}

export default AuthForm;
