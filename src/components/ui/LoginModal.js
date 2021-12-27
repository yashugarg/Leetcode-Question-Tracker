import { useContext, useRef, useState } from "react";
import classes from "./LoginModal.module.css";
import UserContext from "../../store/user-context";
import axios from "axios";
import { serverUrl } from "../../store/urls";

function LoginModal({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const sessionIdInputRef = useRef();

  const userCtx = useContext(UserContext);

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const sessionId = sessionIdInputRef.current.value;
    const res = await axios.post(serverUrl + "/login", {
      token: userCtx.token,
      session: sessionId,
    });
    if (res.data["isSignedIn"]) {
      userCtx.setUserName(res.data["username"]);
      userCtx.setSession(sessionId);
      setLoginFailed(false);
      setIsLoading(false);
      closeModal();
    } else {
      setLoginFailed(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.modal}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className={classes.form} onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="sessionId">Leetcode Session ID</label>
            <textarea
              type="text"
              required
              id="sessionId"
              ref={sessionIdInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Login</button>
          </div>
          {loginFailed && <p>Invalid Session ID</p>}
        </form>
      )}
    </div>
  );
}

export default LoginModal;
