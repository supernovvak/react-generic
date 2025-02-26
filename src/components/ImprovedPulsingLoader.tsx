import React from "react";

export const ImprovedPulsingLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[120px]">
            <div className="relative">
                {/* Outer pulsating rings with staggered delays */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 rounded-full animate-ping opacity-75"
                        style={{ animationDelay: "0s" }}
                    />
                    <div
                        className="w-16 h-16 border-4 border-blue-500 rounded-full animate-ping opacity-50"
                        style={{ animationDelay: "0.5s" }}
                    />
                </div>
                {/* Static inner ring with subtle shadow */}
                <div className="w-16 h-16 border-4 border-blue-500 rounded-full shadow-md" />
            </div>
            <p className="mt-3 text-sm text-gray-500">Loading...</p>
        </div>
    );
};
