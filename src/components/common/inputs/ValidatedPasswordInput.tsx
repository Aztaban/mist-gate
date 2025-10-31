import { useEffect, useState } from 'react';
import { usePasswordValidation } from '@hooks/validation/usePasswordValidation';

interface Props {
  onPasswordChange: (value: string) => void;
  showInvalid?: boolean;
}

const ValidatedPasswordInput: React.FC<Props> = ({ onPasswordChange, showInvalid = false }) => {
  const { password, setPassword, confirmPassword, setConfirmPassword, validPassword, validMatch, errorMessage } =
    usePasswordValidation();

  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdTouched, setPwdTouched] = useState(false);
  const [cFocus, setCFocus] = useState(false);
  const [cTouched, setCTouched] = useState(false);

  const pwdInvalid = !validPassword && (showInvalid || (pwdTouched && !pwdFocus && password.length > 0));
  const cInvalid = !validMatch && (showInvalid || (cTouched && !cFocus && confirmPassword.length > 0));

  useEffect(() => {
    onPasswordChange(validPassword && validMatch ? password : '');
  }, [password, confirmPassword, validPassword, validMatch, onPasswordChange]);

  return (
    <>
      <div className="form__field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => {
            setPwdFocus(false);
            setPwdTouched(true);
          }}
          className={pwdInvalid ? 'is-invalid' : undefined}
          aria-invalid={pwdInvalid ? 'true' : 'false'}
          aria-describedby="pwdnote"
          autoComplete="new-password"
        />
        <p id="pwdnote" className={pwdInvalid ? 'instructions red' : 'offscreen'}>
          {errorMessage}
        </p>
      </div>
      <div className="form__field">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setCFocus(true)}
          onBlur={() => {
            setCFocus(false);
            setCTouched(true);
          }}
          className={cInvalid ? 'is-invalid' : undefined}
          aria-invalid={cInvalid ? 'true' : 'false'}
          aria-describedby="confirmnote"
          autoComplete="new-password"
        />
        <p id="confirmnote" className={cInvalid ? 'instructions red' : 'offscreen'}>
          Must match the first input field.
        </p>
      </div>
    </>
  );
};

export default ValidatedPasswordInput;
