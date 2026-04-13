import { DivClass } from "../../../../../ui/Div";
import "./data-container.css";
import TextInputUnit from "../form-components/text/TextInputUnit";
import { useCanvasContext } from "../form-components/canva-data-provider/CanvasDataContextProvider";
import CanvasData from "../canvas-data/CanvasData";
import RepositionLiveData from "../form-components/mediaReposition/RepositionLiveData";
// import AudioInputUnit from "./form-components/audio/AudioInputUnit";
import DoughnutChartInputUnit from "../form-components/chart/DoughnutChartInputUnit";
import TextLinkInputUnit from "../form-components/link/LinkInputUnit";
import VideoInputUnit from "../form-components/video/VideoInputUnit";
import ImageInputUnit from "../form-components/image/ImageInputUnit";
const CanvaContainer = () => {
  const { dataScrollBoardRef, canvasData } = useCanvasContext();
  const canvaspaceSize = canvasData.data?.workspaceNameData?.canvaspace?.size;
  return (
    <DivClass className={"data-container"}>
      <div
        className={"data-scroll-board"}
        ref={dataScrollBoardRef}
        style={{
          width: `${canvaspaceSize?.width}px`,
          height: `${canvaspaceSize?.height}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Below InputUnits used for multi media submits */}
        <TextInputUnit />
        <DoughnutChartInputUnit />
        <TextLinkInputUnit />
        {/* <AudioInputUnit params={params} /> */}
        <ImageInputUnit />
        <VideoInputUnit />

        <RepositionLiveData />
        <CanvasData />
      </div>
    </DivClass>
  );
};

export default CanvaContainer;
