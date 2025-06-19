import { useState } from "react";

interface Props {
    options: string[];
}

const MenuOptions = ({ options }: Props) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOption = (option: string) => {
        setSelected(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold text-base mb-3">Elegir Menú</h2>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => toggleOption(option)}
                            className="mr-2 w-4 h-4"
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MenuOptions;
