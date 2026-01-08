import { useRef } from "react";
import { useCanvasContext } from "./canva-data-provider/CanvasDataContextProvider";

const draggingIdRef = useRef<string | null>(null);
const offSetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

//the parent div holding all the draggable content
const { dataScrollBoardRef } = useCanvasContext();

//Dynamic Data Component
export const compHubDataElementMouseDownEvent = (
  event: React.MouseEvent,
  id: string
) => {
  draggingIdRef.current = id;
  const InputDataComponentRect = event.currentTarget.getBoundingClientRect();
  //find parent(sub-container)'s width and height and establish offset
  offSetRef.current = {
    x: event.clientX - InputDataComponentRect.width,
    y: event.clientY - InputDataComponentRect.height,
  };
};

export const compHubDataElementMouseMoveEvent = (event: React.MouseEvent) => {
  const id = draggingIdRef.current;
  if (!id || !dataScrollBoardRef.current) return;

  const dataScrollBoardRect =
    dataScrollBoardRef.current.getBoundingClientRect();
  console.log(dataScrollBoardRect);

  // Create a useref to capture the dataScrollBoardchildren's parent being dragged in the workspace
  // const containedDraggablesRect = parentOfDraggableData.current?.getBoundingClientRect();
  const mouseX = event.clientX - dataScrollBoardRect.left;
  const mouseY = event.clientY - dataScrollBoardRect.top;

  //find the height and width of the selected element
  let newXValue = mouseX - offSetRef.current.x;
  let newYValue = mouseY - offSetRef.current.y;

  //data-scroll-board's children width and height
  const childX = 300;
  const childY = 200;

  //find the difference in width and height of where the selected element is inside the parent(sub container)
  const maxX: number = dataScrollBoardRect.width - childX;
  const maxY: number = dataScrollBoardRect.height - childY;

  //find the coordinates of where the selected element is inside the parent(sub container)
  newXValue = Math.max(0, Math.min(newXValue, maxX));
  newYValue = Math.max(0, Math.min(newYValue, maxY));
};

export const compHubDataElementMouseUpEvent = (event: React.MouseEvent) => {
  draggingIdRef.current = null;
};
