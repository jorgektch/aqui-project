import { useState, useEffect } from "react";

interface Props {
    title: string;
    options: string[];
    selected: Record<string, number>;
    onChange: (newSelection: Record<string, number>) => void;
    maxTotal?: number;
}

const MenuOptionsCheckbox = ({ title, options, selected, onChange, maxTotal }: Props) => {
    const [localSelection, setLocalSelection] = useState<Record<string, number>>(selected);

    useEffect(() => {
        setLocalSelection(selected);
    }, [selected]);

    const totalSelected = Object.values(localSelection).reduce((a, b) => a + b, 0);

    const toggleOption = (option: string) => {
        const updated = { ...localSelection };
        if (option in updated) {
            delete updated[option];
        } else {
            if (!maxTotal || totalSelected < maxTotal) {
                updated[option] = 1;
            }
        }
        setLocalSelection(updated);
        onChange(updated);
    };

    const changeQuantity = (option: string, qty: number) => {
        const updated = {
            ...localSelection,
            [option]: qty,
        };
        const newTotal = Object.values(updated).reduce((a, b) => a + b, 0);
        if (!maxTotal || newTotal <= maxTotal) {
            setLocalSelection(updated);
            onChange(updated);
        }
    };

    return (
        <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-semibold text-base mb-3">{title}</h2>
            <div className="space-y-3">
                {options.map((option, index) => {
                    const isChecked = option in localSelection;
                    const disableNew = !isChecked && maxTotal !== undefined && totalSelected >= maxTotal;

                    return (
                        <div key={index} className="flex items-center justify-between">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleOption(option)}
                                    className="mr-2 w-4 h-4"
                                    disabled={disableNew}
                                />
                                {option}
                            </label>
                            {isChecked && (
                                <select
                                    value={localSelection[option]}
                                    onChange={(e) => changeQuantity(option, parseInt(e.target.value))}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    {Array.from({ length: maxTotal || 5 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    );
                })}
                {maxTotal !== undefined && (
                    <p className="text-xs text-gray-500">
                        Total seleccionados: {totalSelected} / {maxTotal}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MenuOptionsCheckbox;
