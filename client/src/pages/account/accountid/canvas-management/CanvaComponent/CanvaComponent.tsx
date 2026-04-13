import { useParams, useNavigate } from "react-router-dom";
import "./CanvaComponent.css";
import { DivClass, DivStylingAndClassName } from "../../../../../ui/Div";
import AuthCanvasHeader from "../header/AuthCanvasHeader";
import CanvaContainer from "../CanvaContainer/CanvaContainer";
import { useCanvasContext } from "../form-components/canva-data-provider/CanvasDataContextProvider";
import InfoModificationContextProvider from "../modify-data/InfoModificationContextProvider";
import CanvasCoreFunctionality from "../CanvasHub/CanvasCoreFunctionality/CanvasCoreFunctionality";
import { CanvasContextDeletionProvider } from "../delete-data/CanvasDeletionOpsContext";
import DeleteCanvas from "../CanvasDeletion/DeleteCanvas";
import PrimaryControlsAndDetails from "../CanvasHub/PrimaryControlsAndDetails/PrimaryControlsAndDetails";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthLogoutProvider } from "../../logout/logoutContext";
const fetchWorkspaceData = async (userid: string, canvaid: string) => {
  const response = await fetch(
    `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
    {
      method: "GET",
      credentials: "include",
    },
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
  const { canvasData, setCanvasData } = useCanvasContext();
  const navRouter = useNavigate();
  if (!userid) return;
  //loads persisted data after page is done loading
  const fetchCanvaData = async () => {
    const csRes = await fetchWorkspaceData(String(userid), String(canvaid));
    setCanvasData(csRes);
  };

  const [sideBarState, setSideBarState] = useState<boolean>(false);
  const updateSideBarState = (booleanVal: boolean) => {
    setSideBarState(booleanVal);
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
                <DivStylingAndClassName
                  styles={{ width: "30px" }}
                  className="absolute z-20"
                >
                  <div
                    onClick={() => {
                      updateSideBarState(true);
                    }}
                    className="media-fragment-hub-toggle-icon "
                  >
                    <img
                      src="/media-fragment-hub.svg"
                      className="cursor-pointer"
                      alt="Media fragment hub toggle icon"
                    />
                  </div>
                </DivStylingAndClassName>
                <CanvasContextDeletionProvider>
                  <DivStylingAndClassName
                    styles={{
                      left: sideBarState ? "0px" : "-350px",
                    }}
                    className="canva-properties-wrapper"
                  >
                    <DivClass className={"work-workspace-management-container"}>
                      <div
                        onClick={() => {
                          updateSideBarState(false);
                        }}
                        // className="media-fragment-hub-toggle-icon"
                        className={`text-white cursor-pointer text-lg w-8 ml-auto mr-0 ${sideBarState ? "" : ""}`}
                      >
                        ✕
                      </div>
                      <DivStylingAndClassName
                        //move slowly in and out
                        className="opacity-block"
                        styles={{
                          width: "w-180",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                        }}
                      >
                        <CanvasCoreFunctionality />
                        <PrimaryControlsAndDetails />
                      </DivStylingAndClassName>
                    </DivClass>
                  </DivStylingAndClassName>
                  <DivClass className={"work-workspace-management-container"}>
                    {/* Data appeaers in here */}
                    <CanvaContainer />
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
