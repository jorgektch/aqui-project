interface Props {
    currentStep: number;
    totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: Props) => (
    <div className="flex justify-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
            <div
                key={i}
                className={`w-8 h-8 text-sm font-medium rounded-full flex items-center justify-center 
                border transition
                ${i + 1 === currentStep ? "bg-black text-white" : "border-gray-400 text-gray-500"}`}
            >
                {i + 1}
            </div>
        ))}
    </div>
);

export default StepIndicator;
