//export default function App() {
//    React.useEffect(() => {
//        if (!window.google || !window.google.charts) return;

//        window.google.charts.load('current', {
//            packages: ['corechart'],
//        });

//        window.google.charts.setOnLoadCallback(drawChart);

//        function drawChart() {
//            const data = window.google.visualization.arrayToDataTable([
//                ['Month', 'Sales'],
//                ['Jan', 1000],
//                ['Feb', 1170],
//                ['Mar', 660],
//                ['Apr', 1030],
//            ]);

//            const options = {
//                title: 'Monthly Sales',
//                curveType: 'function',
//                legend: { position: 'bottom' },
//            };

//            const chart = new window.google.visualization.LineChart(
//                document.getElementById('chart_div')
//            );

//            chart.draw(data, options);
//        }
//    }, []);

//    const [activeSidebarItem, setActiveSidebarItem] = React.useState(null);
//    const [expandedSidebarItems, setExpandedSidebarItems] = React.useState({});
//    const topTabs = ['Home', 'Analytics', 'Settings'];
//    const [activeTopTab, setActiveTopTab] = React.useState(topTabs[0]);
//    const docTabs = ['Summary', 'CardViewGraph', 'Details'];
//    const [activeDocTab, setActiveDocTab] = React.useState(docTabs[0]);

//    const sidebarItems = [
//        { name: 'Dashboard' },
//        { name: 'Management', subitems: ['Users', 'Teams', 'Projects'] },
//        { name: 'Reports', subitems: ['Daily', 'Weekly', 'Monthly'] },
//        { name: 'Help' },
//    ];

//    const toggleExpand = (name) => {
//        setExpandedSidebarItems(prev => ({
//            ...prev,
//            [name]: !prev[name],
//        }));
//    };

//    const styles = {
//        container: {
//            display: 'flex',
//            height: '100vh',
//            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
//        },
//        sidebar: {
//            width: 220,
//            backgroundColor: '#2c3e50',
//            color: 'white',
//            paddingTop: 20,
//            overflowY: 'auto',
//        },
//        sidebarItem: {
//            padding: '12px 20px',
//            cursor: 'pointer',
//        },
//        sidebarItemActive: {
//            padding: '12px 20px',
//            backgroundColor: '#34495e',
//            fontWeight: 'bold',
//        },
//        subitem: {
//            padding: '8px 40px',
//            cursor: 'pointer',
//            fontSize: 14,
//            backgroundColor: '#3b4b60',
//        },
//        subitemActive: {
//            padding: '8px 40px',
//            backgroundColor: '#1abc9c',
//            fontWeight: 'bold',
//        },
//        main: {
//            flex: 1,
//            display: 'flex',
//            flexDirection: 'column',
//        },
//        navbar: {
//            backgroundColor: '#2980b9',
//            color: 'white',
//            padding: '15px 30px',
//            display: 'flex',
//            alignItems: 'center',
//        },
//        navList: {
//            listStyle: 'none',
//            display: 'flex',
//            gap: 20,
//            margin: 0,
//            padding: 0,
//        },
//        navItem: {
//            cursor: 'pointer',
//            padding: '8px 16px',
//        },
//        navItemActive: {
//            padding: '8px 16px',
//            backgroundColor: 'rgba(255,255,255,0.3)',
//            fontWeight: 'bold',
//        },
//        content: {
//            padding: 20,
//            backgroundColor: '#ecf0f1',
//            height: '100%',
//            overflowY: 'auto',
//        },
//        docTabs: {
//            display: 'flex',
//            borderBottom: '2px solid #bdc3c7',
//            marginBottom: 20,
//        },
//        docTab: {
//            padding: '10px 25px',
//            cursor: 'pointer',
//            borderBottom: '3px solid transparent',
//        },
//        docTabActive: {
//            padding: '10px 25px',
//            borderBottom: '3px solid #2980b9',
//            fontWeight: 'bold',
//            color: '#2980b9',
//        },
//        card: {
//            backgroundColor: 'white',
//            borderRadius: 8,
//            padding: 20,
//            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//            maxWidth: 720,
//            margin: 'auto',
//        },
//    };

//    return (
//        <div style={styles.container}>
//            {/* Sidebar */}
//            <aside style={styles.sidebar}>
//                {sidebarItems.map(({ name, subitems }) => {
//                    const isExpanded = expandedSidebarItems[name];
//                    const isActive = activeSidebarItem === name;

//                    return (
//                        <div key={name}>
//                            <div
//                                style={isActive ? styles.sidebarItemActive : styles.sidebarItem}
//                                onClick={() =>
//                                    subitems ? toggleExpand(name) : setActiveSidebarItem(name)
//                                }
//                            >
//                                {name} {subitems && (isExpanded ? '▼' : '▶')}
//                            </div>
//                            {subitems && isExpanded && (
//                                <div>
//                                    {subitems.map(sub => (
//                                        <div
//                                            key={sub}
//                                            style={
//                                                activeSidebarItem === sub
//                                                    ? styles.subitemActive
//                                                    : styles.subitem
//                                            }
//                                            onClick={() => setActiveSidebarItem(sub)}
//                                        >
//                                            {sub}
//                                        </div>
//                                    ))}
//                                </div>
//                            )}
//                        </div>
//                    );
//                })}
//            </aside>

//            {/* Main */}
//            <div style={styles.main}>
//                {/* Top Navbar */}
//                <nav style={styles.navbar}>
//                    <ul style={styles.navList}>
//                        {topTabs.map(tab => (
//                            <li
//                                key={tab}
//                                style={
//                                    activeTopTab === tab
//                                        ? styles.navItemActive
//                                        : styles.navItem
//                                }
//                                onClick={() => setActiveTopTab(tab)}
//                            >
//                                {tab}
//                            </li>
//                        ))}
//                    </ul>
//                </nav>

//                {/* Content */}
//                <main style={styles.content}>
//                    {activeTopTab === 'Home' && (
//                        <div>
//                            <div style={styles.docTabs}>
//                                {docTabs.map(tab => (
//                                    <div
//                                        key={tab}
//                                        style={
//                                            activeDocTab === tab
//                                                ? styles.docTabActive
//                                                : styles.docTab
//                                        }
//                                        onClick={() => setActiveDocTab(tab)}
//                                    >
//                                        {tab}
//                                    </div>
//                                ))}
//                            </div>

//                            {activeDocTab === 'Summary' && (
//                                <div>
//                                    <h2>Summary</h2>
//                                    <p>This is the summary tab inside the Home top tab.</p>
//                                </div>
//                            )}

//                            {activeDocTab === 'CardViewGraph' && (
//                                <div style={styles.card}>
//                                    <div id="chart_div" style={{ width: '100%', height: 400 }} />
//                                </div>
//                            )}

//                            {activeDocTab === 'Details' && (
//                                <div>
//                                    <h2>Details</h2>
//                                    <p>More detailed information here.</p>
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {activeTopTab === 'Analytics' && (
//                        <div>
//                            <h2>Analytics Dashboard</h2>
//                            <p>Analytics content goes here.</p>
//                        </div>
//                    )}

//                    {activeTopTab === 'Settings' && (
//                        <div>
//                            <h2>Settings</h2>
//                            <p>Settings content goes here.</p>
//                        </div>
//                    )}
//                </main>
//            </div>
//        </div>
//    );
//}
     




function App() {
    const [activeTopTab, setActiveTopTab] = React.useState('Home');
    const [activeSidebarItem, setActiveSidebarItem] = React.useState(null);
    const [expandedSidebarItems, setExpandedSidebarItems] = React.useState({});

    const topTabs = ['Backlog', 'Board', 'Code', 'Timeline', 'Pages', 'Forms'];

    // Sidebar data with subitems
    const sidebarItems = [
        {
            name: 'Dashboard'
        },
        {
            name: 'Settings',
            subitems: ['Profile', 'Security', 'Notifications'],
        },
        {
            name: 'Projects',
            subitems: ['Project A', 'Project B', 'Project C'],
        },
        {
            name: 'Help'
        },
    ];

    const toggleExpand = (itemName) => {
        setExpandedSidebarItems(prev => ({
            ...prev,
            [itemName]: !prev[itemName]
        }));
    };

    // Styles
    const containerStyle = {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    };

    const sidebarStyle = {
        width: '220px',
        backgroundColor: '#222',
        color: 'white',
        paddingTop: '20px',
        overflowY: 'auto',
    };

    const sidebarItemStyle = {
        padding: '12px 20px',
        cursor: 'pointer',
        userSelect: 'none',
    };

    const sidebarItemActiveStyle = {
        ...sidebarItemStyle,
        backgroundColor: '#444',
        fontWeight: 'bold',
    };

    const subitemStyle = {
        padding: '8px 40px',
        cursor: 'pointer',
        fontSize: '0.9em',
        backgroundColor: '#333',
        userSelect: 'none',
    };

    const subitemActiveStyle = {
        ...subitemStyle,
        backgroundColor: '#555',
        fontWeight: 'bold',
    };

    const mainContentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    };

    const topNavbarStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
    };

    const navListStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    };

    const navItemStyle = {
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '4px',
    };

    const navItemActiveStyle = {
        ...navItemStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        fontWeight: 'bold',
    };

    const contentAreaStyle = {
        padding: '30px',
        backgroundColor: '#f5f5f5',
        height: '100%',
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                {sidebarItems.map(({ name, subitems }) => {
                    const isExpanded = expandedSidebarItems[name];
                    const isActive = activeSidebarItem === name;
                    return (
                        <div key={name}>
                            <div
                                style={isActive ? sidebarItemActiveStyle : sidebarItemStyle}
                                onClick={() => {
                                    if (subitems) {
                                        toggleExpand(name);
                                    } else {
                                        setActiveSidebarItem(name);
                                    }
                                }}
                            >
                                {name} {subitems && (isExpanded ? '▼' : '▶')}
                            </div>
                            {subitems && isExpanded && (
                                <div>
                                    {subitems.map(sub => (
                                        <div
                                            key={sub}
                                            style={activeSidebarItem === sub ? subitemActiveStyle : subitemStyle}
                                            onClick={() => setActiveSidebarItem(sub)}
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </aside>

            {/* Main content */}
            <div style={mainContentStyle}>
                {/* Top Navbar */}
                <nav style={topNavbarStyle}>
                    <ul style={navListStyle}>
                        {topTabs.map(tab => (
                            <li
                                key={tab}
                                style={activeTopTab === tab ? navItemActiveStyle : navItemStyle}
                                onClick={() => setActiveTopTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </nav>

                <main style={contentAreaStyle}>
                    <h2>Top Tab: {activeTopTab}</h2>
                    <p>This is content for the <strong>{activeTopTab}</strong> tab.</p>
                    <h3>Sidebar Selection: {activeSidebarItem || 'None'}</h3>
                    <p>Showing content for sidebar item <strong>{activeSidebarItem || 'None'}</strong>.</p>
                </main>
            </div>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));