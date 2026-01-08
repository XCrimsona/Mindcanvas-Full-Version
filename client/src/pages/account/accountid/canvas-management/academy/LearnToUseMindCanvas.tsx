import step from "./steps.json";
import RouteLink from "../../../../../components/ProductSection/RouteLink";
import { useParams } from "react-router-dom";
import Header from "../../../../../components/Header";
import { DivClass } from "../../../../../ui/Div";
import SVG from "../../../../../SVG";
import Question from "./ui-components/Question";
import Answer from "./ui-components/Answer";
import Div from "./ui-components/Div";
const Steps = (stepData: any) => {
  // const {id,imgRoute,src,alt,description}=stepData;
  return (
    <div
      key={stepData.id}
      className="block mr-auto ml-auto bg-[#3338] h-auto w-auto m-2"
    >
      <span className="text-white">Step: {stepData.id}</span>
      <img
        style={{ objectFit: "contain" }}
        // width={400}
        // height={80}
        src={stepData.src}
        alt={stepData.alt}
      />
      <p className="text-white">{stepData.description}</p>
    </div>
  );
};
const LearnToUseMindCanvas = () => {
  const { userid, canvaid } = useParams();

  return (
    <>
      <Header id="auth-canva-header" className={"auth-canva-header"}>
        <DivClass className={"auth-canva-route"}>
          <RouteLink
            href={`http://localhost:5176/account/${userid}/canvas-management/${canvaid}`}
            className={"auth-go-back-route"}
          >
            <i className={"auth-route-icon"}>
              <SVG
                src={"/backwards-solid.svg"}
                className={"canva-management-backward-arrow-nav-icon"}
                alt="backward-icon"
              />
            </i>
            Canvaspace
          </RouteLink>
        </DivClass>
      </Header>
      <div className="ml-auto mr-auto flex flex-wrap justify-start relative md:ml-auto xl:ml-10 mt-10 md:gap-10">
        <div className="w-70   sm:185 md:w-100 ml-auto  mr-auto">
          <div className="flex flex-wrap ml-auto mr-auto gap-10 w-75 md:w-140 lg:w-100">
            <Div>
              <Question>What are Data Fragments?</Question>
              <Answer>
                They are tiny UI layouts, designed for dragging around inside a
                canvas(Canvaspace).
              </Answer>
            </Div>
            <Div>
              <Question>Why are there so many Data Fragments?</Question>
              <Answer>
                Each one is designed for different user preferences such as
                reading A4 like pages, scrolling down a list, studying a chart,
                comparing information while you work.
              </Answer>
            </Div>
          </div>
        </div>
        <div className="flex flex-wrap justify-start ml-auto mr-auto md:mr-10 items-start md:grid md:grid-cols-3 md:justify-center md:items-start md:h-[84vh] md:overflow-y-auto md:gap-2 md:w-200 lg:-300">
          {step.map(Steps)}
        </div>
      </div>
    </>
  );
};

export default LearnToUseMindCanvas;
