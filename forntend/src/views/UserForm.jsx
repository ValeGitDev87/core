import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axiosClient from '../api/client'
import { useStateContext } from '../context/Context';

function UserForm() {

    const navigate = useNavigate();
    let {id} = useParams();
    const [user, setUser] = useState({
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
    
    const onSubmit = ev => {
        ev.preventDefault()

        if(user.id) {
            //updateUser
            axiosClient.put(`/users/${user.id}`,user)
            .then(()=>{
               
                setNotification('User modificato con successo')
                navigate('/users')
            })
            .catch(err => {
                const response = err.respons;
                if(response && response.status === 422 ) {
                    setErrors(response.errors)
                }
            })
        }
        else{
            //altrimenti crea un nuovo
            axiosClient.post(`/users/`,user)
            .then(()=>{
                
                setNotification('User creato con successo')
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422 ) {
                    setErrors(response.data.errors)
                }
            })
        }
    }

 if(id) {

    useEffect(()=>{

        setLoading(true);
        axiosClient.get(`/users/${id}`).then(({data})=> {
            setLoading(false)
            setUser(data)
           
        })
        .catch(() => {
            setLoading(false)
        })
    },[])
 }
  return (

    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}

          {errors &&
            <div className="alert">
              <p>{errors}</p>
            </div>
          }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}

export default UserForm