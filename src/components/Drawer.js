import React from 'react'
import './../stylesheets/Navigation.css'

function Drawer({ isDrawerOpen, selectSection }) {
    const [drawerData, setDrawerData] = React.useState([]);
    React.useEffect(() => {
        const fetchDrawerData = async () => {
            const value = await fetch('https://api.github.com/repos/kunal-kushwaha/DSA-Bootcamp-Java/git/trees/main?recursive=1')
                .then(res => res.json())
                .then(val => val["tree"])
                .then(data => data.filter((file) => file["path"].startsWith("assignments/")));
            setDrawerData(value);
        }
        fetchDrawerData();
    }, []);

    return (
        <nav className='drawer' style={{ left: isDrawerOpen ? '0px' : '-30%' }}>
            <ul className="drawer-items">
                {drawerData.map((val, index) =>
                    <li key={index} className="drawer-tile" onClick={() => { selectSection(val["path"]) }}>
                        <div className="menu-data">
                            {val["path"].substring(12, val["path"].length - 3)}
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Drawer
