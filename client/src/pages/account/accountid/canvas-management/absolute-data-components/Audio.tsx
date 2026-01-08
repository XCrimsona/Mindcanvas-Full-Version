// import React from "react";
import { DivClass } from "../../../../../../src/ui/Div";
import { LongText } from "../../../../../../src/ui/LongText";

export const ImmutableAudio = ({ data }: any) => {
  return (
    <DivClass className={"audio-info"}>
      <LongText className={"audio-name"}>{data.name}</LongText>
      <audio src={data.audio.src} className={"audio"} />
    </DivClass>
    // </Div>
  );
};

// export const MutableAudio = ({ data }: any) => {
//   return (
//     <Div className={"audio-info"]}>
//       <LongText className={"audio-name"]}>
//         {data.name}
//       </LongText>
//       <audio src className={"audio"]} translate={"yes"} />
//     </Div>
//     // </Div>
//   );
// };
