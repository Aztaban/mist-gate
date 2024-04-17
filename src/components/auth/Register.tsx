import { useRef, useState, useEffect, FormEvent, ReactElement } from 'react';
import { useRegisterMutation } from '../../features/auth/authApiSlice';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = (): ReactElement => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const [registerMutation] = useRegisterMutation();

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      await registerMutation({ user, pwd });
      setSuccess(true);
    } catch (err: any) {
      if (err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      if (errRef.current) errRef.current.focus();
    }
  };

  const content = (
    <>
      {success ? (
        <section>
          <h2>Account has been created!</h2>
          <p>
            <a href="/login">Sign in</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className='login-form' >
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? 'valid' : 'hide'}></span>
              <span className={validPwd || !pwd ? 'hide' : 'invalid'}></span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              8 to 24 characters.
              <br />
              Must begin with a letter. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters:
              <span aria-label="exclamation mark"> ! </span>
              <span aria-label="at symbol">@ </span>
              <span aria-label="hashtag"># </span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">% </span>
            </p>

            <label htmlFor="confirmPwd">Confirm Password:</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              Must match the first input field.
            </p>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign In
            </button>
          </form>
        </section>
      )}
    </>
  );

  return content;
};

export default Register;
