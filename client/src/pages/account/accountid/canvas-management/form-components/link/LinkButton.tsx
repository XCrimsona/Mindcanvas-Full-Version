import Button from "../../../../../../components/form-elements/Button";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";
import "../../CanvasHub/comp-hub-data-components.css";
export const LinkButton = () => {
  // Toggles Link state true or false to display or hide link component in DataContainer component.
  const { setTextLinkToggle } = useCanvasContext();
  return (
    <Button
      id="textlink-comp"
      onClick={() => setTextLinkToggle(true)}
      className={"textlink-comp"}
    >
      Link
    </Button>
  );
};
