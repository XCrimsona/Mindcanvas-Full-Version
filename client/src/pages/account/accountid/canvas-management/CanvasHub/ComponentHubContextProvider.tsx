import { createContext, ReactNode, useContext, useState } from "react";

//for toggling
type VisibilityContext = true | false;
interface IComponentHubContextType {
  visbilityState: VisibilityContext;
  toggleVisbilityState: () => void;
  animationState: VisibilityContext;
  toggleAnimationState: () => void;
}

// Context for managing shared state across components
const ComponentHubContext = createContext<IComponentHubContextType | undefined>(
  undefined
);

export const ComponentHubProvider = ({ children }: { children: ReactNode }) => {
  const [visbilityState, setToggleVisbilityState] =
    useState<VisibilityContext>(false);
  const toggleVisbilityState = () => {
    setToggleVisbilityState((prev) => (prev === false ? true : false));
  };
  const [animationState, setAnimationState] =
    useState<VisibilityContext>(false);
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
      "ComponentHubContext must be used within ComponentHubProvider "
    );
  }
  return context;
};
