import { useState, useEffect } from "react";
import { USER_REGEX, EMAIL_REGEX } from "../../config";

export const useUserValidation = (initialUsername = "", initialEmail = "") => {
  const [username, setUsername] = useState(initialUsername);
  const [validUsername, setValidUsername] = useState(false);
  
  const [email, setEmail] = useState(initialEmail);
  const [validEmail, setValidEmail] = useState(false);
  
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  return {
    username, setUsername, validUsername,
    email, setEmail, validEmail,
  };
};
