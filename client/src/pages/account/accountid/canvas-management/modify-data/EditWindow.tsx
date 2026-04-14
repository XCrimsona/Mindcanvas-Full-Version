import { DivClass } from "../../../../../ui/Div";
import "./modification-window.css";
import ShortText from "../../../../../ui/ShortText";
import Button from "../../../../../components/form-elements/Button";
import { useModificationContext } from "./InfoModificationContextProvider";
import { toast } from "react-toastify";

//Components uses context boolean states in collaboration with
//toggleModificationState(); and toggleMediaWindowState();
export const EditWindow = ({ componentData }: { componentData: any }) => {
  const { owner, _id, workspaceId, type, text, link } = componentData;
  //context constants from InfoModificationContextProvider
  const {
    setEditWindow,
    setModificationWindow,
    newComponentData,
    setComponentData,
    editLiveDataElement,
  } = useModificationContext();

  const copyToTextClipboard = async (text: string) => {
    if (!text) {
      toast.info("Not copied");
      return;
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied Text");
      return;
    }
  };
  const copyToLinkClipboard = async (link: string) => {
    if (!text) {
      toast.info("Not copied");
      return;
    } else {
      await navigator.clipboard.writeText(link);
      toast.success("Copied Link");
      return;
    }
  };
  const pasteTextToClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();

    if (!clipboardData) {
      toast.info("No  to paste");
      return;
    } else {
      setComponentData({
        ...newComponentData,
        text: clipboardData,
      });
      return;
    }
  };

  const pasteLinkToClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();

    if (!clipboardData) {
      toast.info("No  to paste");
      return;
    } else {
      setComponentData({
        ...newComponentData,
        link: clipboardData,
      });
      return;
    }
  };

  const currentType = (dataType: string) => {
    switch (dataType) {
      case "TextLink":
        return "266px";
      case "Text":
        return "222px";
      case "DougnutChart":
        return "250px";
      default:
        break;
    }
  };

  return (
    <DivClass className={"edit-window-container"}>
      <ShortText className={"window-heading"}>You are editing:</ShortText>
      <DivClass className={"update-box"}>
        <DivClass className={"box-one"}>
          <>
            {type === "TextLink" && link && (
              <>
                <div className="dual-data">
                  <input
                    type="text"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoSave="off"
                    id="enabled-link-input-field"
                    placeholder="https://..."
                    className={"box-one-enabled-linkdescription-input-field"}
                    value={link}
                    readOnly
                  />
                  <Button
                    id="change-windows"
                    onClick={() => {
                      copyToLinkClipboard(link);
                      return;
                    }}
                    className={"copy-clipboard-button"}
                  >
                    Copy to Clipboard
                  </Button>
                  <textarea
                    className={"pulled-text"}
                    disabled
                    value={text}
                    readOnly
                  ></textarea>
                </div>
                <Button
                  id="change-windows"
                  onClick={() => {
                    copyToTextClipboard(text);
                    return;
                  }}
                  className={"copy-clipboard-button"}
                >
                  Copy to Clipboard
                </Button>
              </>
            )}
            {type === "Text" && text && (
              <>
                <textarea
                  className={"pulled-text-data"}
                  disabled
                  value={text}
                  readOnly
                ></textarea>
                <Button
                  id="change-windows"
                  onClick={() => {
                    copyToTextClipboard(text);
                    return;
                  }}
                  className={"copy-clipboard-button"}
                >
                  Copy Text
                </Button>
              </>
            )}
          </>
          <Button
            id="change-windows"
            onClick={() => {
              setEditWindow(false);
              setModificationWindow(true);
            }}
            className={"change-windows"}
          >
            Back
          </Button>
        </DivClass>
        <div
          className={"style-div"}
          style={{
            height: currentType(type),
          }}
        ></div>
        <DivClass className={"box-two"}>
          {type === "Text" && (
            <DivClass className={"new-text"}>
              <textarea
                id={`${_id}`}
                className={"new-data"}
                rows={8}
                value={newComponentData.text}
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setComponentData({
                    ...newComponentData,
                    text: e.target.value,
                  });
                }}
                placeholder="Your new data"
              />
              <Button
                id="change-windows"
                onClick={() => {
                  pasteTextToClipboard();
                }}
                className={"paste-clipboard-button"}
              >
                Write link
              </Button>
            </DivClass>
          )}
          {type === "TextLink" && (
            <DivClass className={"new-linktext"}>
              <div className="dual-data">
                <input
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoSave="off"
                  id={`${_id}-enabled-link-input-field`}
                  placeholder="http:// or https://"
                  className={"box-two-enabled-linkdescription-input-field"}
                  value={newComponentData.link}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setComponentData({
                      ...newComponentData,
                      link: e.target.value,
                    });
                  }}
                />
                <Button
                  id="change-windows"
                  onClick={() => {
                    pasteLinkToClipboard();
                  }}
                  className={"paste-clipboard-button"}
                >
                  Write link
                </Button>
                <textarea
                  id={`${_id}`}
                  className={"new-data"}
                  rows={8}
                  value={newComponentData.text}
                  required
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setComponentData({
                      ...newComponentData,
                      text: e.target.value,
                    });
                  }}
                  placeholder="Your new data"
                />
                <Button
                  id="change-windows"
                  onClick={() => {
                    pasteTextToClipboard();
                  }}
                  className={"paste-clipboard-button"}
                >
                  Write Text
                </Button>
              </div>
            </DivClass>
          )}
          {type === "DoughnutChart" && (
            <DivClass className={"new-linktext"}>
              <div className="dual-data">
                <input
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoSave="off"
                  id={`${_id}-enabled-link-input-field`}
                  placeholder="https://..."
                  className={"box-two-enabled-linkdescription-input-field"}
                  value={newComponentData.link}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setComponentData({
                      ...newComponentData,
                      link: e.target.value,
                    });
                  }}
                />
                <Button
                  id="change-windows"
                  onClick={() => {
                    pasteLinkToClipboard();
                  }}
                  className={"paste-clipboard-button"}
                >
                  Write link
                </Button>
                <textarea
                  id={`${_id}`}
                  className={"new-data"}
                  rows={8}
                  value={newComponentData.text}
                  required
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setComponentData({
                      ...newComponentData,
                      text: e.target.value,
                    });
                  }}
                  placeholder="Your new data"
                />
                <Button
                  id="change-windows"
                  onClick={() => {
                    pasteTextToClipboard();
                  }}
                  className={"paste-clipboard-button"}
                >
                  Write Text
                </Button>
              </div>
            </DivClass>
          )}
          <button
            type="submit"
            className={"update-button"}
            id="edit-button"
            onClick={() => {
              if (!newComponentData) {
                toast.info("Enter new data to update the present text");
              } else {
                // _id is the componont being edited
                editLiveDataElement(
                  owner,
                  _id,
                  workspaceId,
                  type,
                  newComponentData.text,
                  newComponentData.link,
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
