import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { auth, storage } from '../firebase/index.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({ id: '', name: '', email: '', password: '', photo: '', status: true, trash: false, createdAt: serverTimestamp() });
  const [file, setFile] = useState('');

  // <!-- Input Change Handler -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //   <!-- Register Form Submit handler -->
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = await createUserWithEmailAndPassword(auth, input.email, input.password);

    const fileData = await uploadBytesResumable(ref(storage, file.name), file);

    const link = await getDownloadURL(fileData.ref);

    if (link) await updateProfile(data.user, { displayName: input.name, photoURL: link });
  };

  return (
    <>
      <div>
        <h1>Register</h1>
        <form
          action=''
          onSubmit={handleFormSubmit}>
          <input
            name='name'
            value={input.name}
            onChange={handleInputChange}
            type='text'
            placeholder='Name'
          />
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
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            placeholder='Photo'
          />
          <button type='submit'>Create</button>
        </form>
      </div>
    </>
  );
};

export default Register;
