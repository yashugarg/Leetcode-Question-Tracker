import { useState, useEffect } from "react";
import { Converter } from "showdown";
import Layout from "../layout/Layout";
import Card from "../ui/Card";
import classes from "./Body.module.css";

function Body({ url }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [easyData, setEasyData] = useState(<></>);
  const [mediumData, setMediumData] = useState(<></>);
  const [hardData, setHardData] = useState(<></>);

  function setBodyData() {
    let content = <div>No Data</div>;
    switch (currentSection) {
      case 1:
        content = easyData;
        break;
      case 2:
        content = mediumData;
        break;
      case 3:
        content = hardData;
        break;
      default:
        content = <div>Video Data</div>;
        break;
    }
    document.getElementById("react-app-content").innerHTML = content.innerHTML;
  }

  useEffect(() => {
    let converter = new Converter();
    const fetchData = async () => {
      await fetch(
        "https://raw.githubusercontent.com/kunal-kushwaha/DSA-Bootcamp-Java/main/" +
          url
      )
        .then((res) => res.text())
        .then((val) => {
          const parser = new DOMParser();
          return parser.parseFromString(converter.makeHtml(val), "text/html");
        })
        .then((newContent) => {
          setEasyData(newContent.getElementById("easy").nextElementSibling);
          setMediumData(newContent.getElementById("medium").nextElementSibling);
          setHardData(newContent.getElementById("hard").nextElementSibling);
          setBodyData();
        });
    };
    fetchData();
  }, [url]);

  function sectionUpdate(index) {
    setCurrentSection(index);
    setBodyData();
  }

  const activeSectionStyle = { backgroundColor: "black", color: "white" };

  return (
    <Layout>
      <h1 className={classes.header}>
        {url.substring(12, url.length - 3).replace("-", " ")}
      </h1>
      <ul className={classes.categoryController}>
        <li>
          <button
            onClick={() => sectionUpdate(0)}
            style={currentSection === 0 ? activeSectionStyle : {}}
          >
            Video
          </button>
        </li>
        <li>
          <button
            onClick={() => sectionUpdate(1)}
            style={currentSection === 1 ? activeSectionStyle : {}}
          >
            Easy
          </button>
        </li>
        <li>
          <button
            onClick={() => sectionUpdate(2)}
            style={currentSection === 2 ? activeSectionStyle : {}}
          >
            Medium
          </button>
        </li>
        <li>
          <button
            onClick={() => sectionUpdate(3)}
            style={currentSection === 3 ? activeSectionStyle : {}}
          >
            Hard
          </button>
        </li>
      </ul>
      <Card>
        <div id="react-app-content" />
      </Card>
    </Layout>
  );
}

export default Body;
