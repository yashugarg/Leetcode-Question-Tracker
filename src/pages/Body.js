import { useState, useEffect } from "react";
import { Converter } from "showdown";
import QuestionList from "../components/body/QuestionList";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import classes from "./Body.module.css";

function Body({ url }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [videoData, setVideoData] = useState([]);
  const [easyData, setEasyData] = useState([]);
  const [mediumData, setMediumData] = useState([]);
  const [hardData, setHardData] = useState([]);
  const [problemData, setProblemData] = useState([]);
  const [content, setContent] = useState([]);

  function setBodyData(sec) {
    let content;
    switch (sec) {
      case 0:
        content = videoData;
        break;
      case 1:
        content = easyData;
        break;
      case 2:
        content = mediumData;
        break;
      case 3:
        content = hardData;
        break;
      case 4:
        content = problemData;
        break;
      default:
        content = [];
        break;
    }
    setContent([...content]);
  }

  useEffect(() => {
    const getQuestionData = (list) => {
      const data = Array.from(list.getElementsByTagName("li")).map((e) => {
        if (e.firstElementChild != null)
          return {
            title: e.firstElementChild.innerText,
            link: e.firstElementChild.getAttribute("href"),
          };
        else return { title: e.innerText };
      });
      return data;
    };

    const fetchData = async () => {
      let converter = new Converter();
      await fetch(
        `https://raw.githubusercontent.com/kunal-kushwaha/DSA-Bootcamp-Java/main/${url}`
      )
        .then((res) => res.text())
        .then((val) => {
          const parser = new DOMParser();
          return parser.parseFromString(converter.makeHtml(val), "text/html");
        })
        .then((newContent) => {
          let easy = newContent.getElementById("easy");
          if (easy == null)
            easy = newContent.querySelectorAll('[id^="basic"]')[0];

          if (easy != null) {
            let medium;
            setEasyData([...getQuestionData(easy.nextElementSibling)]);
            medium = newContent.getElementById("medium");
            if (medium == null)
              medium = newContent.querySelectorAll('[id^="intermediate"]')[0];

            let hard;
            if (medium != null) {
              setMediumData([...getQuestionData(medium.nextElementSibling)]);
              hard = newContent.getElementById("hard");
            }
            if (hard != null)
              setHardData([...getQuestionData(hard.nextElementSibling)]);
          } else {
            let problem = newContent.getElementsByTagName("ol")[0];
            if (problem == null) {
              let lists = newContent.getElementsByTagName("ul");
              if (lists.length !== 0) problem = lists[lists.length - 1];
            }
            if (problem != null) setProblemData([...getQuestionData(problem)]);
          }
          setBodyData(0);
        });
    };
    setEasyData([]);
    setMediumData([]);
    setHardData([]);
    setProblemData([]);
    setCurrentSection(0);
    setContent(<div>Loading...</div>);
    fetchData();
  }, [url]);

  const sectionUpdate = (index) => {
    setCurrentSection(index);
    setBodyData(index);
  };

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
        {easyData.length !== 0 && (
          <li>
            <button
              onClick={() => sectionUpdate(1)}
              style={currentSection === 1 ? activeSectionStyle : {}}
            >
              Easy
            </button>
          </li>
        )}
        {mediumData.length !== 0 && (
          <li>
            <button
              onClick={() => sectionUpdate(2)}
              style={currentSection === 2 ? activeSectionStyle : {}}
            >
              Medium
            </button>
          </li>
        )}
        {hardData.length !== 0 && (
          <li>
            <button
              onClick={() => sectionUpdate(3)}
              style={currentSection === 3 ? activeSectionStyle : {}}
            >
              Hard
            </button>
          </li>
        )}
        {problemData.length !== 0 && (
          <li>
            <button
              onClick={() => sectionUpdate(4)}
              style={currentSection === 4 ? activeSectionStyle : {}}
            >
              Problems
            </button>
          </li>
        )}
      </ul>
      <Card>
        <div id="react-app-content">
          {currentSection === 0 ? (
            <>Video Data</>
          ) : (
            <QuestionList content={content} />
          )}
        </div>
      </Card>
    </Layout>
  );
}

export default Body;
