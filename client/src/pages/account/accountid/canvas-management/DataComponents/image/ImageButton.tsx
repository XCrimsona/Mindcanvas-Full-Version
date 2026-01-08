import Button from "../../../../../../components/form-elements/Button";
import "../../CanvasHub/comp-hub-data-components.css";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";

export const ImageButton = () => {
  // Toggles Image state true or false to display or hide image component in DataContainer component.
  const { toggleImageState } = useCanvasContext();
  return (
    <Button id="image-comp" onClick={toggleImageState} className={"image-comp"}>
      Image
    </Button>
  );
};
