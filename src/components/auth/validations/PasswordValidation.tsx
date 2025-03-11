import { useEffect } from "react";
import { usePasswordValidation } from "../../../hooks/validation/usePasswordValidation";

interface Props {
  onPasswordChange: (value: string) => void;
}

const PasswordValidation: React.FC<Props> = ({
  onPasswordChange,
}) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validPassword,
    validMatch,
    errorMessage,
  } = usePasswordValidation();

  // Pass the password to the parent only if it is valid and matches confirmation
  useEffect(() => {
    onPasswordChange(validPassword && validMatch ? password : "");
  }, [password, confirmPassword, validPassword, validMatch, onPasswordChange]);

  return (
    <>
      {/* Password Input */}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="pwdnote"
        autoComplete="new-password"
      />
      <p id="pwdnote" className={password && !validPassword ? "instructions" : "offscreen"}>
        {errorMessage}
      </p>

      {/* Confirm Password Input */}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        aria-invalid={validMatch ? "false" : "true"}
        autoComplete="new-password"
        aria-describedby="confirmnote"
      />
      <p id="confirmnote" className={confirmPassword && !validMatch ? "instructions red" : "offscreen"}>
        Must match the first input field.
      </p>
    </>
  );
};

export default PasswordValidation;
