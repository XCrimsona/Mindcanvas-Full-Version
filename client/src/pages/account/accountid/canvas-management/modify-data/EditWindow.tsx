import { DivClass } from "../../../../../ui/Div";
import StylerDiv from "../../../../../ui/StylerDiv";

//css file contain the edit styling
import "./modification-window.css";
import ShortText from "../../../../../ui/ShortText";
import Button from "../../../../../components/form-elements/Button";
import { useModificationContext } from "./InfoModificationContextProvider";
import { toast } from "react-toastify";

//Components uses context boolean states in collaboration with
//toggleModificationState(); and toggleMediaWindowState();
export const EditWindow = ({ componentData }: { componentData: any }) => {
  //context constants from InfoModificationContextProvider
  const {
    toggleEditStateFunc,
    toggleModificationState,
    newComponentData,
    setComponentData,
    editLiveDataElement,
    updateComponentData,
  } = useModificationContext();

  const copyToClipboard = async (text: string) => {
    if (!text) {
      toast.info("Nothing to copy");
      return;
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
      return;
    }
  };
  const pasteToClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();

    if (!clipboardData) {
      toast.info("Nothing to paste");
      return;
    } else {
      setComponentData(clipboardData);
      return;
    }
  };
  const { owner, _id, workspaceId, type, text } = componentData;
  return (
    <DivClass className={"edit-window-container"}>
      <ShortText className={"window-heading"}>You are editing:</ShortText>
      <DivClass className={"update-box"}>
        <DivClass className={"box-one"}>
          <DivClass className={"pull-data-container"}>
            <textarea
              className={"pulled-data"}
              disabled
              value={text}
            ></textarea>
          </DivClass>
          <Button
            id="change-windows"
            onClick={() => {
              copyToClipboard(text);
              return;
            }}
            className={"copy-clipboard-button"}
          >
            Copy to Clipboard
          </Button>
          <Button
            id="change-windows"
            onClick={() => {
              toggleEditStateFunc();
              toggleModificationState();
              return;
            }}
            className={"change-windows"}
          >
            Back
          </Button>
        </DivClass>
        <StylerDiv className={"style-div"}></StylerDiv>
        <DivClass className={"box-two"}>
          <DivClass className={"new-text"}>
            <textarea
              id={`${_id}`}
              className={"new-data"}
              rows={8}
              value={newComponentData}
              required
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                updateComponentData(e.target.value);
                return;
              }}
              placeholder="Your new data"
            />
          </DivClass>
          <StylerDiv className={"new-text-style-div"}></StylerDiv>
          <Button
            id="change-windows"
            onClick={() => {
              pasteToClipboard();
              return;
            }}
            className={"paste-clipboard-button"}
          >
            Write latest clipboard
          </Button>
          <button
            type="submit"
            className={"update-button"}
            id="edit-button"
            onClick={() => {
              if (!newComponentData) {
                toast.info("Enter new data to update the present text");
              } else {
                // _id is the componont being edited
                //newComponentData === text
                editLiveDataElement(
                  owner,
                  _id,
                  workspaceId,
                  type,
                  newComponentData
                );
              }
            }}
          >
            Update
          </button>
        </DivClass>
      </DivClass>
    </DivClass>
  );
};
