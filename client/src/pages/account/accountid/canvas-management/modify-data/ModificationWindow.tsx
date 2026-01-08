import { useModificationContext } from "./InfoModificationContextProvider";
// import StyleDiv from "../../../../../../../src/ui/StylerDiv";
import "./modification-window.css";
import Button from "../../../../../components/form-elements/Button";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import React from "react";
// import { ToastContainer } from "react-toastify";

//When the i round button on the left of a data fragment is clicked, ModificationWindow is an options box
export const ModificationWindow = ({ componentData }: any) => {
  const {
    toggleEditStateFunc,
    toggleModificationState,
    mouseClickDelete,
    deleteLiveDataElement,
    antiDeleteLock,
    toggleDeleteLock,
  } = useModificationContext();
  const { toggleMediaWindowState } = useCanvasContext();
  const { owner, _id, workspaceId, type } = componentData;
  return (
    <div className={"modifications-window-container"}>
      <Button
        className={"edit-button"}
        id="edit-button"
        onClick={() => {
          toggleModificationState();
          toggleEditStateFunc();
        }}
      >
        Edit
      </Button>
      <hr
        style={{
          width: "94%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Button
        className={"component-reposition-button"}
        id="component-reposition-button"
        onClick={() => {
          //Collapse the button options window
          toggleModificationState();

          //We dont want to display the edit window as we are toggling

          //Open the interface to move the selected component data to a new x y postion bas on it dragging
          toggleMediaWindowState();
        }}
      >
        Reorganize data fragment
      </Button>
      <hr
        style={{
          width: "94%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div className="delete-container ml-auto mr-auto flex flex-wrap items-center justify-around">
        <div
          className={"toggle-delete flex"}
          // id={`${_id}`}
          onClick={(e: React.FormEvent<HTMLDivElement>) => {
            e.preventDefault();
            toggleDeleteLock();
            return;
          }}
        >
          {antiDeleteLock ? (
            <img
              src="/shield-tick.svg"
              alt="Locked"
              height={25}
              width={25}
              className="ml-0 mr-auto block"
            />
          ) : (
            <img
              src="/shield-cross.svg"
              alt="Unlocked"
              height={25}
              className="ml-0 mr-auto block"
              width={25}
            />
          )}
        </div>
        <button
          className={`delete-button inline ${
            antiDeleteLock ? "cursor-not-allowed" : "cursor-pointer"
          } ${antiDeleteLock ? "opacity-80" : "opacity-100"}`}
          // id={`${_id}`}
          disabled={antiDeleteLock}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            mouseClickDelete(e);
            deleteLiveDataElement(owner, _id, workspaceId, type);
            // return;
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
