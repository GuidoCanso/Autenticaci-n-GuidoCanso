import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Sesión iniciada");
                navigate("/private");  // mejor con minúscula para que coincida con la ruta
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
            alert("Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};
