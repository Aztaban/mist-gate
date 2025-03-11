import { useState, useEffect } from "react";
import { PWD_REGEX } from "../../config";

export const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);

    if (!PWD_REGEX.test(password)) {
      setErrorMessage(
        "Password must be 8-24 characters, include uppercase, lowercase, number & special character (!@#$%)."
      );
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword]);

  return {
    password, setPassword,
    confirmPassword, setConfirmPassword,
    validPassword, validMatch,
    errorMessage
  };
};
