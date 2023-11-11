import { useEffect, useState } from 'react';
import './App.css';
import Register from './components/Register.jsx';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/index.js';
import Login from './components/Login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  //   <!-- User Logout Handler -->
  const handleUserLogout = async () => {
    await signOut(auth);
    setIsLoggedIn('');
  };

  useEffect(() => {
    const authStateChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
        console.log(user);
      } else {
        console.log('No user found');
      }
    });

    return () => authStateChange();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className='d-flex gap-5'>
          <img
            src={isLoggedIn?.photoURL}
            alt=''
          />
          <h1>{isLoggedIn?.displayName}</h1>

          <p>{isLoggedIn?.email}</p>
          <button
            onClick={handleUserLogout}
            className='my-2'>
            Logout
          </button>
        </div>
      ) : (
        <>
          <Login setIsLoggedIn={setIsLoggedIn} />
          <Register
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </>
      )}
    </>
  );
}

export default App;
