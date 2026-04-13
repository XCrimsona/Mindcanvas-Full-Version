import { TextFragment } from "../../../../../../ui/LongText";
//text input unit. Not the output styling
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { DivClass } from "../../../../../../ui/Div";
import { EditWindow } from "../../modify-data/EditWindow";
import { ModificationWindow } from "../../modify-data/ModificationWindow";
import { SpanFragment } from "../../../../../../ui/spanElement";
import "../../form-components/text/text.css";
import "../i-note.css";
import "./text-data-styling.css";
import { useCanvasContext } from "../../form-components/canva-data-provider/CanvasDataContextProvider";
// import { useCanvasContext } from "../../live-components/canva-data-provider/CanvasDataContextProvider";

//This component is used to display already create info TextInput is the one that creates text
export const Text = ({ data }: { data: any }) => {
  //extract _id from data object
  const { _id, type } = data;
  // console.log(_id, type);

  const {
    modificationWindow,
    selectedComp,
    setSelectedComp,
    editState,
    moveFragment,
    setModificationWindow,
  } = useModificationContext();
  const { setRepositionWindow } = useCanvasContext();

  const selectFragmentId = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataFragmentId = String((e.target as HTMLElement).id);
    setSelectedComp({
      dataFragmentId: dataFragmentId,
      type: type,
      //this may break fetch data
      info: "",
    });
    // const el = (e.target as HTMLDivElement).closest(
    //   ".data-component",
    // ) as HTMLDivElement;
    // const TopVal = el.style.left;
    // const leftVal = el.style.left;
    moveFragment(e);
    return;
  };

  return (
    <>
      {/* UI code implementation works in reverse but the css still displays 
      the context on the right next to the live data which is correct */}
      {modificationWindow && selectedComp.dataFragmentId === _id && (
        <ModificationWindow componentData={data} />
      )}
      {editState && selectedComp.dataFragmentId === _id && (
        <EditWindow componentData={data} />
      )}
      <DivClass className={"text-fragment-container"}>
        <TextFragment id={`${_id}`} className={"text-fragment"}>
          <SpanFragment
            id={`${data._id}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              selectFragmentId(e);
              setRepositionWindow(false);
              setModificationWindow(true);
              //style={{
              //  problem with below line: once toggle all would be fixed. Id ref require dto make fixed position
              //  position: `${pinnedText === true ? "fixed" : "absolute"}`,
              //}}
            }}
            className="i-note-drop-down"
          >
            i
          </SpanFragment>
          {data.text}
        </TextFragment>
      </DivClass>
    </>
  );
};
