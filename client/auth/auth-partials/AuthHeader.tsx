import Header from "../../src/components/Header";
import { DivClass } from "../../src/ui/Div";
import { useNavigate, useParams } from "react-router-dom";
import RouteLink from "../../src/components/ProductSection/RouteLink";
import "../auth-header.css";
import SVG from "../../src/SVG";
// import HeadingTwo from "../../src/ui/HeadingTwo";
// import AuthCanvasHeader from "../../src/pages/account/accountid/canvas-management/canvasid/(header)/AuthCanvasHeader";

const AuthHeader = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  if (!userid) return;
  const logout = async () => {
    const logoutRes = await fetch(
      `http://localhost:5000/api/account/${userid}/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: { "x-active-user": userid },
      }
    );

    if (!logoutRes.ok) {
      new Notification("Could not log you out, try again");
    } else {
      // window.location.reload();
      navigate("/signin-portal");
    }
  };
  return (
    <Header id="auth-header" className={"auth-header"}>
      {/* <DivClass className={"auth-route"}>
        <RouteLink
          href={`/account/${userid}/canvas-management`}
          className={"auth-go-back-route"}
        >
          Back
          <i className={"auth-route-icon"}>
            // color of icons will chagen depending on the theme chosen later on
            <SVG
              src={"/house-white-solid.svg"}
              className={"backward-icon"}
              alt="backward-icon"
            />
          </i>
        </RouteLink>
      </DivClass> */}
      <DivClass className={"account-dashboard-content"}>
        <DivClass className={`${"dashboard-link-component"}`}>
          <RouteLink
            className={"auth-link-component-built-in-app"}
            href={`/account/${userid}/account-info`}
          >
            Account Info
          </RouteLink>
          <div onClick={logout} className="log-out">
            {/*call logout and refresh to take to login */}
            Log out
          </div>
        </DivClass>
      </DivClass>
    </Header>
  );
};

export default AuthHeader;
