import { createContext, ReactNode, useContext, useState } from "react";

//for toggling
type animationStateContext = true | false;
interface IComponentHubContextType {
  visbilityState: animationStateContext;
  toggleVisbilityState: () => void;
  animationState: animationStateContext;
  toggleAnimationState: () => void;
  setAnimationState: React.Dispatch<
    React.SetStateAction<animationStateContext>
  >;
}

// Context for managing shared state across components
const ComponentHubContext = createContext<IComponentHubContextType | undefined>(
  undefined,
);

export const ComponentHubProvider = ({ children }: { children: ReactNode }) => {
  const [visbilityState, setToggleVisbilityState] =
    useState<animationStateContext>(false);
  const toggleVisbilityState = () => {
    setToggleVisbilityState((prev) => (prev === false ? true : false));
  };
  const [animationState, setAnimationState] =
    useState<animationStateContext>(false);
  const toggleAnimationState = () => {
    setAnimationState((prev) => (prev === false ? true : false));
  };

  return (
    <ComponentHubContext.Provider
      value={{
        visbilityState,
        toggleVisbilityState,
        animationState,
        toggleAnimationState,
        setAnimationState,
      }}
    >
      {children}
    </ComponentHubContext.Provider>
  );
};

export const useComponentHub = () => {
  const context = useContext(ComponentHubContext);
  if (!context) {
    throw new Error(
      "ComponentHubContext must be used within ComponentHubProvider ",
    );
  }
  return context;
};
