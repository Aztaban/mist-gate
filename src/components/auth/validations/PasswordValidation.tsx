import { useState } from "react";
import { PWD_REGEX } from "../../../config";

interface Props {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
}

const PasswordValidation: React.FC<Props> = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmChange,
}) => {
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const validPassword = PWD_REGEX.test(password);
  const validMatch = password === confirmPassword;

  return (
    <>
      {/* Password Input */}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />
      <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
        8 to 24 characters. Must include uppercase, lowercase, number, and special character (!@#$%).
      </p>

      {/* Confirm Password Input */}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onConfirmChange(e.target.value)}
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
      />
      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions red" : "offscreen"}>
        Must match the first input field.
      </p>
    </>
  );
};

export default PasswordValidation;
