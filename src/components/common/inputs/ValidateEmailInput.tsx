import { useState } from 'react';
import { EMAIL_REGEX } from '@config';

interface Props {
  value: string;
  onChange: (value: string) => void;
  showInvalid?: boolean;
}

const ValidatedEmailInput: React.FC<Props> = ({ value, onChange, showInvalid = false }) => {
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(false);
  const valid = EMAIL_REGEX.test(value);
  const isInvalid = !valid && (showInvalid || (touched && !focus && value.length > 0));

  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          setTouched(true);
        }}
        className={isInvalid ? 'is-invalid' : undefined}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-describedby="emailnote"
      />
      <p id="emailnote" className={isInvalid ? 'instructions red' : 'offscreen'}>
        Must be a valid email format (e.g., user@example.com).
      </p>
    </>
  );
};

export default ValidatedEmailInput;
