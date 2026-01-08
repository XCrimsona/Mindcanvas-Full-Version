import { DivClass } from "../../../../../../src/ui/Div";
import { LongText } from "../../../../../../src/ui/LongText";

export const ImmutableVideo = ({ data }: any) => {
  return (
    <div
      className={"video-component"}
      key={data._id}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <DivClass className={"video-info"}>
        <LongText className={"video-name"}>{data.name}</LongText>
        <video id="video" className={"video"} />
      </DivClass>
    </div>
  );
};

export const MutableVideo = ({ data }: any) => {
  return (
    <div
      className={"video-component"}
      key={data._id}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <DivClass className={"video-info"}>
        <LongText className={"video-name"}>{data.name}</LongText>
        <video id="video" className={"video"} />
      </DivClass>
    </div>
  );
};
