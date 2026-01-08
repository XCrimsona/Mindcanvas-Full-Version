import CanvaComponent from "./CanvaComponent/CanvaComponent";
import CanvasDataContextProvider from "./DataComponents/canva-data-provider/CanvasDataContextProvider";

const CanvaPage = () => {
  return (
    <CanvasDataContextProvider>
      <CanvaComponent />
    </CanvasDataContextProvider>
  );
};

export default CanvaPage;
