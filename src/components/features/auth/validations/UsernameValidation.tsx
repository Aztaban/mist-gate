import { useState } from "react";
import { USER_REGEX } from "@config";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const UsernameValidation: React.FC<Props> = ({ value, onChange }) => {
  const [userFocus, setUserFocus] = useState(false);
  const validUsername = USER_REGEX.test(value);

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={validUsername ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
      />
      <p id="uidnote" className={userFocus && value && !validUsername ? "instructions" : "offscreen"}>
        4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
      </p>
    </>
  );
};

export default UsernameValidation;
