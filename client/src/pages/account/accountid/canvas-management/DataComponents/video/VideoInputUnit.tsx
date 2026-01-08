import React, { useState } from "react";
import Button from "../../../../../../components/form-elements/Button";
import { DivClass, DivMouse } from "../../../../../../ui/Div";
import {
  EnabledVideoInput,
  EnabledVideosInputs,
} from "../../../../../../components/media-retrieved-components/MediaInputComponents";
import Label from "../../../../../../components/form-elements/Label";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";
import Select from "../../../../../../ui/selection/Select";
import "../../../../../../../style-files/video.css";

const VideoInputUnit = ({ params }: any) => {
  //activates video input form
  const {
    dataScrollBoardRef,
    videoInputOffSet,
    globalDraggingRef,
    videoInputCompPosRef,
    videoInputCompRef,
    videoToggleState,
    updateCanvasData,
  } = useCanvasContext();

  // const { newVideoComponent, setnewVideoComponent } = usenewVideoComponent();
  const [newVideoComponent, setNewVideoComponent] = useState<{ files: File[] }>(
    {
      files: [],
    }
  );

  const [selectedType, setSelectedType] = useState<string>("Single");
  const updateVideoSelectionType = () => {
    setSelectedType((prev) => (prev === "Single" ? "Many" : "Single"));
  };

  //submit video Data
  const videoComponentFormData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const videoFormData: any = {};
    if (newVideoComponent.files) videoFormData.files = newVideoComponent.files;

    if (selectedType) videoFormData.type = selectedType;

    if (videoInputCompPosRef.current.x)
      videoFormData.x = videoInputCompPosRef.current.x;
    // console.log(
    //   "videoInputCompPosRef.current.x: ",
    //   videoInputCompPosRef.current.x
    // );
    if (videoInputCompPosRef.current.y)
      videoFormData.y = videoInputCompPosRef.current.y;
    // console.log(
    //   "videoInputCompPosRef.current.y: ",
    //   videoInputCompPosRef.current.y
    // );

    if (
      !newVideoComponent.files ||
      !selectedType ||
      !videoInputCompPosRef.current.x ||
      !videoInputCompPosRef.current.y
    ) {
      alert("Video component must be filled with data");
      return;
    } else {
      //test videoFormData.video
      // console.log("videoFormData: ", videoFormData.file);
      // console.log("videoFormData: ", videoFormData);

      const video = await fetch(
        `http://localhost:3000/api/account/${params.accountid}/canvas-management/${params.workspaceid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoFormData),
        }
      );
      if (video.ok) {
        //notification ok response
        // alert("Your video data has been saved!");
        updateCanvasData();
        setNewVideoComponent({
          ...newVideoComponent,
          files: [],
        });
      } else {
        //notification failed response
        alert("Failed to save your video data!");
      }
    }
  };

  const processVideoMouseMove = (event: React.MouseEvent) => {
    if (!globalDraggingRef.current || !dataScrollBoardRef.current) return;

    const videoInputComp = videoInputCompRef.current;
    const videoInputCompRect = videoInputComp?.getBoundingClientRect();

    //windowRef (dataScrollBoard)
    const dataScrollBoardRect =
      dataScrollBoardRef.current.getBoundingClientRect();

    const mouseX: number = event.clientX - dataScrollBoardRect.left;
    const mouseY: number = event.clientY - dataScrollBoardRect.top;

    let newValueX = mouseX - videoInputOffSet.current.x;
    let newValueY = mouseY - videoInputOffSet.current.y;

    const maxX = dataScrollBoardRect.width - videoInputCompRect!.width;
    const maxY = dataScrollBoardRect.height - videoInputCompRect!.height;

    //set boundaries so draggables dont go outside the drag frame
    newValueX = Math.max(0, Math.min(newValueX, maxX));
    newValueY = Math.max(0, Math.min(newValueY, maxY));

    videoInputCompPosRef.current = {
      x: newValueX,
      y: newValueY,
    };

    if (videoInputComp) {
      videoInputComp.style.transform = `translate(${newValueX}px, ${newValueY}px)`;
    }
  };
  const processVideoMouseUp = () => {
    globalDraggingRef.current = false;
    document.removeEventListener<any>("mousemove", processVideoMouseMove);
    document.removeEventListener<any>("mouseup", processVideoMouseUp);
    videoInputOffSet.current = {
      x: 0,
      y: 0,
    };
  };
  const processVideoMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    globalDraggingRef.current = true;

    // //video input component x y position
    const dataScrollBoardRect = event.currentTarget.getBoundingClientRect();
    videoInputOffSet.current = {
      x: event.clientX - dataScrollBoardRect.left,
      y: event.clientY - dataScrollBoardRect.top,
    };
    document.addEventListener<any>("mousemove", processVideoMouseMove);
    document.addEventListener<any>("mouseup", processVideoMouseUp);
  };

  return (
    videoToggleState && (
      <DivMouse
        className={"data-video-component"}
        ref={videoInputCompRef}
        onStyle={{
          position: "absolute",
          color: "#fff",
          zIndex: 4,
          transform: `translate(${videoInputCompPosRef.current.x}px,${videoInputCompPosRef.current.y}px)`,
        }}
        onMouseDown={processVideoMouseDown}
      >
        <form className={"video-input-form"} onSubmit={videoComponentFormData}>
          <DivClass className={"video-label-wrapper"}>
            {selectedType === "Single" ? (
              <Label
                htmlfor="enabled-video-input-field"
                className={"video-label"}
                text="Single Video Input Field"
              />
            ) : (
              <Label
                htmlfor="enabled-videos-input-field"
                className={"videos-label"}
                text="Multi Video Input Field"
              />
            )}
          </DivClass>
          <DivClass className={"video-container"}>
            <DivClass className={"video-input-wrapper"}>
              {selectedType === "Single" ? (
                <EnabledVideoInput
                  id="enabled-video-input-field"
                  className={"enabled-video-input-field"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newVideo = e.target.files;
                    if (newVideo && newVideo.length > 0) {
                      setNewVideoComponent({
                        ...newVideoComponent,
                        files: Array.from(newVideo),
                      });
                    }
                  }}
                />
              ) : (
                <EnabledVideosInputs
                  id="enabled-videos-input-field"
                  className={"enabled-videos-input-field"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newVideo = e.target.files;
                    if (newVideo && newVideo.length > 0) {
                      setNewVideoComponent({
                        ...newVideoComponent,
                        files: Array.from(newVideo),
                      });
                    }
                  }}
                />
              )}

              <DivClass className={"video-btn-container"}>
                <DivClass className={"video-submit-btn-container"}>
                  <Button id="video-btn-submit" className={"video-btn-submit"}>
                    SAVE
                  </Button>
                </DivClass>
                <DivClass className={"video-selection-wrapper"}>
                  <Select
                    id="select-video-type"
                    className={"select-video-type"}
                    value={selectedType}
                    onChange={updateVideoSelectionType}
                  >
                    <option
                      id="video-type-option-one"
                      className={"video-type-option-one"}
                      value={"Single"}
                    >
                      Single
                    </option>
                    <option
                      id="video-type-option-two"
                      className={"video-type-option-two"}
                      value={"Many"}
                    >
                      Many
                    </option>
                  </Select>
                </DivClass>
              </DivClass>
            </DivClass>
          </DivClass>
        </form>
      </DivMouse>
    )
  );
};

export default VideoInputUnit;
