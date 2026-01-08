import { DivClass } from "../../../../ui/Div";
import Info from "./Info";
import "./info.css";

import { useEffect, useState } from "react";
import { useInfo } from "./InfoContext";

// export const metadata: Metadata = {
//   title: "Account Info",
//   description: "Read and modify you data safely",
// };

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
