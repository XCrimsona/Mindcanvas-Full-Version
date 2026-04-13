import Button from "../../../../../../components/form-elements/Button";
import { useCanvasContext } from "../canva-data-provider/CanvasDataContextProvider";
import "../../CanvasHub/comp-hub-data-components.css";
export const DoughnutChartButton = () => {
  // Toggles Doughnut Chart state true or false to display or hide doughnut chart component in DataContainer component.
  const { setDoughnutChartToggle } = useCanvasContext();
  return (
    <Button
      id="doughnut-chart-comp"
      onClick={() => setDoughnutChartToggle(true)}
      className={"doughnut-chart-comp"}
    >
      Doughnut Chart
    </Button>
  );
};
