import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import InputField from '../common_components/InputField'
import { auth } from '../firebase'
import singupStyle from '../assests/styles/auth.module.scss'

const initinalState = {
  name: "",
  email: "",
  password: "",
}


function Singup() {
  const [user, setUser] = useState(initinalState)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const userSingupHandleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  };


  /**
   * Handle catch cases
   * if user have valid all input field then navigate to login page
   * otherwise show error message
   */
  const userSingupHandleSubmit = () => {
    const { name, email, password } = user;
    console.log('user', user)
    if (!name || !email || !password) {
      setErrorMsg('fill all fields')
      return
    }
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      console.log('res', res)
      navigate('/login')
    }).catch((err) => {
      setErrorMsg(err?.message)
      console.error('err', err?.message)
    })
    setUser(initinalState)
  }


  /**If user login than navigate to home page */
  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      navigate('/')
    }
  }, [navigate]);

  return (
    <div className={singupStyle['auth-container']}>
      <h1 className={singupStyle['auth-container-item1']}>Sing up</h1>

      <InputField
        placeholder="Please enter name :"
        name='name'
        type='text'
        value={user?.name}
        onChange={userSingupHandleChange}
      />
      <InputField
        placeholder="Please enter email :"
        name='email'
        type='email'
        value={user?.email}
        onChange={userSingupHandleChange}
      />
      <InputField
        placeholder="Please enter password :"
        name='password'
        type="password"
        value={user?.password}
        onChange={userSingupHandleChange}
      />
      {errorMsg && <p className={singupStyle['error']}>{errorMsg}</p>}
      <button className={singupStyle['auth-container-item2']} onClick={userSingupHandleSubmit}>Singup</button>
      <p className={singupStyle['auth-container-item3']}>Already have an account ? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Singup