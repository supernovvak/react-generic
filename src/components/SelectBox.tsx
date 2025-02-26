import React, { useState, useRef, useEffect } from 'react';

interface SelectBoxProps {
    options: string[];
    selected: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
                                                        options,
                                                        selected,
                                                        onChange,
                                                        placeholder = "Select an option...",
                                                    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside the component.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                className="flex items-center justify-between border rounded-md p-2 cursor-pointer bg-white"
                onClick={() => setIsOpen(!isOpen)}
            >
        <span className={`text-sm ${selected ? "text-gray-800" : "text-gray-500"}`}>
          {selected || placeholder}
        </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map(option => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                                selected === option ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
