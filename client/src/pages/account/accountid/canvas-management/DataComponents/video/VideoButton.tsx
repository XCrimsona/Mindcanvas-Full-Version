import Button from "../../../../../../components/form-elements/Button";
import "../../../../../../../style-files/comp-hub-data-components.css";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";

export const VideoButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleVideoState } = useCanvasContext();
  return (
    <Button id="video-comp" onClick={toggleVideoState} className={"video-comp"}>
      Video
    </Button>
  );
};
