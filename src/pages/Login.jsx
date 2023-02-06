import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import InputField from '../common_components/InputField'
import loginStyle from '../assests/styles/auth.module.scss'

const initinalState = {
  email: "",
  password: "",
}

function Login() {
  const [user, setUser] = useState(initinalState)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const userLoginHandleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  };

  /**
   * Handle catch cases
   * if user have valid email and password then navigate to home page
   * otherwise show error message
   */
  const userLoginHandleSubmit = () => {
    const { email, password } = user;
    if (!email || !password) {
      setErrorMsg('fill all fields')
      return
    }
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      const { accessToken, email } = res?.user;
      const auth = { accessToken, email };
      localStorage.setItem('auth', JSON.stringify(auth))
      navigate('/')
    }).catch((err) => {
      setErrorMsg(err?.message)
      setUser(initinalState)

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
    <div className={loginStyle['auth-container']}>
      <h1 className={loginStyle['auth-container-item1']}>Login</h1>
      <InputField
        placeholder="Please enter email :"
        name='email'
        value={user?.email}
        onChange={userLoginHandleChange}
        label="email"
        type='email'
      />
      <InputField
        placeholder="Please enter password :"
        name='password'
        value={user?.description}
        onChange={userLoginHandleChange}
        label="password"
        type="password"
      />
      {errorMsg && <p className={loginStyle['error']}>{errorMsg}</p>}
      <button className={loginStyle['auth-container-item2']} onClick={userLoginHandleSubmit}>Login</button>
      <p className={loginStyle['auth-container-item3']}>Register your account ? <Link to="/signup">Signup</Link></p>
    </div>
  )
}

export default Login