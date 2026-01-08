import { response } from "express";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// 1. Create context

interface IInfoContextProps {
  accountData: {};
  fetchUserInfo: () => void;
  requestAccountDeletion: () => void;
}
const InfoContext = createContext<IInfoContextProps | null>(null);

// 2. Provider component
export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [accountData, setAccountData] = useState<{}>({});
  const { userid } = useParams();

  if (!userid) return;
  const fetchUserInfo = async () => {
    const response: any = await fetch(
      `http://localhost:5000/api/account/${userid}/account-info`,
      {
        method: "GET",
        credentials: "include",
        headers: { "x-active-user": userid },
      }
    );
    if (response.ok) {
      const resData: any = await response.json();
      setAccountData(resData);
    } else {
      toast.info("Failed to retrieve, try again in 3 minutes");
    }
  };

  const router = useNavigate();
  const requestAccountDeletion = async () => {
    const response: any = await fetch(
      `http://localhost:5000/api/account/${userid}/account-info`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "x-active-user": userid,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const response2 = await response.json();
      //   toast.success(`${response2.message}`);
      console.log(response2);

      if (response2.code === "SINGLE_USER_DATA_DELETED") {
        router("/");
      }
    } else {
      toast.info("Failed to delete Account, try again in 10 minutes");
    }
  };
  return (
    <InfoContext.Provider
      value={{
        accountData,
        fetchUserInfo,
        requestAccountDeletion,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

// 3. Custom hook (optional but recommended)
export const useInfo = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfo must be used within InfoProvider ");
  }
  return context;
};
