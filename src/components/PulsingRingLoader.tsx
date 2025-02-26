import React from "react";

export const PulsingRingLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100px]">
            <div className="relative">
                {/* Pulsing outer ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-ping opacity-75" />
                </div>
                {/* Static inner ring */}
                <div className="w-12 h-12 border-4 border-blue-500 rounded-full" />
            </div>
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
    );
};
