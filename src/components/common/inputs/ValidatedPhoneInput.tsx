import { useState } from "react";
import { PHONE_REGEX } from "@config";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ValidatedPhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const [phoneFocus, setPhoneFocus] = useState(false);
  const validPhone = PHONE_REGEX.test(value);

  return (
    <>
      <label htmlFor="phoneNumber">Phone Number (Optional):</label>
      <input
        type="text"
        id="phoneNumber"
        autoComplete="on"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={validPhone ? "false" : "true"}
        aria-describedby="phonenote"
        onFocus={() => setPhoneFocus(true)}
        onBlur={() => setPhoneFocus(false)}
      />
      <p
        id="phonenote"
        className={phoneFocus && value && !validPhone ? "instructions" : "offscreen"}
      >
        Must be a valid phone number format.
      </p>
    </>
  );
};

export default ValidatedPhoneInput;