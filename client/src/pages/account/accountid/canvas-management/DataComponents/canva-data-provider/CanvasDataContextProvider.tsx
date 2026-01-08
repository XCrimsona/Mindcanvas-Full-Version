import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";

//for all draggable items inside the data-scroll-board
type TypeGlobalDragRefContext = true | false;

//Canvas view and editable toggler values
type TypeCanvasSizeContext = true | false;

//component hub button toggling core definitions
//component hub text button toggler values
type TypeTextContext = true | false;
//component hub Audio button toggler values
type TypeAudioContext = true | false;
//component hub Image button toggler values
type TypeImageContext = true | false;
//component hub text button toggler values
type TypeVideoContext = true | false;

type TypeCanvasData = any | null;
//Canvas data text input component types
type TypeCanvasInputContext = string | null;

//component hub text button toggler values
type TypeMediaContext = true | false;

interface ICanvasContextType {
  dataScrollBoardRef: MutableRefObject<HTMLDivElement | null>;
  globalDraggingRef: MutableRefObject<TypeGlobalDragRefContext>;

  //Global Text Component for data input
  textInputOffSet: MutableRefObject<{ x: number; y: number }>;
  textToggleState: TypeTextContext;
  toggleTextState: () => void;
  textInputCompRef: MutableRefObject<HTMLDivElement | null>;
  textInputCompPosRef: MutableRefObject<{ x: number; y: number }>;

  //Global Audio Component for data input
  audioInputOffSet: MutableRefObject<{ x: number; y: number }>;
  audioToggleState: TypeAudioContext;
  toggleAudioState: () => void;
  audioInputCompPosRef: MutableRefObject<{ x: number; y: number }>;
  audioInputCompRef: MutableRefObject<HTMLDivElement | null>;

  //Global Image Component for data input
  imageInputOffSet: MutableRefObject<{ x: number; y: number }>;
  imageToggleState: TypeImageContext;
  toggleImageState: () => void;
  imageInputCompPosRef: MutableRefObject<{ x: number; y: number }>;
  imageInputCompRef: MutableRefObject<HTMLDivElement | null>;

  //Global Video Component for data input
  videoInputOffSet: MutableRefObject<{ x: number; y: number }>;
  videoToggleState: TypeVideoContext;
  toggleVideoState: () => void;
  videoInputCompPosRef: MutableRefObject<{ x: number; y: number }>;
  videoInputCompRef: MutableRefObject<HTMLDivElement | null>;

  //Global Data Component
  //Element used to carry database and responsible for mapping
  canvasData: TypeCanvasData;
  // setCanvasData:()=>void;
  setFreshCanvasData: (source: any) => void;
  updateCanvasData: () => void;

  //Canvas size, height and width
  canvasSizePropertiesToggleState: TypeCanvasSizeContext;
  toggleCanvasSizePropertiesState: (value: boolean) => void;
  canvasWidth: TypeCanvasInputContext;
  canvasHeight: TypeCanvasInputContext;
  updateDataBoardCanvasHeight: (height: string) => void;
  updateDataBoardCanvasWidth: (width: string) => void;

  //Global reposition Component for live data
  mediaCanvaDataFragment: TypeCanvasData;
  mediaWindowToggleState: TypeMediaContext;
  toggleMediaWindowState: () => void;
  mediaInputOffSet: MutableRefObject<{ x: number; y: number }>;
  mediaInputCompPosRef: MutableRefObject<{ x: number; y: number }>;
  mediaInputCompRef: MutableRefObject<HTMLDivElement | null>;
  updateMediaCanvaDataFragment: (source: any) => void;
}

const CanvasContextType = createContext<ICanvasContextType | undefined>(
  undefined
);

const CanvasDataContextProvider = ({
  // source,
  children,
}: {
  // source: any;
  children: ReactNode;
}) => {
  //globally assigned window
  const dataScrollBoardRef = useRef<HTMLDivElement>(null);
  //used as failsafe to prevent accidental drags====this one may not be necessary
  const globalDraggingRef = useRef<TypeGlobalDragRefContext>(false);

  //Text Component
  //Canvas Text Button toggle logic on the ComponentHub popup box
  const textInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [textToggleState, setTextToggleState] =
    useState<TypeTextContext>(false);
  const toggleTextState = () => {
    setTextToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const textInputCompRef = useRef<HTMLDivElement>(null);
  //for position reference
  let textInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //Audio Component
  //Canvas Audio Button toggle logic on the ComponentHub popup box
  const audioInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [audioToggleState, setAudioToggleState] =
    useState<TypeAudioContext>(false);
  const toggleAudioState = () => {
    setAudioToggleState((prev) => (prev === false ? true : false));
  };

  //find audio input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const audioInputCompRef = useRef<HTMLDivElement>(null);
  //for position reference
  const audioInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //IMAGE Component
  //Canvas Image Button toggle logic on the ComponentHub popup box
  const imageInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [imageToggleState, setImageToggleState] =
    useState<TypeImageContext>(false);
  const toggleImageState = () => {
    setImageToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const imageInputCompRef = useRef<HTMLDivElement>(null);
  //for position reference
  const imageInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //VIDEO Component
  //Canvas Image Button toggle logic on the ComponentHub popup box
  const videoInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [videoToggleState, setVideoToggleState] =
    useState<TypeVideoContext>(false);
  const toggleVideoState = () => {
    setVideoToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const videoInputCompRef = useRef<HTMLDivElement>(null);
  //for position reference
  const videoInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //Element used to carry database user data and responsible for mapping with an addtional
  //'data' object to ensure the data is mappable from all fetches since the backend uses a
  //data object when returning mutiple types of data that the frontend requires.
  const [canvasData, setCanvasData] = useState<{}>({});
  const setFreshCanvasData = (source: any) => {
    setCanvasData(source);
    // console.log("source from setFreshCanvasData function: ", source);
    return;
  };
  const { userid, canvaid } = useParams();

  const updateCanvasData = async () => {
    if (!userid) return;
    const routeResponse = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "x-active-user": userid,
          "Content-Type": "application/json",
        },
      }
    );
    const response: any = await routeResponse.json();
    // console.log("from updateCanvasData data reload ccomponent ", response);

    if (!response.success) {
      switch (response.code) {
        case "MISSING_ROUTE_DATA":
          new Notification(response.code);
          return {
            status: "empty",
            message: response.message,
          };
        case "MISSING_USER_DATA":
          new Notification(response.code);
          return {
            status: "empty",
            message: response.message,
          };
        case "SERVER_WORKSPACE_ERROR":
          new Notification(response.code);
          return {
            status: "error",
            message: response.message,
          };
        default:
          console.log("route error");

          return {
            status: "error",
            message: response.message || "Unhandled backend condition.",
          };
      }
    } else {
      // console.log("response data live: ", response);
      const latestData = {
        data: response,
      };
      setCanvasData(latestData);
    }

    // return {
    //   status: "success",
    //   data: response.data,
    // };
  };

  //Canvas height and width above Canvas Size Properties
  //toggle view and edit buttons
  const [canvasSizePropertiesToggleState, setCanvasSizePropertiesToggleState] =
    useState<TypeCanvasSizeContext>(false);

  const toggleCanvasSizePropertiesState = () => {
    setCanvasSizePropertiesToggleState((prev) =>
      prev === false ? true : false
    );
  };

  //to adjust the data-scroll-board div element's width
  const [canvasHeight, setCanvasSizeHeight] =
    useState<TypeCanvasInputContext>(""); //800
  const updateDataBoardCanvasHeight = (height: string) => {
    setCanvasSizeHeight((prev) =>
      prev === canvasHeight ? height : canvasHeight
    );
  };

  //to adjust the data-scroll-board div element's height
  const [canvasWidth, setCanvasSizeWidth] =
    useState<TypeCanvasInputContext>(""); //1600
  const updateDataBoardCanvasWidth = (width: string) => {
    setCanvasSizeWidth((prev) => (prev === canvasWidth ? width : canvasWidth));
  };

  //DO NOT REMOVE PRODUCT NOT COMPLETE
  //backup
  // dataScrollBoardRef,
  // textInputOffSet,
  // globalDraggingRef,
  // textInputCompPosRef,
  // textInputCompRef;

  //Reposition Component
  //Canvas Text Button toggle logic on the ComponentHub popup box
  // const mediaInputOffSet = useRef<any>({ x: null, y: null });

  const [mediaWindowToggleState, setMediaWindowToggleState] =
    useState<TypeTextContext>(false);
  const toggleMediaWindowState = () => {
    //toggle function
    setMediaWindowToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value and is used to update the position of a fragment.
  //carries 4 four key pair values:
  // clickedElementValues, the tsx/html value that comes from the database
  // clickedElement, the tsx/html structure itself
  // left, a pixel x value
  // top,a pixel x value
  const [mediaCanvaDataFragment, setMediaCanvaDataFragment] = useState<{}>({});
  const updateMediaCanvaDataFragment = (source: any) => {
    setMediaCanvaDataFragment(source);
    // console.log("source from setMediaCanvaDataFragment function: ", source);
    return;
  };
  const mediaInputOffSet = useRef<any>({ x: 0, y: 0 });

  const mediaInputCompRef = useRef<HTMLDivElement>(null);
  //for position reference
  const mediaInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  return (
    <CanvasContextType.Provider
      value={{
        dataScrollBoardRef,
        //draggable boolean failsafe unit to prevent accidental drag event through
        // mouse all components that use mouseevents
        globalDraggingRef,

        //Text Button toggle functions
        textInputOffSet,
        textToggleState,
        toggleTextState,
        textInputCompPosRef,
        textInputCompRef,

        //Audio Button toggle functions
        audioInputOffSet,
        audioToggleState,
        toggleAudioState,
        audioInputCompRef,
        audioInputCompPosRef,

        //Image Button toggle functions
        imageInputOffSet,
        imageToggleState,
        toggleImageState,
        imageInputCompRef,
        imageInputCompPosRef,

        //Video Button toggle functions
        videoInputOffSet,
        videoToggleState,
        toggleVideoState,
        videoInputCompRef,
        videoInputCompPosRef,

        //data
        canvasData,
        setFreshCanvasData,
        updateCanvasData,

        //Canvas size height and width
        canvasSizePropertiesToggleState,
        toggleCanvasSizePropertiesState,
        canvasHeight,
        canvasWidth,
        updateDataBoardCanvasHeight,
        updateDataBoardCanvasWidth,

        //reposition component
        mediaCanvaDataFragment,
        updateMediaCanvaDataFragment,
        mediaWindowToggleState,
        toggleMediaWindowState,
        mediaInputOffSet,
        mediaInputCompPosRef,
        mediaInputCompRef,
        // processTextMouseDown,
      }}
    >
      {children}
    </CanvasContextType.Provider>
  );
};

export default CanvasDataContextProvider;

export const useCanvasContext = () => {
  const context = useContext(CanvasContextType);
  if (!context)
    throw new Error(
      "useCanvasContext must be used inside CanvasDataContextProvider"
    );
  return context;
};
