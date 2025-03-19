import { useState } from "react";
import { EMAIL_REGEX } from "@config";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const EmailValidation: React.FC<Props> = ({ value, onChange }) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const validEmail = EMAIL_REGEX.test(value);

  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="emailnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
      />
      <p id="emailnote" className={emailFocus && value && !validEmail ? "instructions" : "offscreen"}>
        Must be a valid email format (e.g., user@example.com).
      </p>
    </>
  );
};

export default EmailValidation;
