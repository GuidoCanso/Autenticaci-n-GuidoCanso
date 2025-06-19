import { useEffect, useState } from "react";

export const Private = () => {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const getPrivateData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setMsg(data.msg);
      } catch (error) {
        console.error("Error:", error);
        setMsg("Error al obtener datos privados");
      }
    };

    getPrivateData();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Ruta Privada</h1>
      <p>{msg || "Cargando..."}</p>
    </div>
  );
};
