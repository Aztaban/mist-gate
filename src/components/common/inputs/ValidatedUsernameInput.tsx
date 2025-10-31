import { useState } from 'react';
import { USER_REGEX } from '@config';

interface Props {
  value: string;
  onChange: (value: string) => void;
  showInvalid?: boolean;
}

const ValidatedUsernameInput: React.FC<Props> = ({ value, onChange, showInvalid = false }) => {
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(false);
  const valid = USER_REGEX.test(value);
  const isInvalid = !valid && (showInvalid || (touched && !focus && value.length > 0));

  return (
    <div className="form__field">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
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
        aria-describedby="uidnote"
      />
      <p id="uidnote" className={isInvalid ? 'instructions red' : 'offscreen'}>
        4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
      </p>
    </div>
  );
};

export default ValidatedUsernameInput;
