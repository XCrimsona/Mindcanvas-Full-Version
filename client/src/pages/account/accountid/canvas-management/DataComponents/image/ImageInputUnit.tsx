import React, { useState } from "react";
import Button from "../../../../../../../src/components/form-elements/Button";
import { DivClass } from "../../../../../../../src/ui/Div";
import {
  EnabledImageInput,
  EnabledImagesInput,
} from "../../../../../../components/media-retrieved-components/MediaInputComponents";
import { useCanvasContext } from "../../DataComponents/canva-data-provider/CanvasDataContextProvider";
import Select from "../../../../../../../src/ui/selection/Select";
import "./image.css";
import canvaNotification_CreateImage from "../../notifications/data-creation-components/CanvaNotification_CreateImage";
import canvaNotification_CreateImageFailed from "../../notifications/data-creation-components/CanvaNotification_CreateImageFailed";
// import Figure from "../../../../../../ui/Figure";
import Label from "../../../../../../components/form-elements/Label";

// { params }: any
const ImageInputUnit = () => {
  //activates image input form
  const {
    dataScrollBoardRef,
    imageInputOffSet,
    globalDraggingRef,
    imageInputCompPosRef,
    imageInputCompRef,
    imageToggleState,
    // updateCanvasData,
  } = useCanvasContext();

  const [selectedType, setSelectedType] = useState<string>("Single");
  const updateImageSelectionType = () => {
    setSelectedType((prev) => (prev === "Single" ? "Many" : "Single"));
  };

  const [imageFile, setImageFile] = useState<File>();
  // const captureImage = (e: any) => {
  //   setImageFile(e.target.file);
  // };

  const uploadImage = async (e: any) => {
    e.preventDefault();

    if (!imageFile)
      new Notification(
        "No image selected, please select an image to continue..."
      );
    else {
      const imageformData: any = {};
      if (imageFile) {
        imageformData.file = imageFile;
        console.log("formData.file: ", imageformData.imageFile);
      }
      if (selectedType) imageformData.type = selectedType;

      if (imageInputCompPosRef?.current?.x)
        imageformData.x = imageInputCompPosRef.current.x;

      if (imageInputCompPosRef?.current?.y)
        imageformData.y = imageInputCompPosRef.current.y;

      try {
        const response = await fetch(
          "http://localhost:5000/account/userid/canvas-management/canvaid",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(imageformData),
          }
        );
        if (response.ok) {
          canvaNotification_CreateImage();
        } else {
          canvaNotification_CreateImageFailed();
        }
      } catch (err: any) {
        new Notification("Image input anomaly detected, investigate code!");
        console.log("err: ", err.message);
        return;
      }
    }

    //   const imageFormData: any = {};
    // if (imageFile) imageFormData.file = imageFile;

    // if (selectedType) imageFormData.type = selectedType;

    // if (imageInputCompPosRef?.current?.x)
    //   imageFormData.x = imageInputCompPosRef.current.x;

    // if (imageInputCompPosRef?.current?.y)
    //   imageFormData.y = imageInputCompPosRef.current.y;

    // if (
    // //   !newImageComponent.files ||
    //   !selectedType ||
    //   !imageInputCompPosRef.current.x ||
    //   !imageInputCompPosRef.current.y
    // ) {
    //   new Notification("image Component must be filled with data");
    //   return;
    // } else {
    //   const files = await fetch(
    //     `http://localhost:5000/api/account/${params.userid}/canvas-management/${params.canvaid}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(imageFormData),
    //     }
    //   );
    //   if (files.ok) {
    //     //notification ok response
    //     canvaNotification_CreateImage();
    //     updateCanvasData();
    //     setImageFile(null);
    //     return;
    // } else {
    //     canvaNotification_CreateImageFailed();
    //     return;
    //   }
    // }
  };

  const processImageMouseMove = (event: React.MouseEvent) => {
    if (
      !globalDraggingRef.current ||
      !dataScrollBoardRef.current ||
      !imageInputCompRef.current
    )
      return;

    const imageInputElement = imageInputCompRef.current as HTMLDivElement;
    const imageInputElementRect = imageInputElement.getBoundingClientRect();
    const boardRect = dataScrollBoardRef.current.getBoundingClientRect();

    //mouse position inside the board
    const mouseInsideBoardX = event.clientX - boardRect.left;
    const mouseInsideBoardY = event.clientY - boardRect.top;
    // console.log("mouseInsideBoardX: ", mouseInsideBoardX);
    // console.log("mouseInsideBoardY: ", mouseInsideBoardY);

    //When we first click down, we store how far from the element's left and top the mouse was (imageInputOffSet.current.x/y)
    const newXElementLeft = mouseInsideBoardX - imageInputOffSet.current.x;
    const newYElementTop = mouseInsideBoardY - imageInputOffSet.current.y;
    // console.log("newXElementLeft: ", newXElementLeft);
    // console.log("newYElementTop: ", newYElementTop);

    // set boundaries so draggables dont go outside the drag frame
    const newPosX = Math.max(
      0,
      Math.min(newXElementLeft, boardRect.width - imageInputElementRect.width)
    );
    const newPosY = Math.max(
      0,
      Math.min(newYElementTop, boardRect.height - imageInputElementRect.height)
    );

    imageInputCompPosRef.current = {
      x: newPosX,
      y: newPosY,
    };

    if (imageInputElement) {
      imageInputElement.style.left = `${imageInputCompPosRef.current.x}px`;
      imageInputElement.style.top = `${imageInputCompPosRef.current.y}px`;
    }
  };
  const processImageMouseUp = () => {
    globalDraggingRef.current = false;
    document.removeEventListener<any>("mousemove", processImageMouseMove);
    document.removeEventListener<any>("mouseup", processImageMouseUp);
    imageInputOffSet.current = {
      x: imageInputCompPosRef.current.x,
      y: imageInputCompPosRef.current.y,
    };
  };
  const processImageMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    globalDraggingRef.current = true;
    const imageElement = imageInputCompRef.current as HTMLDivElement;
    const textElementRect = imageElement.getBoundingClientRect();
    //Store where inside the element-textui the click happened
    imageInputOffSet.current = {
      x: event.clientX - textElementRect.left,
      y: event.clientY - textElementRect.top,
    };
    document.addEventListener<any>("mousemove", processImageMouseMove);
    document.addEventListener<any>("mouseup", processImageMouseUp);
  };

  //     return (
  //     <DivClass className={"image-info"}>
  //       <Figure className={"figure"}>
  //         <DivClass className={""}>
  //           <input
  //             type={"file"}
  //             className={"input-image-file"}
  //             accept="image/*"
  //             onChange={captureImage}
  //           />
  //         </DivClass>
  //       </Figure>
  //     </DivClass>
  //   );
  // };
  return (
    imageToggleState && (
      <div
        className={"data-image-component"}
        ref={imageInputCompRef}
        style={{
          position: "absolute",
          top: `${imageInputCompPosRef.current.x}px`,
          left: `${imageInputCompPosRef.current.y}px`,
          color: "#fff",
          //   zIndex: 4,
        }}
        onMouseDown={processImageMouseDown}
      >
        <form className={"image-input-form"} onSubmit={uploadImage}>
          <DivClass className={"image-label-wrapper"}>
            {selectedType === "Single" ? (
              <Label
                htmlfor="enabled-image-input-field"
                className={"image-label"}
                text="Add Single Image"
              />
            ) : (
              <Label
                htmlfor="enabled-images-input-field"
                className={"images-label"}
                text="Add Many Images"
              />
            )}
          </DivClass>
          <DivClass className={"image-container"}>
            <DivClass className={"image-input-wrapper"}>
              {selectedType === "Multiple" ? (
                <EnabledImagesInput
                  id="enabled-images-input-field"
                  className={"enabled-images-input-field"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newImage = e.target.files;
                    if (newImage && newImage.length > 0) {
                      setImageFile((prevState: any) => ({
                        ...prevState,
                        files: Array.from(newImage),
                      }));
                    }
                  }}
                />
              ) : (
                <EnabledImageInput
                  id="enabled-image-input-field"
                  className={"enabled-image-input-field"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newImage = e.target.files;
                    if (newImage && newImage.length > 0) {
                      setImageFile((prevState: any) => ({
                        ...prevState,
                        files: Array.from(newImage),
                      }));
                    }
                  }}
                />
              )}
              <DivClass className={"image-btn-container"}>
                <DivClass className={"image-submit-btn-container"}>
                  <Button id="image-btn-submit" className={"image-btn-submit"}>
                    SAVE
                  </Button>
                </DivClass>
                <DivClass className={"image-selection-wrapper"}>
                  <Select
                    id="select-image-type"
                    className={"select-image-type"}
                    value={selectedType}
                    onChange={updateImageSelectionType}
                  >
                    <option
                      id="image-type-option-one"
                      className={"image-type-option-one"}
                      value={"Single"}
                    >
                      Single
                    </option>
                    <option
                      id="image-type-option-two"
                      className={"image-type-option-two"}
                      value={"Multiple"}
                    >
                      Many
                    </option>
                  </Select>
                </DivClass>
              </DivClass>
            </DivClass>
          </DivClass>
        </form>
      </div>
    )
  );
};

export default ImageInputUnit;
