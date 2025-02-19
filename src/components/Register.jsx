
import { useState } from "react";

import { createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            alert(`Registration successful! Its nice to meet you ${name}`);
            navigate("/login");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (


        <AuthForm
            type="register"
            name={name}
            setName={setName}
            email={email}
            
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleRegister}
        />


    );
}

export default Register;
