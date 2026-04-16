import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import canvaNotification_Delete from "../notifications/canva-deletes/CanvaNotification_Delete";
import { toast } from "react-toastify";

type TypeCanvasDeletionOpsContext = true | false;

interface ICanvasDeletionContext {
  canvasDeletionState: TypeCanvasDeletionOpsContext;
  canvasDeletionToggle: () => void;
  hitClickDelete: () => void;
  canvasName: string;
  setCanvasName: (workspacename: string) => void;
}

const CanvasContextDeletionType = createContext<
  ICanvasDeletionContext | undefined
>(undefined);

export const CanvasContextDeletionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userid, canvaid } = useParams();

  const router = useNavigate();
  const [canvasDeletionState, setCanvasDeletionState] =
    useState<TypeCanvasDeletionOpsContext>(false);

  const [canvasName, setCanvasName] = useState<string>("");
  const canvasDeletionToggle = async () => {
    setCanvasDeletionState((prev: any) => (prev === false ? true : false));
  };
  const hitClickDelete = async () => {
    const response = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
      {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "Canvaspace" }),
      },
    );
    if (response.ok) {
      setCanvasName("");
      canvasDeletionToggle();
      canvaNotification_Delete();
      toast.success("A Canvaspace has been deleted!");
      router(`/account/${userid!}/canvas-management`);
    } else {
      const res = await response.json();
      toast.error(`Canvaspace failed to delete: ${res.message}`);
    }
  };
  return (
    <CanvasContextDeletionType.Provider
      value={{
        canvasDeletionState,
        canvasDeletionToggle,
        hitClickDelete,
        canvasName,
        setCanvasName,
      }}
    >
      {children}
    </CanvasContextDeletionType.Provider>
  );
};

export const useCanvasDeletionContext = () => {
  const context = useContext(CanvasContextDeletionType);
  if (!context) {
    throw new Error(
      "useCanvasDeletionContext must be used within a CanvasContextDeletionProvider",
    );
  }
  return context;
};
