import {
  createContext,
  ReactNode,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

type TypeImageContext = true | false;
interface IImageContextType {
  imageToggleState: TypeImageContext;
  toggleImageState: () => void;
  imageInputCompref: MutableRefObject<HTMLDivElement | null>;
}

const ImageContext = createContext<IImageContextType | undefined>(undefined);

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const [imageToggleState, setImageToggleState] =
    useState<TypeImageContext>(false);

  const toggleImageState = () => {
    setImageToggleState((prev) => (prev === false ? true : false));
  };

  const imageInputCompref = useRef<HTMLDivElement | null>(null);
  return (
    <ImageContext.Provider
      value={{ imageToggleState, toggleImageState, imageInputCompref }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const conImage = useContext(ImageContext);
  if (!conImage)
    throw new Error("useImageContext must be used inside ImageContextProvider");
  return conImage;
};
