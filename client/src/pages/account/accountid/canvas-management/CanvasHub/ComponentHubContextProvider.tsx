import { createContext, ReactNode, useContext, useState } from "react";

//for toggling
type TypeSharedUseStateContext = true | false;
interface IComponentHubContextType {
  visbilityState: TypeSharedUseStateContext;
  toggleVisbilityState: () => void;
  animationState: TypeSharedUseStateContext;
  toggleAnimationState: () => void;
}

// Context for managing shared state across components
const ComponentHubContext = createContext<IComponentHubContextType | undefined>(
  undefined
);

export const ComponentHubProvider = ({ children }: { children: ReactNode }) => {
  const [visbilityState, setToggleVisbilityState] =
    useState<TypeSharedUseStateContext>(false);
  const toggleVisbilityState = () => {
    setToggleVisbilityState((prev) => (prev === false ? true : false));
  };
  const [animationState, setAnimationState] =
    useState<TypeSharedUseStateContext>(false);
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
