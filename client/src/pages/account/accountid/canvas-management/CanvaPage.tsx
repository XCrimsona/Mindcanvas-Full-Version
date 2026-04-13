import CanvaComponent from "./CanvaComponent/CanvaComponent";
import CanvasDataContextProvider from "./form-components/canva-data-provider/CanvasDataContextProvider";

const CanvaPage = () => {
  return (
    <CanvasDataContextProvider>
      <CanvaComponent />
    </CanvasDataContextProvider>
  );
};

export default CanvaPage;
