import ImageDisplay from "../components/order/ImageDisplay";
import StepIndicator from "../components/order/StepIndicator";
import MenuOptions from "../components/order/MenuOptions";
import NavigationButton from "../components/order/NavigationButton";
import pollo from "../assets/pollo.png"

function Order() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen px-4 py-6 bg-white">
            <div className="w-full max-w-xs flex flex-col gap-6">
                <ImageDisplay src={pollo} alt="Pollo a la brasa" />

                <StepIndicator currentStep={1} totalSteps={6} />

                <MenuOptions options={["Pollo a la brasa", "Tallarin verde con milanesa"]} />
            </div>

            <div className="mt-6 w-full max-w-xs">
                <NavigationButton text="Siguiente" onClick={() => console.log("Siguiente paso")} />
            </div>
        </div>
    );
}

export default Order;