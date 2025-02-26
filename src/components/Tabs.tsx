import React from "react";

export type TabProps = {
    name: string;
    children: React.ReactNode;
    className?: string;
};

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <>{children}</>;
};
Tab.displayName = "Tab";

export type TabContentProps = {
    name: string;
    children: React.ReactNode;
    className?: string;
};

export const TabContent: React.FC<TabContentProps> = ({ children }) => {
    return <>{children}</>;
};
TabContent.displayName = "TabContent";

export type TabsProps = {
    defaultTabName?: string;
    children: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ defaultTabName, children }) => {
    // Extract Tab and TabContent children.
    const tabs = React.useMemo(
        () =>
            React.Children.toArray(children).filter(
                (child) =>
                    React.isValidElement(child) &&
                    (child.type as any).displayName === "Tab"
            ) as React.ReactElement<TabProps>[],
        [children]
    );

    const tabContents = React.useMemo(
        () =>
            React.Children.toArray(children).filter(
                (child) =>
                    React.isValidElement(child) &&
                    (child.type as any).displayName === "TabContent"
            ) as React.ReactElement<TabContentProps>[],
        [children]
    );

    // Compute initial active tab.
    const initialTab =
        defaultTabName || (tabs.length > 0 ? tabs[0].props.name : "");
    const [activeTab, setActiveTab] = React.useState<string>(initialTab);

    const hasInitialized = React.useRef(false);
    React.useEffect(() => {
        if (!hasInitialized.current && tabs.length > 0) {
            if (defaultTabName && tabs.some((tab) => tab.props.name === defaultTabName)) {
                setActiveTab(defaultTabName);
                } else {
                    setActiveTab(tabs[0].props.name);
               }
                  hasInitialized.current = true;
            }
        }, [defaultTabName, tabs]);

    // Manage underline animation.
    const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>(
        {}
    );
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0 });

    React.useEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        if (activeEl && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tabRect = activeEl.getBoundingClientRect();
            const left = tabRect.left - containerRect.left;
            const width = tabRect.width;
            setUnderlineStyle({ left, width });
        }
    }, [activeTab]);

    const handleTabClick = (name: string) => {
        setActiveTab(name);
    };

    return (
        <div>
            <div className="relative border-b border-gray-200" ref={containerRef}>
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.props.name}
                            ref={(el) => (tabRefs.current[tab.props.name] = el)}
                            onClick={() => handleTabClick(tab.props.name)}
                            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                                activeTab === tab.props.name
                                    ? "text-blue-500"
                                    : "text-gray-500 hover:text-gray-700"
                            } ${tab.props.className || ""}`}
                        >
                            {tab.props.children}
                        </button>
                    ))}
                </div>
                {/* Animated Underline */}
                <div
                    className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                    style={{ left: underlineStyle.left, width: underlineStyle.width }}
                ></div>
            </div>

            <div className="p-4">
                {tabContents.map((content) => (
                    <div
                        key={content.props.name}
                        className={`transition-opacity duration-300 ${
                            activeTab === content.props.name ? "opacity-100" : "hidden opacity-0"
                        } ${content.props.className || ""}`}
                    >
                        {content.props.children}
                    </div>
                ))}
            </div>
        </div>
    );
};
