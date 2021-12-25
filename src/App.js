import React, { useState } from "react";
import Body from "./components/pages/Body";
import MainNavigation from "./components/layout/MainNavigation";

function App() {
  const [url, setUrl] = useState(null);

  const setDataUrl = (newUrl) => setUrl(newUrl);
  const selectSection = (data) => {
    setDataUrl(data);
  };

  return (
    <div>
      <MainNavigation selectSection={selectSection} />
      {url != null ? <Body url={url} /> : <></>}
    </div >
  );
}

export default App;
