import { useState } from "react";
import ImageDisplay from "../components/order/ImageDisplay";
import StepIndicator from "../components/order/StepIndicator";
import MenuOptionsCheckbox from "../components/order/MenuOptionsCheckbox";
import NavigationButton from "../components/order/NavigationButton";
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

    const formatResumen = (obj: Record<string, number>) =>
        Object.entries(obj)
            .map(([name, qty]) => `${qty} ${name}`)
            .join(", ");

    const nextStep = () => {
        if (step < 6) setStep(prev => prev + 1);
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen px-4 py-6 bg-white">
            <div className="w-full max-w-xs flex flex-col gap-6">
                <ImageDisplay src={pollo} alt="Pollo a la brasa" />
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
                    <div className="border border-gray-300 rounded-md p-4 text-sm">
                        <h2 className="font-semibold mb-2">Confirmación de pedido</h2>
                        <p><strong>Menú:</strong> {formatResumen(order.menu)}</p>
                        <p><strong>Entrada:</strong> {formatResumen(order.entrada)}</p>
                        <p><strong>Bebida:</strong> {formatResumen(order.bebida)}</p>
                        <p><strong>Postre:</strong> {formatResumen(order.postre)}</p>
                        <p><strong>Lugar de recojo:</strong> {order.lugar}</p>
                        <p><strong>Precio:</strong> S/. {calcularPrecioTotal()}</p>
                    </div>
                )}
            </div>

            <div className="mt-6 w-full max-w-xs">
                {step < 6 ? (
                    <NavigationButton text="Siguiente" onClick={nextStep} />
                ) : (
                    <NavigationButton text="Terminar pedido" onClick={() => console.log(order)} />
                )}
            </div>
        </div>
    );
}

export default Order;
