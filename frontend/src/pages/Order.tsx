import { useState } from "react";
import ImageDisplay from "../components/order/ImageDisplay";
import StepIndicator from "../components/order/StepIndicator";
import MenuOptions from "../components/order/MenuOptions";
import NavigationButton from "../components/order/NavigationButton";
import pollo from "../assets/pollo.png";

function Order() {
    const [step, setStep] = useState(1);
    const [order, setOrder] = useState({
        menu: "",
        entrada: "",
        bebida: "",
        postre: "",
        lugar: "",
    });

    const handleSelection = (key: string, value: string) => {
        setOrder(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const nextStep = () => {
        if (step < 6) setStep(prev => prev + 1);
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen px-4 py-6 bg-white">
            <div className="w-full max-w-xs flex flex-col gap-6">
                <ImageDisplay src={pollo} alt="Pollo a la brasa" />
                <StepIndicator currentStep={step} totalSteps={6} />

                {step === 1 && (
                    <MenuOptions
                        title="Elegir Menú"
                        options={["Pollo a la brasa", "Tallarin verde con milanesa"]}
                        selected={order.menu}
                        onSelect={value => handleSelection("menu", value)}
                    />
                )}

                {step === 2 && (
                    <MenuOptions
                        title="Elegir Entrada"
                        options={["Tequeños", "Papa a la huancaína"]}
                        selected={order.entrada}
                        onSelect={value => handleSelection("entrada", value)}
                    />
                )}

                {step === 3 && (
                    <MenuOptions
                        title="Elegir Bebida"
                        options={["Maracuyá", "Chicha", "Agua"]}
                        selected={order.bebida}
                        onSelect={value => handleSelection("bebida", value)}
                    />
                )}

                {step === 4 && (
                    <MenuOptions
                        title="Elegir Postre"
                        options={["Torta de chocolate", "Gelatina", "Mazamorra morada"]}
                        selected={order.postre}
                        onSelect={value => handleSelection("postre", value)}
                    />
                )}

                {step === 5 && (
                    <MenuOptions
                        title="Elegir Lugar de recojo"
                        options={["Puerta 2", "Puerta 7", "Local"]}
                        selected={order.lugar}
                        onSelect={value => handleSelection("lugar", value)}
                    />
                )}

                {step === 6 && (
                    <div className="border border-gray-300 rounded-md p-4 text-sm">
                        <h2 className="font-semibold mb-2">Confirmación de pedido</h2>
                        <p><strong>Menú:</strong> 1 {order.menu}</p>
                        <p><strong>Entrada:</strong> 1 {order.entrada}</p>
                        <p><strong>Bebida:</strong> 1 {order.bebida}</p>
                        <p><strong>Postre:</strong> {order.postre}</p>
                        <p><strong>Lugar de recojo:</strong> {order.lugar}</p>
                        <p><strong>Precio:</strong> S/. 11.00</p>
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
