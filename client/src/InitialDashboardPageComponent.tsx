import { DivClass } from "./ui/Div";
import DataManagement from "./DataManagement";
import AuthHeader from "../auth/auth-partials/AuthHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style-files/management.css";
import { ToastContainer } from "react-toastify";

const InitialDashboardPageComponent = () => {
  const [canvaDataLoad, setCanvaDataLoad] = useState<any>({});

  const { userid } = useParams();
  if (!userid) return;
  const fetchEssentialData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "x-active-user": userid,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setCanvaDataLoad(data);
    } else {
      const issue = await response.json();

      if (issue.message === "Not Authenticated") {
        window.location.reload();
      } else {
        console.warn("frontend dashboard initial: ", issue);
      }
    }
  };

  useEffect(() => {
    document.title = "Canva Management | MindCanvas";
    fetchEssentialData();
  }, []);

  return (
    <DivClass className={"main-workspace-management-container"}>
      <AuthHeader />
      <ToastContainer position="top-left"></ToastContainer>
      <DataManagement source={canvaDataLoad} />
    </DivClass>
  );
};

export default InitialDashboardPageComponent;
