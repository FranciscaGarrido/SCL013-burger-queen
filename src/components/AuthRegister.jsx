import React, { useState } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import firebase, {db ,errorFirebase }  from '../firebaseConfig/firebase.js';
import Logo from './Logo.jsx';
import '../assets/css/Auth.css';
import { Link } from 'react-router-dom';

const RegisterUser = (props) => {
    const [ name , setName ] = useState('');
    const [ rol , setRol ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ password, setPassword] = useState('');

    const submitRegisterUser = () => { 
        if( name === '' || rol === '' || email === '' || password === ''){
            alert("Hay campos vacíos, favor llenarlos")
    
        } else {
             firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( (result) => { 
                    //console.log(result);
                    return db.collection("users").doc(result.user.uid).set({
                        displayName : name,
                        email : result.user.email,
                        rol : rol,
                        userUID : result.user.uid
                    })
                })
                .then(() => {
                    props.history.push('/login');
                })
                .catch((error) => {
                    errorFirebase(error);
                })

            }
    }
    
return(
<div className = "Container-login">
    <Logo/>
    <div className = "Container-form">
    <input type="name" id="name" placeholder="Nombre y Apellido" autoComplete= "off" onChange = { (ev) => setName(ev.target.value)}/>
    <input type="rol" id="rol" placeholder="Mesero o Cocinero" autoComplete= "off" onChange = { (ev) => setRol(ev.target.value)} />
    <input type="email" id="email" placeholder="E-mail" autoComplete= "off" onChange = { (ev) => setEmail(ev.target.value)} />
    <input type="password" id="password" placeholder="Contraseña" autoComplete= "off" onChange = { (ev) => setPassword(ev.target.value)} />
    <button className = "Button-register" onClick = {submitRegisterUser}>Registrarse</button>
    <hr/>
    <p>¿Ya estás registrado? <Link className = 'link-Redirect' to='/login'>Inicia sesión</Link></p>

    
    </div>
  
</div>

) 
}

export default RegisterUser;