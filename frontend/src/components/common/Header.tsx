import { Bell, User, ShoppingBag, X, Drumstick, CupSoda, CakeSlice, Salad, MapPin} from "lucide-react";
import { useState, useEffect } from "react";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [pedido, setPedido] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("pedido");
    if (data) setPedido(JSON.parse(data));
  }, [showModal]);

  return (
    <>
      <nav className="bg-white min-h-[60px] px-8 py-6 flex justify-between items-center w-full relative z-10">
        <ul>
          <li className="inline-block mr-4 text-gray-700"><a href="/">Inicio</a></li>
          <li className="inline-block mr-4"><a href="/carta">Carta</a></li>
          <li className="inline-block"><a href="/nosotros">Sobre nosotros</a></li>
        </ul>
        <div className="flex items-center gap-6">
          <a href="/notificaciones" className="text-black"><Bell strokeWidth={1} /></a>
          <a href="/perfil" className="text-black"><User strokeWidth={1} /></a>
          <button onClick={() => setShowModal(true)} className="text-black relative">
            <ShoppingBag strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Overlay y Modal */}
      {showModal && pedido && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold text-center mb-4">Resumen de tu pedido</h3>
            <div className="text-sm space-y-4 max-h-[400px] overflow-y-auto">
              <div>
                <p className="flex items-center font-semibold text-gray-700 mb-1">
                  <Drumstick className="mr-2 h-4 w-4" /> Menú:
                </p>
              </div>

              <div>
                <p className="flex items-center font-semibold text-gray-700 mb-1">
                  <Salad className="mr-2 h-4 w-4" /> Entrada:
                </p>
              </div>

              <div>
                <p className="flex items-center font-semibold text-gray-700 mb-1">
                  <CupSoda className="mr-2 h-4 w-4" /> Bebida:
                </p>
              </div>

              <div>
                <p className="flex items-center font-semibold text-gray-700 mb-1">
                  <CakeSlice className="mr-2 h-4 w-4" /> Postre:
                </p>
                <ul className="list-disc list-inside text-gray-800">
                </ul>
              </div>

              <div className="border-t pt-2 text-gray-700">
                <p className="text-sm text-gray-700 flex items-center">
  <MapPin className="w-4 h-4 mr-2" />
  <strong className="mr-1">Lugar de recojo:</strong> {pedido.lugar}
</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
