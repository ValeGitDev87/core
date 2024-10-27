import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../api/client'
import { useStateContext } from '../context/Context';



function Users() {

  const [users , setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Imposta il numero di elementi per pagina qui
  const [totalPages, setTotalPages] = useState(1); // Aggiungi lo stato per il numero totale di pagine
  const {setNotification} = useStateContext()

  useEffect( () =>{
    getUser()
  }, [currentPage,perPage])



  const onDelete = (user) =>{
    if (!window.confirm('sei sicuro di voler cancellare l\'utente?')) {
      return
    }

    axiosClient.delete(`/users/${user.id}`)
    .then( () => {
      setNotification('Utente cancellato correttamente')
      getUser()
    })

  }

    // Array di opzioni per il numero di elementi per pagina
  const perPageOptions = [5, 10, 20, 30, 40];

  // Funzione per cambiare la pagina
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Funzione per cambiare il numero di elementi per pagina
  const changePerPage = (perPage) => {
    setPerPage(perPage);
  };


  const getUser = () => {
    
     setLoading(true);
     axiosClient.get(`/users?page=${currentPage}&per_page=${perPage}`).then(({data}) => {
      setLoading(false)
      setUsers(data.data)
      setTotalPages(data.last_page)
      
    })
    .catch(()=> {
      setLoading(false)
    })

  }
 
  return (
    <div> 
      <div className='users'>
        <h1>Users</h1>
        <Link className='btn-add' to="/users/new">Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>email</th>
              <th>Creato il </th>
              <th>Option</th>
             

            </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
          <tbody>
            
            {users.map(user => (
              <tr key={user.id}>
                <td key={user.id}>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>  
                <Link className='btn-edit' to={'/users/'+user.id}>Modifica</Link>
                &nbsp;
                <button onClick={ev => onDelete(user) }  className='btn-delete'>Elimina</button></td>
  
              </tr>
            ))}
          </tbody>
          }
        </table>
      </div>

      <div>
      <div className='pagination'>
        <span>Elementi per pagina:</span>
        <select value={perPage} onChange={(e) => changePerPage(Number(e.target.value))}>
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>Pagina:</span>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => changePage(page)}>{page}</button>
        ))}
      </div>
      {/* Resto del codice per visualizzare i dati degli utenti */}
    </div>
    </div>

    
  )
}

export default Users