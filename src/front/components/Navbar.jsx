import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Mi App</Link>

      <div className="space-x-4">
        <Link to="/">Inicio</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/private">Zona Privada</Link>
            <button onClick={handleLogout} className="bg-white text-green-600 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};
