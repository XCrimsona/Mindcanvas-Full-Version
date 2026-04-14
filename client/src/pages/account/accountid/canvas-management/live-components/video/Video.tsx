import { SpanFragment } from "../../../../../../ui/spanElement";
import { DivClass } from "../../../../../../ui/Div";
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { useCanvasContext } from "../../form-components/canva-data-provider/CanvasDataContextProvider";
import { EditWindow } from "../../modify-data/EditWindow";
import { ModificationWindow } from "../../modify-data/ModificationWindow";
import { useParams } from "react-router-dom";
import "./video-data-styling.css";

export const Video = ({ data }: { data: any }) => {
  const { userid, canvaid } = useParams();
  const { _id, type } = data;

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
      info: "",
    });

    moveFragment(e);
  };
  return (
    <>
      {/* Modification + Edit Windows */}
      {modificationWindow && selectedComp.dataFragmentId === _id && (
        <ModificationWindow componentData={data} />
      )}

      {editState && selectedComp.dataFragmentId === _id && (
        <EditWindow componentData={data} />
      )}

      {/* Fragment Container */}
      <DivClass className={"video-fragment-container"}>
        <div id={`${_id}`} className={"video-fragment"}>
          {/* Actual Video */}
          <SpanFragment
            id={`${data._id}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              selectFragmentId(e);
              setRepositionWindow(false);
              setModificationWindow(true);
            }}
            className="i-note-drop-down"
          >
            i
          </SpanFragment>
          <video
            crossOrigin="use-credentials"
            className="video-element"
            controls
            preload="metadata"
            src={`http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}/video/${_id}`}
          />
        </div>
      </DivClass>
    </>
  );
};
