import { DivClass } from "../../../../../lib/ui/Div";
import Info from "./Info";
import "./info.css";

import { useEffect } from "react";
import { useInfo } from "./InfoContext";

const AccountPage = () => {
  const { accountData, fetchUserInfo } = useInfo();
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <DivClass className={"account-info"}>
      <Info params={accountData} />
    </DivClass>
  );
};

export default AccountPage;
