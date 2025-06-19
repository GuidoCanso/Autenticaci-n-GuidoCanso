import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Usuario creado correctamente");
                navigate("/login");  
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
            alert("Error al registrar");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Registrarse</button>
        </form>
    );
};
