import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState(false);
  const { userid } = useParams();

  useEffect(() => {
    if (!userid) return;
    fetch("http://localhost:5000/api/auth-check", {
      method: "GET",
      credentials: "include", //allow cookies to be sent
      headers: { "x-active-user": userid },
    })
      .then((response: any) => response.json())
      .then((data) => {
        if (data.code === "AUTHENTICATED") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          new Notification("Verify Your Identity", {
            body: "Login to continue",
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setIsLoading(false);
      });
  }, []);

  if (isloading) return <div>...loading</div>;
  if (!isAuth)
    return (
      <Navigate
        to={"/signin-portal"}
        state={{ from: location.pathname }}
        replace
      />
    );
  // return <>{children}</>;
  return children;
};

export default ProtectedRoute;
