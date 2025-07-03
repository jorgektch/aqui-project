import { useState } from "react";

interface Props {
    title: string;
    options: string[];
    selected: Record<string, number>;
    onChange: (value: Record<string, number>) => void;
}

function MenuOptionsCheckbox({ title, options, selected, onChange }: Props) {
    const handleToggle = (option: string) => {
        const updated = { ...selected };
        if (updated[option]) {
            delete updated[option];
        } else {
            updated[option] = 1;
        }
        onChange(updated);
    };

    const handleQuantityChange = (option: string, value: number) => {
        const updated = { ...selected };
        if (value < 1) {
            delete updated[option];
        } else {
            updated[option] = value;
        }
        onChange(updated);
    };

    return (
        <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold text-base mb-3">{title}</h2>
            <div className="space-y-3">
                {options.map((option, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={!!selected[option]}
                                onChange={() => handleToggle(option)}
                                className="mr-2 w-4 h-4 accent-black"
                            />
                            {option}
                        </label>

                        {selected[option] !== undefined && (
                            <input
                                type="number"
                                min={1}
                                value={selected[option]}
                                onChange={(e) => handleQuantityChange(option, parseInt(e.target.value))}
                                className="w-14 h-8 text-center border border-gray-300 rounded focus:outline-none"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuOptionsCheckbox;
