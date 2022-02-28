import { useEffect, useState } from "react";
import Submissions from "./Submissions";

function QuestionList({ content }) {
  const [expanded, setExpanded] = useState(Array(content.length).fill(false));

  useEffect(() => {
    setExpanded(Array(content.length).fill(false));
  }, [content]);

  const toggleExpanded = (id) => {
    let newList = expanded;
    newList[id] = !expanded[id];
    setExpanded([...newList]);
  };

  const getQuesSlug = (url) => {
    const splited = url.split("/");
    return splited.at(-1) === "" ? splited.at(-2) : splited.at(-1);
  };

  return (
    <div>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th style={{ width: "85%" }}>Question</th>
            <th style={{ width: "15%" }}>View Sumissions</th>
          </tr>
          {content.map((e, i) => {
            return e["link"] == null ? (
              <tr>
                <td>{e["title"]}</td>
              </tr>
            ) : (
              <>
                <tr>
                  <td>
                    <a href={e["link"]}>{e["title"]}</a>
                  </td>
                  {e["link"].includes("leetcode") && (
                    <td style={{ textAlign: "center" }}>
                      <button onClick={() => toggleExpanded(i)}>
                        {expanded[i] ? "Hide" : "View"}
                      </button>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>
                    {expanded[i] && (
                      <Submissions quesionSlug={getQuesSlug(e["link"])} />
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
