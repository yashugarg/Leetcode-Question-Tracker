import React, { useState } from "react";
import Appbar from "./components/Appbar";
import Body from "./components/Body";
import Drawer from "./components/Drawer";

function App() {
  const [title, setTitle] = useState("Leetcode Question Tracker");
  const [isDrawerOpen, setIsDrawerOn] = useState(false);
  const [url, setUrl] = useState(null);

  const setAppBarTitle = (newTitle) => setTitle(newTitle);
  const setDataUrl = (newUrl) => setUrl(newUrl);
  const selectSection = (data) => {
    setAppBarTitle(data.substring(12, data.length - 3));
    setDataUrl(data);
  };
  const toggleDrawer = () => setIsDrawerOn(!isDrawerOpen);

  return (
    <div>
      <Appbar title={title} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Drawer isDrawerOpen={isDrawerOpen} selectSection={selectSection} />
    </div >
  );
}

export default App;
