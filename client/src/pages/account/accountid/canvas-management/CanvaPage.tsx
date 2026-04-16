import CanvaComponent from "./CanvaContainer/CanvasWrapper";
import CanvasDataContextProvider from "../../../../../lib/form-components/canva-data-provider/CanvasDataContextProvider";

const CanvaPage = () => {
  return (
    <CanvasDataContextProvider>
      <CanvaComponent />
    </CanvasDataContextProvider>
  );
};

export default CanvaPage;
