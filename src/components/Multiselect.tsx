import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
                                                            options,
                                                            selected,
                                                            onChange,
                                                            placeholder = "Select options...",
                                                        }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside the component.
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter(o => o !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={containerRef}>
            {/* The main multiselect input area */}
            <div
                className="flex flex-wrap items-center border rounded-md px-2 cursor-text bg-white"
                onClick={() => setIsOpen(true)}
            >
                {selected.map(item => (
                    <div
                        key={item}
                        className="flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 mr-1 mb-1"
                    >
                        <span className="text-sm">{item}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleOption(item);
                            }}
                            className="ml-1 focus:outline-none"
                        >
                            &#10005;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={selected.length === 0 ? placeholder : ""}
                    className="flex-grow p-1 focus:outline-none"
                />
                <div className="ml-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Dropdown list */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
                    ) : (
                        filteredOptions.map(option => (
                            <div
                                key={option}
                                onClick={() => toggleOption(option)}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                                    selected.includes(option) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                }`}
                            >
                                {option}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
