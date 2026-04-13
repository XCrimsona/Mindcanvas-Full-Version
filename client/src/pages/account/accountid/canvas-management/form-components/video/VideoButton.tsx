import Button from "../../../../../../components/form-elements/Button";
import "../../CanvasHub/comp-hub-data-components.css";

import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";

export const VideoButton = () => {
  // Toggles Video state true or false to display or hide video component in DataContainer component.
  const { setVideoToggle } = useCanvasContext();
  return (
    <Button
      id="video-comp"
      onClick={() => setVideoToggle(true)}
      className={"video-comp"}
    >
      Video
    </Button>
  );
};
