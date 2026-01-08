import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

//for all draggable items inside the data-scroll-board
type TypeGlobalDragRefContext = true | false;

//workspace view and editable toggler values
type TypeWorkspaceSizeContext = true | false;

//component hub button toggling core definitions
//component hub text button toggler values
type TypeTextContext = true | false;
//component hub Audio button toggler values
type TypeAudioContext = true | false;
//component hub Image button toggler values
type TypeImageContext = true | false;
//component hub text button toggler values
type TypeVideoContext = true | false;

type TypeWorkspaceData = any | null;
//workspace data text input component types
type TypeWorkspaceInputContext = string | null;

interface IWorkspaceContextType {
  dataScrollBoardRef: RefObject<HTMLDivElement | null>;
  globalDraggingRef: RefObject<TypeGlobalDragRefContext>;

  //Global Text Component for data input
  textInputOffSet: RefObject<{ x: number; y: number }>;
  textToggleState: TypeTextContext;
  toggleTextState: () => void;
  textInputCompRef: RefObject<HTMLDivElement | null>;
  textInputCompPosRef: RefObject<{ x: number; y: number }>;

  //Global Audio Component for data input
  audioInputOffSet: RefObject<{ x: number; y: number }>;
  audioToggleState: TypeAudioContext;
  toggleAudioState: () => void;
  audioInputCompPosRef: RefObject<{ x: number; y: number }>;
  audioInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Image Component for data input
  imageInputOffSet: RefObject<{ x: number; y: number }>;
  imageToggleState: TypeImageContext;
  toggleImageState: () => void;
  imageInputCompPosRef: RefObject<{ x: number; y: number }>;
  imageInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Video Component for data input
  videoInputOffSet: RefObject<{ x: number; y: number }>;
  videoToggleState: TypeVideoContext;
  toggleVideoState: () => void;
  videoInputCompPosRef: RefObject<{ x: number; y: number }>;
  videoInputCompRef: RefObject<HTMLDivElement | null>;

  //Global Data Component
  //Element used to carry database and responsible for mapping
  workspaceData: TypeWorkspaceData;
  updateWorkspaceData: () => void;

  //workspace size, height and width
  workspaceSizePropertiesToggleState: TypeWorkspaceSizeContext;
  toggleWorkspaceSizePropertiesState: (value: boolean) => void;
  workspaceWidth: TypeWorkspaceInputContext;
  workspaceHeight: TypeWorkspaceInputContext;
  updateDataBoardWorkspaceHeight: (height: string) => void;
  updateDataBoardWorkspaceWidth: (width: string) => void;
}

const WorkspaceContextType = createContext<IWorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceContextProvider = ({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) => {
  //globally assigned window
  const dataScrollBoardRef = useRef<HTMLDivElement>(null);
  //used as failsafe to prevent accidental drags
  const globalDraggingRef = useRef<TypeGlobalDragRefContext>(false);

  //Text Component
  //Workspace Text Button toggle logic on the ComponentHub popup box
  const textInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [textToggleState, setTextToggleState] =
    useState<TypeTextContext>(false);
  const toggleTextState = () => {
    setTextToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const textInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const textInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //Audio Component
  //Workspace Audio Button toggle logic on the ComponentHub popup box
  const audioInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [audioToggleState, setAudioToggleState] =
    useState<TypeAudioContext>(false);
  const toggleAudioState = () => {
    setAudioToggleState((prev) => (prev === false ? true : false));
  };

  //find audio input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const audioInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const audioInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //IMAGE Component
  //Workspace Image Button toggle logic on the ComponentHub popup box
  const imageInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [imageToggleState, setImageToggleState] =
    useState<TypeImageContext>(false);
  const toggleImageState = () => {
    setImageToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const imageInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const imageInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //VIDEO Component
  //Workspace Image Button toggle logic on the ComponentHub popup box
  const videoInputOffSet = useRef<any>({ x: 0, y: 0 });

  const [videoToggleState, setVideoToggleState] =
    useState<TypeVideoContext>(false);
  const toggleVideoState = () => {
    setVideoToggleState((prev) => (prev === false ? true : false));
  };

  //find text input component's dom reference and x,y position under the
  //data-scroll-board component as absolute value
  const videoInputCompRef = useRef<HTMLDivElement>(null)!;
  //for position reference
  const videoInputCompPosRef = useRef<any>({ x: 0, y: 0 });

  //DATA
  //element used to carry database and responsible for mapping
  const [workspaceData, setWorkspaceData] = useState<any>(null);

  const updateWorkspaceData = async () => {
    const routeResponse = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/workspace-management/workspace/${params.workspaceid}/${params.workspacename}`
    );
    if (routeResponse.ok) {
      const response = await routeResponse.json();
      console.log("user db data from ContextProvider: ", response);

      setWorkspaceData(response.data);
    } else {
      alert("Failed to update workspace data");
      return;
    }
  };

  //workspace height and width above Workspace Size Properties
  //toggle view and edit buttons
  const [
    workspaceSizePropertiesToggleState,
    setWorkspaceSizePropertiesToggleState,
  ] = useState<TypeWorkspaceSizeContext>(false);

  const toggleWorkspaceSizePropertiesState = () => {
    setWorkspaceSizePropertiesToggleState((prev) =>
      prev === false ? true : false
    );
  };

  //to adjust the data-scroll-board div element's width
  const [workspaceHeight, setWorkspaceSizeHeight] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceHeight = (height: string) => {
    setWorkspaceSizeHeight((prev) =>
      prev === workspaceHeight ? height : workspaceHeight
    );
  };

  //to adjust the data-scroll-board div element's height
  const [workspaceWidth, setWorkspaceSizeWidth] =
    useState<TypeWorkspaceInputContext>("");
  const updateDataBoardWorkspaceWidth = (width: string) => {
    setWorkspaceSizeWidth((prev) =>
      prev === workspaceWidth ? width : workspaceWidth
    );
  };

  return (
    <WorkspaceContextType.Provider
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
        workspaceData,
        updateWorkspaceData,

        //workspace size height and width
        workspaceSizePropertiesToggleState,
        toggleWorkspaceSizePropertiesState,
        workspaceHeight,
        workspaceWidth,
        updateDataBoardWorkspaceHeight,
        updateDataBoardWorkspaceWidth,
      }}
    >
      {children}
    </WorkspaceContextType.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContextType);
  if (!context)
    throw new Error(
      "useWorkspaceContext must be used inside WorkspaceContextProvider"
    );
  return context;
};
