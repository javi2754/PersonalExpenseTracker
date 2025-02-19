// Login.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm"; // Import AuthForm component
import myImg from "../assets/login.jpg"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/home");
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    const type = "login";

    return (

        <AuthForm
            type="login"
            email={email}
            
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
        />
    );
}

export default Login;
