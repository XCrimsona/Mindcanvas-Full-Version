//This file is used to toggle the element based on its id and location selected on the canvas workspace
//double click or doubletap to toggle the window to view or modify data
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
// import canvaNotification_Edit from "../notifications/fragment-updates/CanvaNotification_Edit";
// import canvaNotification_EditFailed from "../notifications/fragment-updates/CanvaNotification_EditFailed";
// // import canvaNotification_Delete from "../notifications/canva-deletes/CanvaNotification_Delete";
// import canvaNotification_TextFragmentDeleted from "../notifications/fragment-deletes/CanvaNotification_TextFragmentDeleted";
// import canvaNotification_TextFragmentDeletedFailed from "../notifications/fragment-deletes/CanvaNotification_TextFragmentDeleteFailed";
import { toast } from "react-toastify";

type TypeModificationContext = true | false;
interface IModificationUseStateContextType {
  //state being toggled. This toggles the modification window that carries the edit and
  //delete component which is activated when a live db tsx component is double clicked in the browser
  modificationState: TypeModificationContext;
  updateModificationState: (value: boolean) => void;
  //toggle modification window
  toggleModificationState: () => void;

  //tracks which component is being double clciked and
  //its is designed to pass objects of data to other functions that compile different pieces of
  //data and is used the component hub built in components that enables dynamic data creation
  dataComponent: Record<string, number>;
  setDataComponent: (componentData: any) => void;

  selectedComp: string | undefined;
  setSelectedComp: (componentId: any) => void;

  PinToScreen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ReOrganizeFragment: (e: React.MouseEvent<HTMLButtonElement>) => void;
  DeleteDataFragment: (e: React.MouseEvent<HTMLButtonElement>) => void;

  //state being toggled
  editState: TypeModificationContext;

  //toggle edit window
  toggleEditStateFunc: () => void;

  //tracks which component is being double clciked and
  // only work with the toggled element for editing data
  newComponentData: string;
  setComponentData: (text: string) => void;
  editLiveDataElement: (
    _id: string,
    userid: string,
    canvaid: string,
    type: string,
    text: string,
  ) => void;

  deleteLiveDataElement: (
    userid: string,
    _id: string,
    canvaid: string,
    // workspacename: string,
    componentType: string,
  ) => void;

  updateComponentData: (data: string) => void;

  antiDeleteLock: boolean;
  setAntiDeleteLock: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDeleteLock: () => void;

  //Pin feature to mount below data-fragments onto the canvas
  pinnedText: boolean;
  setPinnedText: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTextPin: () => void;

  // pinnedAudio: Record<string, boolean>;
  // setPinnedAudio: React.Dispatch<React.SetStateAction<string>>;
  // toggleAudioPin: (id: string) => void;

  // pinnedImage: Record<string, boolean>;
  // setPinnedImage: React.Dispatch<React.SetStateAction<string>>;
  // toggleImagePin: (id: string) => void;

  // pinnedVideo: Record<string, boolean>;
  // setPinnedVideo: React.Dispatch<React.SetStateAction<string>>;
  // toggleVideoPin: (id: string) => void;
}

const ModificationContext = createContext<
  IModificationUseStateContextType | undefined
>(undefined);

const InfoModificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //modification state controller. context boolean state determines when the modification window appear by user interaction
  const [modificationState, setModificationState] =
    useState<TypeModificationContext>(false);

  //update the boolean value of the modificationState to improve selection flow of the live data component and the modification window
  const updateModificationState = (value: boolean) => {
    setModificationState(value);
  };

  const toggleModificationState = () => {
    setModificationState((prev) => (prev === false ? true : false));
  };

  //edit context
  const [editState, setEditState] = useState<TypeModificationContext>(false);
  const toggleEditStateFunc = () => {
    setEditState((prev) => (prev === false ? true : false));
  };

  //above component needs an updating function
  const [dataComponent, setDataComponent] = useState<Record<string, number>>(
    {},
  );

  //live data component's element id is stored inside and updated based on the double click
  // to set it and reset its value is empty string when the user clicks delete inside the
  // InfoModification window that deletes the component
  const [selectedComp, setSelectedComp] = useState<string>("");
  //From the WorkspaceContextProvider, it refreshes the displayed data after
  // data has been deleted using deleteLiveDataElement.
  const { updateCanvasData, updateMediaCanvaDataFragment } = useCanvasContext();

  // const { updateWorkspaceData } = useWorkspaceContext();
  //find the double clicked element and modify data
  const editLiveDataElement = async (
    userid: string,
    _id: string,
    canvaid: string,
    type: string,
    text: string,
  ) => {
    try {
      const updateType = "Text";

      const editedRequest = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
        {
          method: "PATCH",
          headers: {
            "x-active-user": userid,
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            // _id is the information component primary key
            _id: _id,
            type: type,
            updateType: updateType,
            text: text,
          }),
        },
      );
      if (editedRequest.ok) {
        toast.warning("A data text fragment has been updated!");
        updateCanvasData();
      } else {
        toast.error("Text fragment data was not updated!");
      }
    } catch (error: any) {
      console.log("edit error: ", error.message);
      return;
    }
  };

  const [antiDeleteLock, setAntiDeleteLock] = useState<boolean>(true);
  const toggleDeleteLock = () => {
    setAntiDeleteLock((prev) => (prev === true ? false : true));
    return;
  };

  //lock fail safe
  useEffect(() => {
    if (antiDeleteLock === false && modificationState === false) {
      setAntiDeleteLock(true);
    }
  }, [antiDeleteLock, modificationState]);

  //deleteLiveDataElement deletes data by finding the id of the
  //data stored in the database
  const deleteLiveDataElement = async (
    userid: string,
    _id: string,
    canvaid: string,
    type: string,
  ) => {
    try {
      const deleteRequest = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "x-active-user": userid,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            // _id is the information component displayed from the database which the user created
            _id,
            //component type
            type,
          }),
        },
      );
      if (deleteRequest.ok) {
        toast.success("Attention: Text fragment has been deleted!");
        updateCanvasData();
      } else {
        toast.error("Text fragment deletetion failed!");
      }
    } catch (error: any) {
      console.warn("edit error: ", error.message);
      return;
    }
  };

  const [newComponentData, setComponentData] = useState<string>("");

  const updateComponentData = (data: string) => {
    setComponentData(data);
    return;
  };

  //PIN FEATURES
  const [mainFragmentXYCoorindates, setMainFragmentXYCoorindates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  // const [mainFragmentXYCoorindates, setmainFragmentXYCoorindates] = useState<{
  //   x: number;
  //   y: number;
  // }>({ x: 0, y: 0 });
  function updateOriginalFragmentXYCoorindates(x: number, y: number) {
    setMainFragmentXYCoorindates({ x, y });
  }
  const [pinnedText, setPinnedText] = useState<boolean>(false);
  const toggleTextPin = () => {
    setPinnedText((prev) => (prev === false ? true : false));
  };

  const PinToScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    //you need to create conditional code to add a pin feature here
    const sourceOfClickedId = (e.target as HTMLElement).id;
    const dataComponentDiv = (e.target as HTMLElement).closest(
      ".data-component",
    ) as HTMLDivElement;

    //you need to create conditional code to add a pin feature here
    // console.log(
    //   "mainFragmentContainer2: ",
    //   parseFloat(dataComponentDiv.style.left),
    // );
    localStorage.setItem("ComponentId", sourceOfClickedId);
    localStorage.setItem("Value", sourceOfClickedId);
    localStorage.setItem("Pinned", "true");
    // console.log(
    //   "mainFragmentContainer2: ",
    //   parseFloat(dataComponentDiv.style.top),
    // );
    updateOriginalFragmentXYCoorindates(
      parseFloat(dataComponentDiv.style.left),
      parseFloat(dataComponentDiv.style.top),
    );
    //^save pin feature original xy values befor the click overwrites the current values^^^^

    if (dataComponentDiv) {
      console.log("dataComponentDiv: ", dataComponentDiv);
      if (pinnedText === false) {
        console.log(dataComponentDiv.style.position);
        dataComponentDiv.style.position = "fixed";
        dataComponentDiv.style.left = "70px";
        dataComponentDiv.style.top = "100px";
        dataComponentDiv.style.zIndex = "20";
        setPinnedText(true);
      } else {
        dataComponentDiv.style.left = `${mainFragmentXYCoorindates.x}px`;
        dataComponentDiv.style.top = `${mainFragmentXYCoorindates.y}px`;
        dataComponentDiv.style.position = "absolute";
        setPinnedText(false);
      }
    }
    return;
  };

  //this mouse click event is fired when selected by the user using the i icon and stores
  //the found data element's id in selectedComp
  const ReOrganizeFragment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataFragmentId = String((e.target as HTMLElement).id);
    const fragmentText = (e.target as HTMLElement).parentElement?.childNodes[1]
      .textContent;

    //to update the xy values of a live ui component
    setSelectedComp(dataFragmentId);
    const dataComponentValues = (e.target as HTMLElement).closest(
      ".data-component",
    ) as HTMLDivElement;

    const left = dataComponentValues.style.left;
    const top = dataComponentValues.style.top;

    //provides the elemtn id to capture data and pass references
    updateMediaCanvaDataFragment({
      fragmentText,
      dataFragmentId,
      left,
      top,
    });

    //enables the menu and bring up forward
    updateModificationState(true);

    return;
    // }
  };

  //this mouse click event is fired when a live data element is already selected
  // and then removed from the selectedComp that has been stored when the mouse
  // double click event was fired.
  const DeleteDataFragment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedElement = (e.target as HTMLElement).id;
    if (clickedElement) {
      setSelectedComp("");
    }
    toggleModificationState();
  };

  return (
    <ModificationContext.Provider
      value={{
        editState,
        toggleEditStateFunc,
        dataComponent,
        setDataComponent,
        newComponentData,
        setComponentData,

        updateModificationState,
        modificationState,
        toggleModificationState,

        editLiveDataElement,
        deleteLiveDataElement,
        updateComponentData,
        selectedComp,
        setSelectedComp,
        PinToScreen,
        ReOrganizeFragment,
        DeleteDataFragment,
        antiDeleteLock,
        setAntiDeleteLock,
        toggleDeleteLock,
        pinnedText,
        setPinnedText,
        toggleTextPin,
      }}
    >
      {children}
    </ModificationContext.Provider>
  );
};
export default InfoModificationContextProvider;

export const useModificationContext = () => {
  const context = useContext(ModificationContext);
  if (!context) {
    throw new Error(
      "useModificationContext must be used within ModificationContext",
    );
  }
  return context;
};
