import { DivClass } from "../../../../../ui/Div";
import "./data-container.css";
import TextInputUnit from "../DataComponents/text/TextInputUnit";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import CanvasData from "../canvas-data/CanvasData";
import RepositionLiveData from "../DataComponents/mediaReposition/RepositionLiveData";
// import AudioInputUnit from "./DataComponents/audio/AudioInputUnit";
import ImageInputUnit from "../DataComponents/image/ImageInputUnit";
// import VideoInputUnit from "./DataComponents/video/VideoInputUnit";
const CanvaContainer = () => {
  const { dataScrollBoardRef, canvasHeight, canvasWidth, canvasData } =
    useCanvasContext();

  return (
    <DivClass className={"data-container"}>
      <div
        className={"data-scroll-board"}
        ref={dataScrollBoardRef}
        style={{
          width: `${canvasData.data?.workspaceNameData?.canvaspace?.size?.width}px`,
          height: `${canvasData.data?.workspaceNameData?.canvaspace?.size?.height}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Below InputUnits used for multi media submits */}
        <TextInputUnit />
        {/* <AudioInputUnit params={params} /> */}
        <ImageInputUnit />
        {/* <VideoInputUnit params={params} /> */}
        {/* display cloud data below */}
        <RepositionLiveData />

        <CanvasData />
      </div>
    </DivClass>
  );
};

export default CanvaContainer;
