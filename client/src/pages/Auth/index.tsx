import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Alerts, ButtonBlock, StyledButton, StyledForm, StyledInput, StyledLink, StyledMain } from "./styled";
import { forgotPasswordPath, loginPath, registrationPath } from "../../routes";

import useSubmit from "./useSubmit";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const isLoginPage = useLocation().pathname === "/login";
  const isForgotPassPage = useLocation().pathname === "/forgot";

  const { alert, isLoading, submit, success } = useSubmit(email, password, repeatPassword, isLoginPage);

  if (isForgotPassPage) {
    return (
      <StyledMain>
        <h2>We are working on this functionality</h2>
        <StyledLink to={loginPath}><h2>Go back</h2></StyledLink>
      </StyledMain>
    );
  }

  return (
    <StyledMain>
      <StyledForm onSubmit={submit}>
        {isLoading
          ? <Alerts $loading>Loading...</Alerts>
          : <Alerts $isSuccess={success}>{alert}</Alerts>}
        <StyledInput value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Email" type="email" />
        <StyledInput value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" type="password" />
        {!isLoginPage &&
          <StyledInput value={repeatPassword} onChange={(e) => setRepeatPassword(e.currentTarget.value)} placeholder="Repeat passwsord" type="password" />}
        <ButtonBlock>
          <StyledButton>{isLoginPage ? "Sing in" : "Sing up"}</StyledButton>
          {isLoginPage
            ? <StyledLink to={forgotPasswordPath}>Forgot you password?</StyledLink>
            : <StyledLink to={loginPath}>Go back</StyledLink>
          }
        </ButtonBlock>
        {isLoginPage &&
          <StyledLink $last to={registrationPath}> Don't have an account?</StyledLink>}
      </StyledForm>
    </StyledMain>
  );
};

export default Auth;