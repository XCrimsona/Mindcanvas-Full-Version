import { DivClass } from "../../../../../../ui/Div";
import SVG from "../../../../../../SVG";
import Button from "../../../../../../components/form-elements/Button";
import "../../CanvasHub/comp-hub-data-components.css";
import { useComponentHub } from "../ComponentHubContextProvider";
import { TextButton } from "../../DataComponents/text/TextButton";
// import { AudioButton } from "../DataComponents/audio/AudioButton";
// import { VideoButton } from "../DataComponents/video/VideoButton";
// import { ImageButton } from "../../DataComponents/image/ImageButton";
import { motion } from "framer-motion";
const ComponentHub = () => {
  const {
    visbilityState,
    toggleVisbilityState,
    animationState,
    toggleAnimationState,
  } = useComponentHub();

  return (
    visbilityState && (
      <>
        <motion.div
          initial={{ left: 300, opacity: 0 }}
          animate={
            animationState
              ? { left: 366, opacity: 1 }
              : { left: 300, opacity: 0 }
          }
          exit={{ left: 300, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`comp-hub-data-component-container`}
        >
          <DivClass className={"center-comp-hub-component"}>
            <Button id="close-icon-wrapper" className={"close-icon-wrapper"}>
              <SVG
                className={"close-icon"}
                src="/close-icon.svg"
                alt="Close Icon"
                onClick={() => {
                  toggleAnimationState();
                  setTimeout(() => {
                    toggleVisbilityState();
                  }, 1500);
                }}
              />
            </Button>

            <motion.div
              // initial={{ x: 0, opacity: 0 }}
              // animate={{ x: 366, opacity: 1 }}
              // transition={{ duration: 0.5, ease: "easeInOut" }}
              className={"comp-hub-data-creation-components"}
            >
              <TextButton />
              {/* <AudioButton /> */}
              {/* <ImageButton /> */}
              {/* <VideoButton /> */}
            </motion.div>
          </DivClass>
        </motion.div>
        {/* )  */}
        {/* ( */}
        {/* <motion.div
          initial={{ left: 366, opacity: 1 }}
          animate={{ left: 0, opacity: 0 }}
          exit={{ left: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={"comp-hub-data-component-container"}
        >
          <DivClass className={"center-comp-hub-component"}>
            <Button id="close-icon-wrapper" className={"close-icon-wrapper"}>
              <SVG
                className={"close-icon"}
                src="/close-icon.svg"
                alt="Close Icon"
                onClick={toggleVisbilityState}
              />
            </Button>

            <motion.div
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 366, opacity: 1 }}
              exit={{ left: 366, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={"comp-hub-data-creation-components"}
            >
              <TextButton />
              <AudioButton />
              <ImageButton />
              <VideoButton />
            </motion.div>
          </DivClass>
        </motion.div> */}
      </>
    )
  );
};

export default ComponentHub;
