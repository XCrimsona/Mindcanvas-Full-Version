// import { DivClass } from "../../../../../../src/ui/Div";
// import Figure from "../../../../../../src/ui/Figure";
// import Figcaption from "../../../../../../src/ui/Figcaption";
// import { useState } from "react";
// import { SpanFragment } from "../../../../../ui/spanElement";
// import { ImageFragment } from "../../../../../ui/ImageFragment";
// import { useModificationContext } from "../modify-data/InfoModificationContextProvider";

// export const Image = ({ data }: any) => {
//   extract _id from data object
//   const { _id } = data;

//   const { modificationState, selectedComp, editState, mouseClick } =
//     useModificationContext();
//   return (
//   {

//         <>
//           UI code implementation works in reverse but the css still displays
//           the context on the right next to the live data which is correct </>
//   }
//   {
//     {modificationState && selectedComp === _id && (
//             <ModificationWindow componentData={data} />
//           )}
//           {editState && selectedComp === _id && <EditWindow componentData={data} />}
//           <DivClass className={"text-fragment-container"}>
//             <TextFragment id={`${data._id}`} className={"text-fragment"}>
//               <TextSpanFragment
//                 id={`${data._id}`}
//                 onClick={mouseDoubleClick}
//                 className="i-note-drop-down"
//               >
//                 i
//               </TextSpanFragment>
//               {data.text}
//             </TextFragment>
//           </DivClass>
//         </>
//       );

//   }
//   return (
//     <DivClass className={"image-fragment-container"}>
//       <ImageFragment
//         className={"image-fragment"}
//         src={data.image}
//         alt={data.alt_description}
//       >
//         <SpanFragment
//           id={`${data._id}`}
//           onClick={mouseDoubleClick}
//           className="i-note-drop-down"
//         >
//           i
//         </SpanFragment>
//       </ImageFragment>
//     </DivClass>
//   );
// };

// export const MutableImage = ({ data }: any) => {
//   return (
//     <DivClass className={"image-info"}>
//       <Figure className={"figure"}>
//         <DivClass className={""}>
//           <input type="file" src={data?.src} className={"image"} />
//         </DivClass>
//         <Figcaption className="">{data?.caption}</Figcaption>
//       </Figure>
//     </DivClass>
//   );
// };
