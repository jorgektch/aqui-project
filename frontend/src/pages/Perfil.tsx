import React from "react";
import { Phone, Calendar, Hash, History, X } from "lucide-react";

function Perfil() {
  const user = {
    nombre: "MARINA CARDENAS",
    telefono: "943 578 385",
    fecha: "08 / 09",
    pedidos: 4,
    imagen: "https://randomuser.me/api/portraits/women/65.jpg",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 relative">
        {/* Botón de cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagen */}
        <div className="flex justify-center mb-4">
          <img
            src={user.imagen}
            alt="Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Nombre */}
        <h2 className="text-center text-lg font-semibold mb-6 text-black">
          {user.nombre}
        </h2>

        {/* Datos */}
        <div className="space-y-4 text-gray-700 divide-y divide-gray-300">
          {/* Teléfono */}
          <div className="flex items-center gap-3 pt-2">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>{user.telefono}</span>
          </div>

          {/* Fecha */}
          <div className="flex items-center gap-3 pt-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>{user.fecha}</span>
          </div>

          {/* Número de pedidos */}
          <div className="flex items-center gap-3 pt-2">
            <Hash className="w-5 h-5 text-gray-500" />
            <span>{user.pedidos} pedidos</span>
          </div>

          {/* Historial de pedidos */}
          <div className="flex items-center gap-3 pt-2 pb-2">
            <History className="w-5 h-5 text-gray-500" />
            <span>Historial de pedidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
