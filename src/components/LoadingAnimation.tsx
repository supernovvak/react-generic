import React from "react";

export const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100px]">
            {/* Circular spinner */}
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
    );
};
