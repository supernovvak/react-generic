import React from "react";

export const DotsLoading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100px]">
            <div className="flex space-x-2">
                <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                />
                <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
    );
};
