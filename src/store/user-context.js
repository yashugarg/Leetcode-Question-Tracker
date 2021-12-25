import { createContext, useState } from 'react'

const UserContext = createContext({
    user: {},
    token: '',
    session: '',
    login: (token, session) => { },
    logout: () => { },
    setUserData: (data) => { },
    isLoggedIn: () => false,
});

export function UserContextProvider(props) {
    const [userData, setUserData] = useState({})
    const [loginToken, setLoginToken] = useState('')
    const [loginSession, setLoginSession] = useState('')

    function loginHandler(token, session) {
        setLoginToken(token);
        setLoginSession(session);
    }

    function logoutHandler() {
        setLoginToken('');
        setLoginSession('');
    }

    function setUserDataHadler(data) {
        setUserData(data);
    }

    function isLoggedInHandler() {
        return !(loginSession === '' || loginToken === '');
    }

    const context = {
        user: userData,
        token: loginToken,
        session: loginSession,
        login: loginHandler,
        logout: logoutHandler,
        setUserData: setUserDataHadler,
        isLoggedIn: isLoggedInHandler,
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;


