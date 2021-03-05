import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormik, FormikConfig } from "formik";
import ReactDOMServer from "react-dom/server";
import { useHistory } from "react-router-dom";
import { object, string, ref } from "yup";
import { useStateContext } from "../../main/state_config/store";
import { makePostRequest } from "../../helpers/httpHelpers";
import { BASE_URL } from "../../main/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import { storeAuthToken } from "../../helpers/authHelper";

import LandingWrapper, { HeaderWrapper, SegmentWrapper } from "./style";
import { Button, ButtonProps } from "../../main/style.main";
import LogoImage from "../../assets/logo/i360-logo.svg";

const getStartedButtonProps: ButtonProps = {
  width: "164px",
  height: "55px",
  color: "white",
  background: "#25A8E0",
  border: "none",
  fontSize: "18px",
};

type ScreenActivity = "get-started" | "signin" | "signup" | "access-code";

type Inputs = {
  example: string;
  exampleRequired: string;
};

type TextField = {
  placeholder: string;
  type: string;
  name: "email" | "password" | "confirm" | "activationCode";
  ref?: any;
  value: string;
};

type ActivationField = {
  placeholder: string;
  type: string;
  name: "activationCode";

  value: string;
};

const SignUpSchema = object().shape({
  email: string().email().required("Email is required"),

  password: string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
  confirm: string().oneOf([ref("password"), null], "Passwords must match"),
});

const SignInSchema = object().shape({
  email: string().email().required("Email is required"),

  password: string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
});

const ActivationFormSchema = object().shape({
  activationCode: string().required("actiivation code is required"),
});

const LandingPage = (props: any) => {
  const history = useHistory();
  let buttonRef = useRef<any>();

  const [screenActivity, setScreenActivity] = useState<ScreenActivity>(
    "get-started"
  );
  const [error, setError] = useState<string | null>(null);
  const { state: authState, dispatch: authDispatch } = useStateContext("auth");

  const getUrl = (): string => {
    type Urls = { [key: string]: string };
    const urls: Urls = {
      "access-code": `${BASE_URL}/auth/activate`,
      signin: `${BASE_URL}/auth/login`,
      signup: `${BASE_URL}/auth/signup`,
      "get-started": "",
    };
    return urls[screenActivity];
  };

  useEffect(() => {
    setError(null);
  }, [screenActivity]);

  /**
   * display login button on
   */
  const setButtonLoading = () => {
    const buttonText = buttonRef?.current?.innerHTML;
    const loader = ReactDOMServer.renderToString(
      <CircularProgress
        style={{
          width: "20px",
          height: "20px",
          color: "white",
          marginLeft: "10px",
        }}
      />
    );

    return (isLoading: boolean) => {
      if (buttonText) {
        buttonRef.current.innerHTML = !isLoading
          ? buttonText
          : `${buttonText} ${loader}`;
      }
    };
  };

  const onSignUpFormSubmit = async (values: any) => {
    const setLoading = setButtonLoading();
    try {
      const url = getUrl();
      setLoading(true);
      const data = await makePostRequest(url, values);
      setLoading(false);
      if (data.success) {
        authDispatch({ type: "SIGN_UP", payload: data.data.user });
        setScreenActivity("access-code");
      } else {
        setError(data.data.error);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onActivationFormSubmit = async (values: any) => {
    const setLoading = setButtonLoading();
    try {
      if (!authState.user) return;
      const { id } = authState.user;
      let url = getUrl();
      url = `${url}/${id}`;
      console.log(url);
      setLoading(true);
      const { data } = await makePostRequest(url, values);
      setLoading(false);
      if (data.success) {
        authDispatch({ type: "SIGN_IN", payload: data.user });
        setScreenActivity("access-code");
      } else {
        setError(data.data.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const attemptLogin = async (values: any) => {
    const setLoading = setButtonLoading();
    try {
      const url = getUrl();
      setLoading(true);
      const { data, success } = await makePostRequest(url, values);
      setLoading(false);
      if (success) {
        authDispatch({ type: "SIGN_IN", payload: data.user });
        storeAuthToken(data.token);
        history.push("/organisations");
      } else {
        setError(data.data.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
      activationCode: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: onSignUpFormSubmit,
  });

  const activationFormik = useFormik({
    initialValues: {
      activationCode: "",
    },
    validationSchema: ActivationFormSchema,
    onSubmit: onActivationFormSubmit,
  });

  const loginFormik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: SignInSchema,
    onSubmit: attemptLogin,
  });

  const displaySignUpField = () => {
    const textFields: TextField[] = [
      {
        placeholder: "enter email address",
        type: "text",
        name: "email",
        value: formik.values.email,
      },
      {
        placeholder: "enter password",
        type: "password",
        name: "password",
        value: formik.values.password,
      },
      {
        placeholder: "confirm password",
        type: "password",
        value: formik.values.confirm,
        name: "confirm",
      },
    ];

    return (
      <SegmentWrapper>
        <header>
          <div className="main_text">Create an Account</div>
          {!error ? (
            <div className="supporting_text">
              Enter the following details to continue
            </div>
          ) : (
            <div className="supporting_text error">{error}</div>
          )}
        </header>
        <form className="center" onSubmit={formik.handleSubmit}>
          {textFields.map((field: TextField) => (
            <input
              style={{
                marginRight: "10px",
                borderColor: formik.errors[field.name] ? "red" : "",
              }}
              className="input_root"
              {...field}
              onChange={formik.handleChange}
            />
          ))}

          <Button ref={buttonRef} {...getStartedButtonProps}>
            Sign Up
          </Button>
        </form>
      </SegmentWrapper>
    );
  };

  const displaySignInField = () => {
    const textFields: TextField[] = [
      {
        placeholder: "enter email address",
        type: "text",
        name: "email",
        value: loginFormik.values.email,
      },
      {
        placeholder: "enter password",
        type: "password",
        name: "password",
        value: loginFormik.values.email,
      },
    ];
    return (
      <SegmentWrapper>
        <header>
          <div className="main_text">Login to your Account</div>
          {!error ? (
            <div className="supporting_text">
              Enter the following details to continue
            </div>
          ) : (
            <div className="supporting_text error">{error}</div>
          )}
        </header>
        <form className="center" onSubmit={loginFormik.handleSubmit}>
          {" "}
          {textFields.map((field) => (
            <input
              style={{ marginRight: "10px" }}
              className="input_root"
              {...field}
              onChange={loginFormik.handleChange}
            />
          ))}
          <Button ref={buttonRef} {...getStartedButtonProps}>
            Sign In
          </Button>
        </form>
      </SegmentWrapper>
    );
  };

  const displayVerification = () => {
    const textFields: ActivationField[] = [
      {
        placeholder: "Activation Code",
        type: "text",
        name: "activationCode",
        value: activationFormik.values.activationCode,
      },
    ];
    return (
      <SegmentWrapper>
        <header>
          <div className="main_text">Activate your Account</div>
          {!error ? (
            <div className="supporting_text">
              Enter the following details to continue
            </div>
          ) : (
            <div className="supporting_text error">{error}</div>
          )}
        </header>
        <form className="center" onSubmit={activationFormik.handleSubmit}>
          {textFields.map((field) => (
            <input
              style={{
                marginRight: "10px",
                borderColor: activationFormik.errors.activationCode
                  ? "red"
                  : "",
              }}
              className="input_root"
              {...field}
              onChange={activationFormik.handleChange}
            />
          ))}
          <div className="lower_label">
            <span className="lower_label_text">
              Didn't recieve the activation code?
            </span>
            <span className="lower_label_text action">Resend it</span>
          </div>

          <Button ref={buttonRef} {...getStartedButtonProps}>
            Submit
          </Button>
        </form>
      </SegmentWrapper>
    );
  };

  const renderLandingPageContent = (): { nav: Array<any>; main: any } => {
    let navButtonProps = {
      ...getStartedButtonProps,
      fontSize: "14px",
      width: "70px",
      height: "30px",
      margin: "0px 0px 0px 10px",
    };

    switch (screenActivity) {
      case "get-started":
        navButtonProps.border = "1px solid #25A8E0";
        navButtonProps.background = "white";
        navButtonProps.color = "#25A8E0";
        return {
          nav: [
            <Button
              {...navButtonProps}
              onClick={() => setScreenActivity("signin")}
            >
              Sign In
            </Button>,
          ],
          main: renderWelcomeContent(),
        };
      case "access-code":
        navButtonProps.border = "1px solid #25A8E0";
        navButtonProps.background = "white";
        navButtonProps.color = "#25A8E0";
        return {
          nav: [],
          main: displayVerification(),
        };
      case "signup":
        navButtonProps.border = "1px solid #25A8E0";
        navButtonProps.background = "white";
        navButtonProps.color = "#25A8E0";
        return {
          nav: [
            <span className="small_text">Already have an account?</span>,
            <Button
              {...navButtonProps}
              onClick={() => setScreenActivity("signin")}
            >
              Sign In
            </Button>,
          ],
          main: displaySignUpField(),
        };
      case "signin":
        navButtonProps.border = "1px solid #25A8E0";
        navButtonProps.background = "transparent";
        navButtonProps.color = "#25A8E0";
        return {
          nav: [
            <Button
              {...navButtonProps}
              onClick={() => setScreenActivity("signup")}
            >
              Sign Up
            </Button>,
          ],
          main: displaySignInField(),
        };
      default:
        return { nav: [null], main: renderWelcomeContent() };
    }
  };

  const renderWelcomeContent = () => (
    <SegmentWrapper>
      <div className="main_text">
        Work <span>Together</span>
      </div>
      <h3>
        With i360, team members can work together more effectively, communicate
        through channels and direct messages, and also attend to customer
        support issues - all within a secure, enterprise-grade environment.
      </h3>
      <Button
        {...getStartedButtonProps}
        onClick={() => setScreenActivity("signup")}
      >
        Get Started
      </Button>
    </SegmentWrapper>
  );
  const { nav, main } = renderLandingPageContent();
  return (
    <LandingWrapper>
      <HeaderWrapper>
        <img className="logo" src={LogoImage} alt="logo" />
        <nav>{nav}</nav>
      </HeaderWrapper>
      {main}
      <div className="smiley_image_background"></div>
    </LandingWrapper>
  );
};
export default LandingPage;
