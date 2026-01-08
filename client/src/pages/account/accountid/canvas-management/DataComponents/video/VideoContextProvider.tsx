import {
  createContext,
  ReactNode,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

type TypeVideoContext = true | false;
interface IVideoContextType {
  videoToggleState: TypeVideoContext;
  toggleVideoState: () => void;
  videoInputCompref: MutableRefObject<HTMLDivElement | null>;
}

const VideoContext = createContext<IVideoContextType | undefined>(undefined);

export const VideoContextProvider = ({ children }: { children: ReactNode }) => {
  const [videoToggleState, setVideoToggleState] =
    useState<TypeVideoContext>(false);

  const toggleVideoState = () => {
    setVideoToggleState((prev) => (prev === false ? true : false));
  };

  const videoInputCompref = useRef<HTMLDivElement | null>(null);
  return (
    <VideoContext.Provider
      value={{ videoToggleState, toggleVideoState, videoInputCompref }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context)
    throw new Error("useVideoContext must be used inside VideoContextProvider");
  return context;
};
