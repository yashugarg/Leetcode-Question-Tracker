import { useState, useEffect } from 'react'
import LoginModal from '../ui/LoginModal';
import Backdrop from './Backdrop';
import classes from './MainNavigation.module.css'


function MainNavigation({ selectSection }) {
    const [isDrawerOpen, setIsDrawerOn] = useState(false);
    const [isModalOpen, setIsModalOn] = useState(false);
    const [drawerData, setDrawerData] = useState([]);

    const toggleDrawer = () => setIsDrawerOn(!isDrawerOpen);
    const toggleModal = () => setIsModalOn(!isModalOpen);

    useEffect(() => {
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
        <div>
            <div className={classes.appbar}>
                <button className={classes.drawerIcon} onClick={toggleDrawer}>{isDrawerOpen ? 'Close' : 'Open'}</button>
                <div className={classes.appbarTitle}>Leetcode Question Tracker</div>
                <button className={classes.actions} onClick={toggleModal}>Login</button>
            </div>
            <nav className={classes.drawer} style={{ left: isDrawerOpen ? '0px' : '-30%' }}>
                <ul className={classes.drawerItems}>
                    {drawerData.map((val, index) =>
                        <li key={index} className={classes.drawerTile}
                            onClick={() => {
                                toggleDrawer();
                                selectSection(val["path"])
                            }}>
                            <div className={classes.menuData}>
                                {val["path"].substring(12, val["path"].length - 3)}
                            </div>
                        </li>
                    )}
                </ul>
            </nav>
            {(isDrawerOpen || isModalOpen) && <Backdrop onBackdropClick={() => { setIsDrawerOn(false); setIsModalOn(false); }} />}
            {isModalOpen && <LoginModal />}
        </div>
    )
}

export default MainNavigation
