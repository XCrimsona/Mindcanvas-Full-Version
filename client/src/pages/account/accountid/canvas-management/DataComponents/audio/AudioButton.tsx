import Button from "../../../../../../components/form-elements/Button";
import "../../../../../../../style-files/comp-hub-data-components.css";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";

export const AudioButton = () => {
  //Toggles Audio state true or false to display or hide audio component in DataContainer component.
  const { toggleAudioState } = useCanvasContext();
  return (
    <Button id="audio-comp" onClick={toggleAudioState} className={"audio-comp"}>
      Audio
    </Button>
  );
};
