
import React, { useRef, useState } from 'react'
import { Link,  } from 'react-router-dom'
import axiosClient from '../api/client';
import { useStateContext } from '../context/Context'


function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();

  const {setToken, setUser} = useStateContext();

  const [errors, setErrors] = useState(null)



  const register = (e)=>{
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      password_confirmation: passConfirmRef.current.value
    }

    axiosClient.post('/signup',payload).then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      
      
        const response = err.response;

        if(response && response.status == 422) {
          setErrors(response.data.errors)
        }
    })
  }
  
  return (
    
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form action="" onSubmit={register}>
          <h1 className="title">Registati</h1>
          <input autoComplete='new-name' ref={nameRef} type="text" placeholder='Nome'/>
          <input autoComplete='new-email' ref={emailRef} type="email" placeholder='Email'/>
          <input autoComplete='new-password' ref={passRef} type="password" placeholder='password' />
          <input autoComplete= 'new-password'ref={passConfirmRef} type="password" placeholder='Conferma Password' />

          <button type='submit' className='btn btn-block'>Registrati</button>
          <p className=' message'>Sei gia' registrato ?
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
            <Link to='/login'> Accedi </Link>
          </p>
        </form>
      </div>

    </div>



  )
}

export default Signup