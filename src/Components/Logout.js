import React, { useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { DataContext } from './DataContext';
import axios from 'axios';
import { useHistory } from 'react-router';

function Logout(props) {

    const history = useHistory()

    const {
        setIsUserLoggedIn
    } = useContext(DataContext);



      useEffect(()=>{
        const logout = async () => {
            try{
              setIsUserLoggedIn(true)
                const decoded = jwt_decode(localStorage.getItem('refreshToken'))
    
                const res = await axios.post('https://flint-server.herokuapp.com/users/logout', {
                    email: decoded.email,
                    token: localStorage.getItem('refreshToken')
                }).catch((err) => {
                    console.log(err, res)
                })
                history.push('/')
    
            } catch {
                setIsUserLoggedIn(false)
                history.push('/')
            }
          }
        logout()
      },[])

    return (
        <div>

        </div>
    );
}

export default Logout;
