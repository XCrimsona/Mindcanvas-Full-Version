import Footer from "../../src/components/Footer";
import { DivClass } from "../../src/ui/Div";
import ShortText from "../../src/ui/ShortText";
import "../../../../../src/style-files/auth-footer.css";
const AuthFooter = () => {
  return (
    <Footer id="auth-footer" className={"auth-footer"}>
      <DivClass className={"creator"}>
        <ShortText className={"project-creator"}>
          Created by Christeen Fabian | The Code Hashira
        </ShortText>
      </DivClass>
    </Footer>
  );
};

export default AuthFooter;
