import { useCanvasContext } from "../DataComponents/canva-data-provider/CanvasDataContextProvider";
import { Text } from "../absolute-data-components/Text/Text";
// import { ImmutableList } from "../absolute-data-components/TextList";
// import { ImmutableAudio } from "../absolute-data-components/TextAudio";
// import { Image } from "../absolute-data-components/Image";
// import { ImmutableVideo } from "../absolute-data-components/Text/Video";
import ShortText from "../../../../../ui/ShortText";

const CanvasData = () => {
  // Display all workspace data including text, list, audio, image, video once submitted
  const { canvasData } = useCanvasContext();
  const result =
    canvasData &&
    canvasData.data?.workspaceNameData?.workspaceData?.texts?.map(
      (data: any) => {
        // canvasData.data?.workspaceNameData?.workspaceData.texts.map((data: any) => {
        const renderDataByComponentType = (data: any) => {
          switch (data.type) {
            case "Text":
              return <Text data={data} />;
            // case "roundchart":
            //   return <RoundChart data={data} />;
            // case "graphchart":
            //   return <GraphChart data={data} />;
            // case "code":
            //   return <CodeText data={data} />;
            // case "list":
            //   return <ImmutableList data={data} />;
            // case "audio":
            //   return <ImmutableAudio data={data} />;
            // case "image":
            //   return <Image data={data} />;
            // case "video":
            //   return <ImmutableVideo data={data} />;
            default:
              return (
                <ShortText className={"unsupported-type-text"}>
                  Unsupported Type
                </ShortText>
              );
          }
        };
        return (
          <div
            className={"data-component"}
            key={data._id}
            style={{
              position: "absolute",
              left: `${data.position.x}px`,
              top: `${data.position.y}px`,
              color: "#fff",
              transition: "left .4s ease-in-out, top .4s ease-in-out",
            }}
          >
            {renderDataByComponentType(data)}
          </div>
        );
      }
    );
  const noWorkspaceData = canvasData?.code === "NO_EXISTING_DATA" && (
    <p>{canvasData?.message}</p>
  );
  return <div> {canvasData?.length === 0 ? noWorkspaceData : result}</div>;
};

export default CanvasData;
