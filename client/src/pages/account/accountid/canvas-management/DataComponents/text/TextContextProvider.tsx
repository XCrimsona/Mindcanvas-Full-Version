import {
  createContext,
  ReactNode,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

type TypeTextContext = true | false;
interface ITextContextType {
  textToggleState: TypeTextContext;
  toggleTextState: () => void;
  textInputCompref: MutableRefObject<HTMLDivElement | null>;
}

const TextContext = createContext<ITextContextType | undefined>(undefined);

export const TextContextProvider = ({ children }: { children: ReactNode }) => {
  const [textToggleState, setTextToggleState] =
    useState<TypeTextContext>(false);

  const toggleTextState = () => {
    setTextToggleState((prev) => (prev === false ? true : false));
  };

  const textInputCompref = useRef<HTMLDivElement | null>(null);
  return (
    <TextContext.Provider
      value={{ textToggleState, toggleTextState, textInputCompref }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context)
    throw new Error("useTextContext must be used inside TextContextProvider");
  return context;
};
