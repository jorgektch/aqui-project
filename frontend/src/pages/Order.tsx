import { useState } from "react";
import ImageDisplay from "../components/order/ImageDisplay";
import StepIndicator from "../components/order/StepIndicator";
import MenuOptionsCheckbox from "../components/order/MenuOptionsCheckbox";
import NavigationButton from "../components/order/NavigationButton";
import { ChevronLeft } from "lucide-react";
import pollo from "../assets/pollo.png";

function Order() {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    menu: {} as Record<string, number>,
    entrada: {} as Record<string, number>,
    bebida: {} as Record<string, number>,
    postre: {} as Record<string, number>,
    lugar: "",
  });

  const calcularPrecioTotal = () => {
    const totalMenu = Object.values(order.menu).reduce((acc, qty) => acc + qty * 8, 0);
    const totalEntrada = Object.values(order.entrada).reduce((acc, qty) => acc + qty * 1.5, 0);
    const totalBebida = Object.values(order.bebida).reduce((acc, qty) => acc + qty * 1.5, 0);
    const totalPostre = Object.values(order.postre).reduce((acc, qty) => acc + qty * 1, 0);
    return (totalMenu + totalEntrada + totalBebida + totalPostre).toFixed(2);
  };
/*hola*/
  return (
  <div className="min-h-screen px-4 py-6 bg-white flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6">
    {/* Imagen */}
    <div className="relative w-full lg:w-[40%] h-auto lg:h-[520px] flex items-center justify-center">
      {step > 1 && (
        <button
          onClick={() => setStep(prev => prev - 1)}
          className="absolute top-2 left-2 bg-white hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
          aria-label="Retroceder"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
      )}
      <ImageDisplay
        src={pollo}
        alt="Pollo a la brasa"
        className="rounded-lg object-cover w-full h-full"
      />
    </div>

    {/* Contenido del pedido */}
    <div className="w-full lg:w-[60%] flex flex-col justify-between gap-6 px-2">
      <div className="flex flex-col gap-6">
        <StepIndicator currentStep={step} totalSteps={6} />

        {step === 1 && (
          <MenuOptionsCheckbox
            title="Elegir Menú"
            options={["Pollo a la brasa", "Tallarin verde con milanesa"]}
            selected={order.menu}
            onChange={(value) => setOrder(prev => ({ ...prev, menu: value }))}
          />
        )}

        {step === 2 && (
          <MenuOptionsCheckbox
            title="Elegir Entrada"
            options={["Tequeños", "Papa a la huancaína"]}
            selected={order.entrada}
            onChange={(value) => setOrder(prev => ({ ...prev, entrada: value }))}
          />
        )}

        {step === 3 && (
          <MenuOptionsCheckbox
            title="Elegir Bebida"
            options={["Maracuyá", "Chicha", "Agua"]}
            selected={order.bebida}
            onChange={(value) => setOrder(prev => ({ ...prev, bebida: value }))}
          />
        )}

        {step === 4 && (
          <MenuOptionsCheckbox
            title="Elegir Postre"
            options={["Torta de chocolate", "Gelatina", "Mazamorra morada"]}
            selected={order.postre}
            onChange={(value) => setOrder(prev => ({ ...prev, postre: value }))}
          />
        )}

        {step === 5 && (
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold text-base mb-3">Elegir Lugar de Recojo</h2>
            <div className="space-y-2">
              {["Puerta 1", "Puerta 7", "Puerta principal"].map((lugar, index) => (
                <label key={index} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="lugar"
                    value={lugar}
                    checked={order.lugar === lugar}
                    onChange={() => setOrder(prev => ({ ...prev, lugar }))}
                    className="mr-2 w-4 h-4"
                  />
                  {lugar}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="border border-gray-300 rounded-md p-4 text-sm bg-gray-50 shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-center">🧾 Confirmación de Pedido</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700">🍽️ Menú:</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {Object.entries(order.menu).map(([item, qty]) => (
                    <li key={item}>{qty} × {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">🥟 Entrada:</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {Object.entries(order.entrada).map(([item, qty]) => (
                    <li key={item}>{qty} × {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">🥤 Bebida:</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {Object.entries(order.bebida).map(([item, qty]) => (
                    <li key={item}>{qty} × {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">🍰 Postre:</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {Object.entries(order.postre).map(([item, qty]) => (
                    <li key={item}>{qty} × {item}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-gray-300">
                <p className="text-gray-700"><strong>📍 Lugar de recojo:</strong> {order.lugar}</p>
                <p className="text-lg text-green-700 font-bold mt-2"><strong>Total:</strong> S/. {calcularPrecioTotal()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 w-full flex justify-center lg:justify-end">
        {step < 6 ? (
          <NavigationButton text="Siguiente" onClick={() => setStep(prev => prev + 1)} />
        ) : (
          <NavigationButton text="Terminar pedido" onClick={() => console.log(order)} />
        )}
      </div>
    </div>
  </div>
);

}

export default Order;
