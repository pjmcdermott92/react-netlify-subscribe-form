import { useEffect, useState } from 'react';
import './TabGroup.scss';

const TabGroup = ({ children, className, defaultTab = 0, ...props }) => {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        if (!children) return setTabs([]);
        let tabItems = [];
        Array.from(children).forEach(child => {
            tabItems.push({
                title: child.props.title, content: child.props.children, props: child.props
            });
        });
        setTabs(tabItems);
    }, [children]);

    return (
        <div className={`tabGroup${className ? ` ${className}` : ''}`} {...props}>
            <ul className='tabList'>
                {tabs.map(({ title }, index) =>
                    <TabItem key={title} active={activeTab === index} setActiveTab={() => setActiveTab(index)}>
                        {title}
                    </TabItem>
                )}
            </ul>

            <div className='tabContent'>
                {tabs.map(({ title, content, props }, index) =>
                    <TabPanel key={title} active={activeTab === index} {...props}>
                        {content}
                    </TabPanel>
                )}
            </div>
        </div>
    )
}

export const Tab = ({ children }) => children;

const TabItem = ({ active, setActiveTab, children }) => (
    <li data-active={active}>
        <button type='button' onClick={setActiveTab}>
            {children}
        </button> 
    </li>
);

const TabPanel = ({ active, children, className, ...props }) => (
    <div
        role='tabpanel'
        className={`tabPane${className ? ` ${className}` : ''}`}
        data-active={active}
        {...props}
    >
        {children}
    </div>
)

export default TabGroup;
