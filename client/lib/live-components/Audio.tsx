// import React from "react";
import { DivClass } from "../ui/Div";
import { LongText } from "../ui/LongText";

export const ImmutableAudio = ({ data }: any) => {
  return (
    <DivClass className={"audio-info"}>
      <LongText className={"audio-name"}>{data.name}</LongText>
      <audio src={data.audio.src} className={"audio"} />
    </DivClass>
    // </Div>
  );
};
