import React from 'react';

const InfiniteProgressBar: React.FC = () => {
    return (
        <>
            {/* Inline styles to define the keyframe animation */}
            <style>
                {`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
          .animate-progress {
            animation: progress 2s linear infinite;
          }
        `}
            </style>
            <div className="w-full h-2 bg-gray-200 overflow-hidden relative">
                <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-progress" />
            </div>
        </>
    );
};

export default InfiniteProgressBar;
