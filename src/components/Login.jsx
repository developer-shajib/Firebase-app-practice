import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, facebookProvider, googleProvider } from '../firebase/index.js';

const Login = ({ setIsLoggedIn }) => {
  const [input, setInput] = useState({ email: '', password: '' });

  // <!-- Input Change Handler -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //   <!-- Login Form Submit -->
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = await signInWithEmailAndPassword(auth, input.email, input.password);
    setIsLoggedIn(data.user);
  };

  // <!-- Google Login Handler -->
  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const handleFacebookLogin = async () => {
    await signInWithPopup(auth, facebookProvider);
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        action=''
        onSubmit={handleFormSubmit}>
        <input
          name='email'
          value={input.email}
          onChange={handleInputChange}
          type='text'
          placeholder='Email'
        />
        <input
          name='password'
          value={input.password}
          onChange={handleInputChange}
          type='password'
          placeholder='Password'
        />
        <button type='submit'>Login</button>
      </form>

      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleFacebookLogin}>Facebook</button>
    </div>
  );
};

export default Login;
