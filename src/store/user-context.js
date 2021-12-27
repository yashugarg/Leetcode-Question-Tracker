import { createContext, useState } from "react";

const UserContext = createContext({
  userName: "",
  token: "",
  session: "",
  setToken: (token) => {},
  setSession: (session) => {},
  logout: () => {},
  setUserName: (username) => {},
  isLoggedIn: () => false,
});

export function UserContextProvider(props) {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [session, setSession] = useState("");

  function logoutHandler() {
    setUserName("");
    setToken("");
    setSession("");
  }

  function isLoggedIn() {
    return session !== "" && userName !== "";
  }

  const context = {
    userName: userName,
    token: token,
    session: session,
    setToken: setToken,
    setSession: setSession,
    setUserName: setUserName,
    logout: logoutHandler,
    isLoggedIn: isLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
