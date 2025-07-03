interface Props {
    text: string;
    onClick: () => void;
}

const NavigationButton = ({ text, onClick }: Props) => (
    <button
        className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium tracking-wide hover:bg-gray-800"
        onClick={onClick}
    >
        {text} →
    </button>
);

export default NavigationButton;
