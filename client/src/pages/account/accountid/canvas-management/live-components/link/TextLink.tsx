import React from "react";
import { DivClass } from "../../../../../../ui/Div";
import "./textlink-data-styling.css";

import { ModificationWindow } from "../../modify-data/ModificationWindow";
import { EditWindow } from "../../modify-data/EditWindow";
import { TextLinkFragment } from "../../../../../../ui/TextLink";
import { SpanFragment } from "../../../../../../ui/spanElement";
import { TextFragment } from "../../../../../../ui/LongText";
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { useCanvasContext } from "../../form-components/canva-data-provider/CanvasDataContextProvider";

const TextLink = ({ data }: { data: any }) => {
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
      <DivClass className={"textlink-fragment-container"}>
        {/* <TextLinkFragmentFragment id={`${_id}`} href={data.href} className={"text-fragment"}> */}
        <TextFragment id={`${_id}`} className={"textlink-fragment"}>
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
          <TextLinkFragment
            id={data._id}
            className="block text-[#FAAA00CC] underline"
            href={data.link}
            text={data.link}
          />
          {data.text}
        </TextFragment>
      </DivClass>
    </>
  );
};

export default TextLink;
