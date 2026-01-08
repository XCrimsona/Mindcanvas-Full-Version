import {
  createContext,
  ReactNode,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

type TypeAudioContext = true | false;
interface IAudioContextType {
  audioToggleState: TypeAudioContext;
  toggleAudioState: () => void;
  audioInputCompref: MutableRefObject<HTMLDivElement | null>;
}

const AudioContext = createContext<IAudioContextType | undefined>(undefined);

export const AudioContextProvider = ({ children }: { children: ReactNode }) => {
  const [audioToggleState, setAudioToggleState] =
    useState<TypeAudioContext>(false);

  const toggleAudioState = () => {
    setAudioToggleState((prev) => (prev === false ? true : false));
  };

  const audioInputCompref = useRef<HTMLDivElement | null>(null);
  return (
    <AudioContext.Provider
      value={{ audioToggleState, toggleAudioState, audioInputCompref }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const conAudio = useContext(AudioContext);
  if (!conAudio)
    throw new Error("useAudioContext must be used inside AudioContextProvider");
  return conAudio;
};
