import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";
import { useState } from "react";
import "./mediaRepositionUnit.css";
import Button from "../../../../../../components/form-elements/Button";
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { useParams } from "react-router-dom";
import CanvaNotification_MoveXYFailed from "../../notifications/fragment-updates/CanvaNotification_MoveXYFailed";
import { toast } from "react-toastify";

//reposition live data
//mediaInputOffSet,mediaInputCompPosRef,mediaInputCompRef,mediaWindowToggleState
const RepositionLiveData = () => {
  const {
    dataScrollBoardRef,
    globalDraggingRef,
    mediaWindowToggleState,
    toggleMediaWindowState,
    mediaInputOffSet,
    mediaInputCompPosRef,
    mediaInputCompRef,
    mediaCanvaDataFragment,
    updateCanvasData,
  } = useCanvasContext();
  const [mediaFragmentData, setMediaFragmentData] = useState<any>({
    type: "",
    updateType: "",
    x: Number,
    y: Number,
  });
  const { userid, canvaid } = useParams();
  if (!userid) return;
  const { toggleModificationState } = useModificationContext();

  //textInputCompPosRef is mediaInputCompPosRef
  //textInputCompRef is mediaInputCompRef;
  //textInputComp is mediaInputComp

  const processMediaMouseMove = (event: React.MouseEvent) => {
    if (
      !globalDraggingRef.current ||
      !dataScrollBoardRef.current ||
      !mediaInputCompRef.current
    )
      return;

    const mediaInputElement = mediaInputCompRef.current as HTMLDivElement;
    const textInputElementRect = mediaInputElement.getBoundingClientRect();
    const boardRect = dataScrollBoardRef.current.getBoundingClientRect();

    //mouse position inside the board
    const mouseInsideBoardX = event.clientX - boardRect.left;
    const mouseInsideBoardY = event.clientY - boardRect.top;
    // console.log("mouseInsideBoardX: ", mouseInsideBoardX);
    // console.log("mouseInsideBoardY: ", mouseInsideBoardY);

    //When we first click down, we store how far from the element's left and top the mouse was (textInputOffSet.current.x/y)
    const newXElementLeft = mouseInsideBoardX - mediaInputOffSet.current.x;
    const newYElementTop = mouseInsideBoardY - mediaInputOffSet.current.y;
    // console.log("newXElementLeft: ", newXElementLeft);
    // console.log("newYElementTop: ", newYElementTop);

    // set boundaries so draggables dont go outside the drag frame
    const newPosX = Math.max(
      0,
      Math.min(newXElementLeft, boardRect.width - textInputElementRect.width)
    );
    const newPosY = Math.max(
      0,
      Math.min(newYElementTop, boardRect.height - textInputElementRect.height)
    );

    mediaInputCompPosRef.current = {
      x: newPosX,
      y: newPosY,
    };

    if (mediaInputElement) {
      mediaInputElement.style.left = `${mediaInputCompPosRef.current.x}px`;
      mediaInputElement.style.top = `${mediaInputCompPosRef.current.y}px`;
    }
  };
  const processMediaMouseUp = () => {
    globalDraggingRef.current = false;
    document.removeEventListener<any>("mousemove", processMediaMouseMove);
    document.removeEventListener<any>("mouseup", processMediaMouseUp);
    mediaInputOffSet.current = {
      x: mediaInputCompPosRef.current.x,
      y: mediaInputCompPosRef.current.y,
    };
    setMediaFragmentData({
      ...mediaFragmentData,
      x: mediaInputCompPosRef.current.x,
      y: mediaInputCompPosRef.current.y,
    });
  };
  const processMediaMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    globalDraggingRef.current = true;
    const mediaElement = mediaInputCompRef.current as HTMLDivElement;
    const mediaElementRect = mediaElement.getBoundingClientRect();
    //Store where inside the element-textui the click happened
    mediaInputOffSet.current = {
      x: event.clientX - mediaElementRect.left,
      y: event.clientY - mediaElementRect.top,
    };
    document.addEventListener<any>("mousemove", processMediaMouseMove);
    document.addEventListener<any>("mouseup", processMediaMouseUp);
  };

  const elementId = mediaCanvaDataFragment.clickedElement;

  let text = null;
  if (mediaCanvaDataFragment.clickedElement) {
    text = (mediaCanvaDataFragment.clickedElementValues as HTMLElement)
      .parentElement?.childNodes[1].textContent;
  }

  const mediaCanvaDataFragmentLeft = mediaCanvaDataFragment.left;
  const mediaCanvaDataFragmentTop = mediaCanvaDataFragment.top;

  const position: any = { x: 0, y: 0 };
  if (mediaInputCompPosRef.current.x >= 0) {
    position.x = mediaInputCompPosRef.current.x;
  }
  if (mediaCanvaDataFragmentLeft) {
    position.y = mediaInputCompPosRef.current.y;
  }

  //submit text Data
  const updateMediaFragmentCoordinates = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    //Checks if textInputCompPosRef,newTextComponent and selectedType are not null
    const mediaData: any = {
      _id: elementId,
      type: "Text",
      updateType: "XY_POSITIONS",
      x: position.x,
      y: position.y,
    };

    if (
      !mediaData._id &&
      !mediaData.type &&
      !mediaData.updateType &&
      !mediaData.x &&
      !mediaData.y
    ) {
      //fires if the logic is broken
      toast.warning("Media data is missing, investigate anomaly!");
      return;
    } else {
      // console.log("mediaData: ", mediaData);

      const mediaUpdateResponse = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "x-active-user": userid,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mediaData),
        }
      );
      if (mediaUpdateResponse.ok) {
        //notification ok response
        updateCanvasData();
        //resets the element value
        setMediaFragmentData({
          ...mediaFragmentData,
          text: "",
        });
      } else {
        CanvaNotification_MoveXYFailed();
        return;
      }
    }
  };

  return (
    mediaWindowToggleState && (
      <div
        className={"media-fragment-container"}
        ref={mediaInputCompRef}
        style={{
          position: "absolute",
          color: "#fff",
          left: mediaCanvaDataFragmentLeft,
          top: mediaCanvaDataFragmentTop,
          zIndex: 4,
          //for future reference- this creates a new stacking context that overrides zindex,filter and opacity values,
          // transform: `translate(${mediaInputCompPosRef.current.x}px,${mediaInputCompPosRef.current.y}px)`,
        }}
        onMouseDown={processMediaMouseDown}
      >
        <p id={elementId} className="media-fragment">
          {text}
        </p>
        <Button
          id={String(elementId)}
          onClick={updateMediaFragmentCoordinates}
          className="media-fragment-button"
        >
          Update Coordinates
        </Button>
        <Button
          id={String(elementId)}
          onClick={() => {
            toggleMediaWindowState();
            toggleModificationState();
          }}
          className="media-fragment-button"
        >
          I'm done
        </Button>
      </div>
    )
  );
};

export default RepositionLiveData;
