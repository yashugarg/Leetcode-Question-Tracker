import React, { useEffect, useState, useContext } from "react";
import Body from "./components/pages/Body";
import Profile from "./components/pages/Profile";
import MainNavigation from "./components/layout/MainNavigation";
import axios from "axios";
import { serverUrl } from "./store/urls";
import UserContext from "./store/user-context";

function App() {
  const [url, setUrl] = useState(null);

  const userCtx = useContext(UserContext);

  const setToken = (token) => {
    console.log(token);
    userCtx.setToken(token);
  };

  useEffect(() => {
    const updateAccessToken = async () => {
      const res = await axios.get(serverUrl + "/access-token");
      if (res.status === 200) setToken(res.data);
    };
    updateAccessToken();
  }, []);

  return (
    <div>
      <MainNavigation selectSection={setUrl} />
      {url != null ? <Body url={url} /> : <Profile />}
    </div>
  );
}

export default App;
