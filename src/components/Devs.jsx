import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/index.js';
import { createData, deleteData, getAllDataRealTime, getSingleData, updateData } from '../firebase/database.js';
import { useEffect, useState } from 'react';

const Devs = () => {
  const [input, setInput] = useState({ id: '', name: '', age: '', photo: '', skill: '', status: true, trash: false });
  const [devs, setDevs] = useState([]);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState([]);

  // <!-- Input Change Handler -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- Form Submit Handler -->
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const fileData = await uploadBytesResumable(ref(storage, file?.name), file);

    const link = await getDownloadURL(fileData.ref);
    await createData('devs', { ...input, photo: link });
  };

  // <!-- Edit button handler -->
  const handleEditButton = (id) => {
    const findUser = devs?.find((item) => item.id == id);
    setInput({ ...input, id: id, name: findUser.name, age: findUser.age, skill: findUser.skill });
    setModal(true);
  };

  // <!-- Edit Form Handler -->
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    await updateData('devs', input.id, { ...input });
    setModal(false);
  };

  useEffect(() => {
    getAllDataRealTime('devs', setDevs);
  }, []);

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {modal && (
        <div className='modal-main'>
          <div className='modal-body'>
            <button
              onClick={() => {
                setModal(!modal);
                setInput({ id: '', name: '', age: '', skill: '', status: true, trash: false });
              }}>
              X
            </button>
            <form
              action=''
              onSubmit={handleEditFormSubmit}>
              <input
                name='name'
                value={input.name}
                onChange={handleInputChange}
                type='text'
                placeholder='name'
              />
              <input
                name='age'
                value={input.age}
                onChange={handleInputChange}
                type='text'
                placeholder='age'
              />
              <input
                name='skill'
                value={input.skill}
                onChange={handleInputChange}
                type='text'
                placeholder='skill'
              />
              <button type='submit'>Update</button>
            </form>
          </div>
        </div>
      )}

      <div className='container '>
        <div className='row mb-5'>
          <div className='col-md-10'>
            <form
              action=''
              onSubmit={handleFormSubmit}>
              <input
                name='name'
                value={input.name}
                onChange={handleInputChange}
                type='text'
                placeholder='name'
              />
              <input
                name='age'
                value={input.age}
                onChange={handleInputChange}
                type='text'
                placeholder='age'
              />
              <input
                name='skill'
                value={input.skill}
                onChange={handleInputChange}
                type='text'
                placeholder='skill'
              />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
              />
              <button type='submit'>Add</button>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-10'>
            <div className='card'>
              <div className='card-body'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Skill</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devs?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.age}</td>
                          <td>{item?.skill}</td>
                          <td>
                            <img
                              src={item.photo}
                              style={{ width: '50px', height: '50px' }}
                              alt=''
                            />
                          </td>
                          <td>
                            <button onClick={() => getSingleData('devs', item.id)}>view</button>
                            <button onClick={() => handleEditButton(item.id)}>edit</button>

                            <button onClick={() => deleteData('devs', item.id)}> delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
