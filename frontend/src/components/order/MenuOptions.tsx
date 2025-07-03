interface Props {
    title: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
}

const MenuOptions = ({ title, options, selected, onSelect }: Props) => (
    <div className="border border-gray-300 rounded-md p-4">
        <h2 className="font-semibold text-base mb-3">{title}</h2>
        <div className="space-y-2">
            {options.map((option, index) => (
                <label key={index} className="flex items-center text-sm cursor-pointer">
                    <input
                        type="radio"
                        name={title}
                        checked={selected === option}
                        onChange={() => onSelect(option)}
                        className="mr-2 w-4 h-4"
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

export default MenuOptions;
