import { DivClass } from "../../../src/ui/Div";
import HeadingOne from "../../../src/ui/HeadingOne";
import "../../../src/components/Header";
import ShortText from "../../../src/ui/ShortText";
import "./home.css";
import "./tailwind-style.css";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Link from "../../ui/Link";

// Home Page Dashboard
const Home = () => {
  useEffect(() => {
    document.title = "Home Page | MindCanvas Demo Version";
  }, []);

  return (
    <DivClass className="page">
      <div className="flex flex-wrap ml-auto mr-auto w-[300px] pt-[80px] sm:w-[412px] md:w-[590px] lg:w-[990px] xl:w-[1200px] xl2:w-[1200px]">
        <div className="relative mr-auto ml-auto sm:ml-auto md:ml-auto lg:ml-0 xl:ml-0 xl2:ml-0 w-[280px] sm:w-[350px] md:w-[565px] lg:w-[358px] xl:w-[358px] xl2:w-[358px]">
          <HeadingOne
            id="heading-one"
            className="heading-one text-center pt-1 pb-1 ml-auto mr-auto sm:text-center md:text-center lg:text-left xl:text-left xl2:text-left"
          >
            MindCanvas
          </HeadingOne>
          <div className="lg:absolute lg:bottom-0">
            {/* <div className="bg-white h-[200px]   "> */}
            <button className="accent-button black-cover gold-brown-border-shadow block mt-[20px] ml-auto mr-auto pt-[20px] pb-[20px] rounded-full min-w-[280px] sm:w-[350px] md:w-[565px] lg:w-[358px] xl:w-[358px] xl2:w-[358px] cursor-pointer">
              {/* A DRY component - Check ui folder for more info */}
              <Link url="/signin-portal" className="block underline">
                Log in to an account
              </Link>
            </button>
            <button className="accent-button black-cover gold-brown-border-shadow block mt-[20px] ml-auto mr-auto pt-[20px] pb-[20px] rounded-full min-w-[280px] sm:w-[350px] md:w-[565px] lg:w-[358px] xl:w-[358px] xl2:w-[358px] cursor-pointer">
              {/* A DRY component - Check ui folder for more info */}
              <Link url="/signup-portal" className="block underline">
                {/* Log in to an account */}
                Create an account
              </Link>
            </button>
            {/* </div> */}
          </div>
        </div>
        <div className="ml-auto mr-auto mt-[40px] sm:mt-[40px] sm:mr-auto md:mr-auto lg:mr-0 lg:mt-0 xl:mr-0 xl:mt-0 xl2:mr-0 xl2:mt-0 info-container w-[280px] sm:w-[350px] md:w-[565px] lg:w-[565px] xl:w-[670px] xl2:w-[670px]">
          <h2 className="box-heading text-center pt-[10px] pb-[15px]">
            Purpose
          </h2>
          {/* completely remove the left default padding and style manually */}
          <ul className="ml-10 pb-5 w-[220px] sm:w-[300px] md:w-[494px] lg:w-[510px] xl:w-[595px] xl2:w-[595px] list-disc">
            <li className="pt-[5px] pb-[5px]">
              Bring raw information, explore and organize them into valuable
              data, basic to advanced tasks, and private research.
            </li>
            <li className="pt-[5px] pb-[5px]">
              It's a full-stack productivity app with advanced abilities which
              requires user training.
            </li>
            <li className="pt-[5px] pb-[5px]">
              Visualized thought / mental modeling
            </li>
            <li className="pt-[5px] pb-[5px]">
              Designed for large screens | Small screens views coming soon
            </li>
            <li className="pt-[5px] pb-[5px]">
              See all Canva workspaces(spaces) on the canva management(post
              sign-in) page. (Note: It's NOT related to the official Canva
              platform)
            </li>
            <li className="pt-[5px] pb-[5px]">
              Engage with your data using a seamless, modern looking interface
              including unique UI fragments(layouts).
            </li>
            <li className="pt-[5px] pb-[5px]">
              Unlimited Canva-space creation.
            </li>
          </ul>
        </div>

        <div className="info-container mt-[40px] mb-[40px] pt-[10px] pb-[20px] ml-auto mr-auto sm:pt-[20px] sm:pb-[20px] md:pt-[20px] md:pb-[20px] lg:pt-[20px] xl:pt-[20px] xl:pb-[20px] xl2:pt-[20px] xl2:pb-[20px] w-[280px] sm:w-[350px] md:w-[565px] lg:w-[990px] xl:w-[1200px] xl2:w-[1200px]">
          <h2 className="box-heading text-center pt-[10px] pb-[15px] ml-auto mr-auto w-[220px] sm:w-[300px] md:w-[494px]  lg:w-[510px]  xl:w-[595px] xl2:w-[595px]">
            Why you should choose this app
          </h2>
          <ul className="ml-10 sm:pt-[10px] md:pt-[10px] lg:pt-[10px] xl:pt-[10px] xl2:pt-[10px] w-[220px] sm:w-[300px] md:w-[494px]  lg:w-[510px]  xl:w-[1100px] xl2:w-[1100px] list-decimal">
            <li className="pt-[5px] pb-[5px]">
              Designed for thinkers, researchers, developers, and introspective
              minds who need an advanced tool to explore and present data.
            </li>
            <li className="pt-[5px] pb-[5px]">
              While other apps enable fast results, AI features, and mvp
              strategic business models, MindCanvas is a multi-purpose content
              creation tool that dives deep into:
              <ul className="list-disc ml-4 pt-[10px] pb-[10px]">
                <li className="pt-[5px] pb-[5px]">
                  Data Analysis using Charts, Images, Audios, Texts, Lists,
                  Tasks for team/department collaboration and A4 pages for
                  reading
                </li>
                <li className="pt-[5px] pb-[5px]">
                  Exploration of new data, drag-to-organize features bringing
                  more sense to complex data.
                </li>
                <li className="pt-[5px] pb-[5px]">
                  Data exports via pdf or Images (only works when authorized)
                </li>
                <li className="pt-[5px] pb-[5px]">
                  Note: The demo only supports the creation of text layouts. The
                  full version will have all listed capabilties. AI is not
                  integrated into Mindcanvas.
                </li>
                <li className="pt-[5px] pb-[5px]">
                  Full version under construction!
                </li>
              </ul>
            </li>
            <li className="pt-[5px] pb-[5px]">
              You have full control over your data.
            </li>
            <li className="pt-[5px] pb-[5px]">
              Privacy first - zero third party sign-ins including Meta, Apple,
              Google or Microsoft.
            </li>
          </ul>
        </div>
        <div className="info-container mt-[0px] mb-[60px] pt-[10px] pb-[20px] ml-auto mr-auto sm:pt-[20px] sm:pb-[20px] md:pt-[20px] md:pb-[20px] lg:pt-[20px] xl:pt-[20px] xl:pb-[20px] xl2:pt-[20px] xl2:pb-[20px] w-[280px] sm:w-[350px] md:w-[565px] lg:w-[990px] xl:w-[1200px] xl2:w-[1200px]">
          <ul className="ml-10 sm:pt-[10px] md:pt-[10px] lg:pt-[10px] xl:pt-[10px] xl2:pt-[10px] w-[220px] sm:w-[300px] md:w-[494px]  lg:w-[510px]  xl:w-[1100px] xl2:w-[1100px]">
            <li className="pt-[5px] pb-[5px]">
              You can find me on Github: XCrimsona to discover other official
              platforms listed there to reach me.
            </li>
          </ul>
          <h3 className="box-heading text-center pt-[25px] pb-[10px] ml-auto mr-auto w-[220px] sm:w-[300px] md:w-[494px]  lg:w-[510px]  xl:w-[595px] xl2:w-[595px]">
            What to avoid
          </h3>
          <ul className="ml-10 sm:pt-[10px] md:pt-[10px] lg:pt-[10px] xl:pt-[10px] xl2:pt-[10px] w-[220px] sm:w-[300px] md:w-[494px]  lg:w-[510px]  xl:w-[1100px] xl2:w-[1100px] list-decimal">
            <li className="pt-[5px] pb-[5px]">
              The demo is to showcase expertise.
            </li>
            <li className="pt-[5px] pb-[5px]">
              Do NOT store sensitive information in your account for it does NOT
              encrypt data and others can read your data should credentials be
              exposed. (Search online if this sounds unfamiliar to you)
            </li>
            <li className="pt-[5px] pb-[5px]">
              Do NOT share your log credentials.
            </li>
            <li className="pt-[5px] pb-[5px]">
              If the created data is important to you, consider going to the
              full version.
            </li>
          </ul>
        </div>
      </div>

      <Footer
        id="home-footer"
        className={"absolute text-center pt-2 pb-2 bottom-0 w-full black-cover"}
      >
        <DivClass className={"project-creator"}>
          <ShortText className={"creator"}>Maintained by XCrimsona</ShortText>
        </DivClass>
      </Footer>
    </DivClass>
  );
};

export default Home;
