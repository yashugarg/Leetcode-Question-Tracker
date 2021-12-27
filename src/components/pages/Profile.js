import { useContext } from "react";
import UserContext from "../../store/user-context";

function Profile() {
  const userCtx = useContext(UserContext);
  return <div>{userCtx.userName}</div>;
}

export default Profile;
