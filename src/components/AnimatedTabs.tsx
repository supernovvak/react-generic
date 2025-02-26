import React, { useState, useRef, useEffect } from "react";

const AnimatedTabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(null); // Start with no active tab
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", left: "0px" });
    const tabRefs = useRef([]);

    const tabs = React.Children.toArray(children).filter(child => child.type === Tab);
    const tabContents = React.Children.toArray(children).filter(child => child.type === TabContent);

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.props.name === activeTab);
        if (tabRefs.current[activeIndex]) {
            const tabElement = tabRefs.current[activeIndex];
            setUnderlineStyle({
                width: `${tabElement.offsetWidth}px`,
                left: `${tabElement.offsetLeft}px`,
            });
        }
    }, [activeTab]);

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            {/* Tabs Container */}
            <div className="relative flex border-b border-gray-300 dark:border-gray-700">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.props.name}
                        ref={(el) => (tabRefs.current[index] = el)}
                        onClick={() => setActiveTab(tab.props.name)}
                        className={`relative px-4 py-2 text-gray-600 dark:text-gray-300 
                            transition-all duration-300 ${
                            activeTab === tab.props.name ? "text-blue-500 font-semibold" : "opacity-70"
                        }`}
                    >
                        {tab.props.children}
                    </button>
                ))}

                {/* Moving Underline */}
                <div
                    className="absolute bottom-0 h-1 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                    style={underlineStyle}
                />
            </div>

            {/* Tab Content */}
            <div className="mt-4 p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                {tabContents.map((content, index) => {
                    if (content.props.name === activeTab) {
                        return <div key={index}>{content.props.children}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const Tab = ({ name, children }) => {
    return <>{children}</>;
};

const TabContent = ({ name, children }) => {
    return <>{children}</>;
};

export { AnimatedTabs, Tab, TabContent };
