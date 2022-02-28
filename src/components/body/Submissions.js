import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { serverUrl } from "../../store/urls";
import UserContext from "../../store/user-context";

function Submissions({ quesionSlug }) {
  const [submissionData, setSubmissionData] = useState([]);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    const getSubmissions = async () => {
      const res = await axios.post(`${serverUrl}/${quesionSlug}/submissions`, {
        token: userCtx.token,
        session: userCtx.session,
      });
      if (res.data != null && res.data["submissions"] != null)
        setSubmissionData(res.data["submissions"]);
    };
    getSubmissions();
  }, [quesionSlug]);
  return (
    <div>
      {userCtx.session === "" ? (
        <b>Login to view Submissions</b>
      ) : (
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>Time Submitted</th>
              <th>Status</th>
              <th>Runtime</th>
              <th>Memory</th>
              <th>Language</th>
            </tr>
            {submissionData === [] ? (
              <b>No submissions yet!</b>
            ) : (
              submissionData.map((sub) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      {Date(sub["timestamp"] * 1000000).split(" GMT")[0]}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <a href={"https://leetcode.com" + sub["url"]}>
                        {sub["statusDisplay"]}
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>{sub["runtime"]}</td>
                    <td style={{ textAlign: "center" }}>{sub["memory"]}</td>
                    <td style={{ textAlign: "center" }}>{sub["lang"]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Submissions;
