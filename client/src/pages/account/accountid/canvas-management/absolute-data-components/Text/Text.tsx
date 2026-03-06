import { TextFragment } from "../../../../../../ui/LongText";
//text input unit. Not the output styling
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { DivClass } from "../../../../../../ui/Div";
import { EditWindow } from "../../modify-data/EditWindow";
import { ModificationWindow } from "../../modify-data/ModificationWindow";
import { SpanFragment } from "../../../../../../ui/spanElement";
import "../../DataComponents/text/text.css";
import "../i-note.css";
import "./text-data-styling.css";
import { useState } from "react";
// import { useCanvasContext } from "../../DataComponents/canva-data-provider/CanvasDataContextProvider";

//This component is used to display already create info TextInput is the one that creates text
export const Text = ({ data }: { data: any }) => {
  //extract _id from data object
  const { _id } = data;

  const { modificationState, selectedComp, editState, ReOrganizeFragment } =
    useModificationContext();

  return (
    <>
      {/* UI code implementation works in reverse but the css still displays 
      the context on the right next to the live data which is correct */}
      {modificationState && selectedComp === _id && (
        <ModificationWindow componentData={data} />
      )}
      {editState && selectedComp === _id && <EditWindow componentData={data} />}
      <DivClass className={"text-fragment-container"}>
        <TextFragment id={`${data._id}`} className={"text-fragment"}>
          <SpanFragment
            id={`${data._id}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              ReOrganizeFragment(e);
              //   style={{
              //   problem with below line: once toggle all would be fixed. Id ref require dto make fixed position
              //   position: `${pinnedText === true ? "fixed" : "absolute"}`,
              // }}
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
