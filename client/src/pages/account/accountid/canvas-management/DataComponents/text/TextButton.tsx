import Button from "../../../../../../components/form-elements/Button";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";
import "../../CanvasHub/comp-hub-data-components.css";
export const TextButton = () => {
  // Toggles Text state true or false to display or hide text component in DataContainer component.
  const { toggleTextState } = useCanvasContext();
  return (
    <Button id="text-comp" onClick={toggleTextState} className={"text-comp"}>
      Text Fragment
    </Button>
  );
};
