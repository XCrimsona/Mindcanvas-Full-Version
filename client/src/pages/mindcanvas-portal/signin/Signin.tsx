import React, { FormEvent, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//custom built dry components
import { DivClass } from "../../../../src/ui/Div";
import Section from "../../../../src/ui/Section";
import Label from "../../../../src/components/form-elements/Label";
import HeadingOne from "../../../../src/ui/HeadingOne";
import "../mind-canvas-portal.css";
import {
  InputEmail,
  InputPassword,
  InputSubmit,
} from "../../../components/form-elements/dry-InputFormComponents";
import { LongText } from "../../../../src/ui/LongText";
import Button from "../../../../src/components/form-elements/Button";

//for navigating content
import RouteLink from "../../../components/ProductSection/RouteLink";
import { toast, ToastContainer } from "react-toastify";

interface formData {
  email: string;
  password: string;
}

const Signin = () => {
  try {
    const location = useLocation();
    const router = useNavigate();
    const [submitLock, setSubmitLock] = useState<boolean>(true);
    const [formData, setFormData] = useState<formData>({
      email: "",
      password: "",
    });
    useEffect(() => {
      if (formData.email && formData.password) {
        setSubmitLock(false);
      } else {
        setSubmitLock(true);
      }
    }, [submitLock, formData.email, formData.password]);

    const processSignIn = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        toast.info("Please wait...", { autoClose: 2500 });
        const loginData: any = {};
        if (formData.email) loginData.email = formData.email;
        if (formData.password) loginData.password = formData.password;
        if (!loginData) {
          toast.info("Complete the login fields");
          return;
        }

        if (submitLock === false) {
          //data will be sent to the backend from here
          const response = await fetch(
            "http://localhost:5000/api/signin-portal",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(loginData),
            }
          );
          //want to try a new feature: socket.io
          //for real-time notifcations to check login success or failed to verify
          if (response.ok) {
            const data: any = await response.json();
            // console.log("pulled data", data);

            //checks for saved redirects via the ProtectedRoutes React component
            const from = location.state?.from;
            if (from) {
              router(from, { replace: true });
            } else {
              router(`/account/${data.user}/canvas-management`, {
                replace: true,
              });
            }
          } else {
            const error = await response.json();
            toast.error(`Signin failed: ${error.message}`, { autoClose: 4000 });
          }
        }
      } catch (err: any) {
        console.warn("Something went wrong");
      }
    };

    const formCancelled = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormData({
        ...formData,
        email: "",
        password: "",
      });
    };

    return (
      <Section
        id="sign-in-container"
        ariaLabelledBy="sign-in"
        className="sign-in-block"
      >
        <ToastContainer position="top-right"></ToastContainer>
        <HeadingOne id="sign-in" className="heading-one">
          Sign In
        </HeadingOne>
        <form
          className="form-sign-in"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            processSignIn(e);
          }}
          autoSave="off"
          autoCorrect="off"
          autoComplete="off"
          autoFocus={false}
          autoCapitalize="off"
        >
          <DivClass className="form-data-container">
            <DivClass className="label-wrapper">
              <Label
                htmlfor="email-input"
                className="sign-in-label"
                text="Email"
              />
            </DivClass>
            <DivClass className="input-wrapper">
              <InputEmail
                id="email-input"
                placeholder="Type in your email"
                className="email-input"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </DivClass>
          </DivClass>
          <DivClass className="form-data-container">
            <DivClass className="label-wrapper">
              <Label
                htmlfor="password-input"
                className="sign-in-label"
                text="Password"
              />
            </DivClass>
            <DivClass className="input-wrapper">
              <InputPassword
                required={true}
                isdisabled={false}
                id="password-input"
                placeholder="Type in your password"
                className="password-input"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </DivClass>
          </DivClass>
          <DivClass className="submit-btn-wrapper">
            <InputSubmit
              isdisabled={submitLock}
              id="submit"
              // onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              // e.preventDefault();

              // return;
              // }}
              className="submit disabled:opacity-80"
              style={{
                cursor:
                  formData.email.length === 0 ||
                  (formData.password.length === 0 && submitLock === true)
                    ? "not-allowed"
                    : "pointer",
              }}
              value="Verify"
            />
          </DivClass>
        </form>
        <DivClass className="may-need-account">
          <LongText className="no-account">
            Don{"\u2019"}t have an account?
          </LongText>
          <LongText className="register-for-access">
            <RouteLink href="/signup-portal" className="route-link">
              Create Your Profile
            </RouteLink>
          </LongText>
        </DivClass>
        <DivClass className="cancel-btn-wrapper">
          <Button
            id="cancel-verification"
            className="cancel-verification"
            onClick={formCancelled}
          >
            <NavLink to="/">Go Back</NavLink>
          </Button>
        </DivClass>
      </Section>
    );
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
};

export default Signin;
