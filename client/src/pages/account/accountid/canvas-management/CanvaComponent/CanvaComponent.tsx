//CanvaContainer line 135

import { DivClass, DivStylingAndClassName } from "../../../../../ui/Div";
import "./CanvaComponent.css";
import AuthCanvasHeader from "../header/AuthCanvasHeader";
import CanvaContainer from "../CanvaContainer/CanvaContainer";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import InfoModificationContextProvider from "../modify-data/InfoModificationContextProvider";
import CanvasCoreFunctionality from "../CanvasHub/CanvasCoreFunctionality/CanvasCoreFunctionality";
import { CanvasContextDeletionProvider } from "../delete-data/CanvasDeletionOpsContext";
import DeleteCanvas from "../CanvasDeletion/DeleteCanvas";
import PrimaryControlsAndDetails from "../CanvasHub/PrimaryControlsAndDetails/PrimaryControlsAndDetails";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IIconContextProvider } from "../hovering-i-icon/HoveringIContextProvider";
import { toast, ToastContainer } from "react-toastify";
import { AuthLogoutProvider } from "../../logout/logoutContext";
const fetchWorkspaceData = async (
  userid: string,
  // workspacename: string,
  canvaid: string
) => {
  const response = await fetch(
    `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "x-active-user": userid,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    if (!data.success) {
      switch (data.code) {
        case "NO_WORKSPACE_DATA":
          return {
            status: "empty",
            message: data?.message,
          };
        case "NO_USER_DATA":
          return {
            status: "empty",
            message: data?.message,
          };
        case "WORKSPACE_DOES_NOT_EXIST":
          return {
            status: "deleted",
          };
        default:
          return {
            status: "error",
            message: data?.message || "Unhandled backend condition.",
          };
      }
    }
    toast.error("Could not retrieve your data. Try again in a few minutes");
  } else {
    const data = await response.json();
    return {
      status: "success",
      data: data,
    };
  }
};

const CanvaComponent = () => {
  const { userid, canvaid } = useParams();
  const { canvasData, setFreshCanvasData } = useCanvasContext();
  const navRouter = useNavigate();
  if (!userid) return;
  //loads persisted data after page is done loading
  const fetchCanvaData = async () => {
    const csRes = await fetchWorkspaceData(String(userid), String(canvaid));

    setFreshCanvasData(csRes);
  };

  //controls live database components that are updated in its dragging state
  const [canvaMediaFragment, setCanvaMediaFragment] = useState<boolean>(false);
  const updateCanvaMediaFragment = (booleanVal: boolean) => {
    setCanvaMediaFragment(booleanVal);
  };

  useEffect(() => {
    document.title = "Canvaspace | MindCanvas";
    fetchCanvaData();
  }, []);

  try {
    if (canvasData.status === "deleted") {
      navRouter(`/account/${userid}/canvas-management`);
    } else {
      return (
        <>
          <DivClass className={"work-workspace-management-main-container"}>
            <AuthLogoutProvider userid={userid}>
              <AuthCanvasHeader />
            </AuthLogoutProvider>
            <ToastContainer position="bottom-right"></ToastContainer>

            <DivClass className={"work-workspace-management-container-wrapper"}>
              <InfoModificationContextProvider>
                <CanvasContextDeletionProvider>
                  <DivStylingAndClassName
                    styles={{
                      width: canvaMediaFragment ? "350px" : "30px",
                    }}
                    className="canva-properties-wrapper"
                  >
                    <DivClass className={"work-workspace-management-container"}>
                      <div
                        onClick={() => {
                          updateCanvaMediaFragment(!canvaMediaFragment);
                        }}
                        className="media-fragment-hub-toggle-icon"
                      >
                        <img
                          src="/media-fragment-hub.svg"
                          alt="Media fragment hub toggle icon"
                        />
                      </div>
                      <DivStylingAndClassName
                        //move slowly in and out
                        className="opacity-block"
                        styles={{
                          //for now disable the visbility for the
                          display: canvaMediaFragment ? "block" : "none",
                        }}
                      >
                        <CanvasCoreFunctionality />
                        <PrimaryControlsAndDetails />
                      </DivStylingAndClassName>
                    </DivClass>
                  </DivStylingAndClassName>
                  <DivClass className={"work-workspace-management-container"}>
                    <IIconContextProvider>
                      {/* Data appeaers in here */}
                      <CanvaContainer />
                    </IIconContextProvider>
                  </DivClass>
                  <DeleteCanvas />
                </CanvasContextDeletionProvider>
              </InfoModificationContextProvider>
            </DivClass>
          </DivClass>
        </>
      );
    }
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default CanvaComponent;
