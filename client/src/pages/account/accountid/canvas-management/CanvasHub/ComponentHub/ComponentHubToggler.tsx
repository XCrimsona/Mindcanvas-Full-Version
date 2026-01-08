import "../component-hub-container.css";
import { useComponentHub } from "../ComponentHubContextProvider";
import { LongText } from "../../../../../../ui/LongText";

const ComponentHubToggler = () => {
  const { toggleVisbilityState, toggleAnimationState, animationState } =
    useComponentHub();

  return (
    <button
      className={"component-hub-btn"}
      onClick={() => {
        if (animationState) {
          toggleAnimationState();
          setTimeout(() => {
            toggleVisbilityState();
          }, 1500);
        } else {
          toggleVisbilityState();
          toggleAnimationState();
        }
      }}
    >
      <LongText className={"longtext"}>Fragment Hub</LongText>
    </button>
  );
};

export default ComponentHubToggler;
