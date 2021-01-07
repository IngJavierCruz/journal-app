import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';

import { useForm } from './../../hooks/useForm';
import { removeError, setError } from './../../actions/ui';
import { startRegisterUser } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [formValues, handleInputChange ] = useForm({
        name:'',
        email:'',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch( startRegisterUser(email, password, name) );
            console.log('Formulario correcto');
        }

    }


    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch( setError('Name is required'));
            return false;         
        } else if (!validator.isEmail(email)){
            dispatch( setError('Email is not valid'));
            return false;         
        } else if (password !== password2 || password.length < 5) {
            dispatch( setError('Password should be at least 6 characters and match'));
            return false;
        }

        dispatch( removeError() )
        return true;
    }


    return (
        <Fragment>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {   
                    msgError && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }


                <input 
                    type='text' 
                    placeholder='Name'
                    name='name'
                    autoComplete='none'
                    className="auth__input"
                    onChange={ handleInputChange }
                />

                <input 
                    type='text' 
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    className="auth__input"
                    onChange={ handleInputChange }
                />


                <input 
                    type='password' 
                    placeholder='Password'
                    name='password'
                    className="auth__input"
                    onChange={ handleInputChange }
                />

                <input 
                    type='password' 
                    placeholder='Confirm password'
                    name='password2'
                    className="auth__input"
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mt-5"
                    onClick={ handleRegister }
                >
                    Registrar
                </button>

                <Link to='/auth/login' className="link">
                    Already registered?
                </Link>

            </form>

        </Fragment>

    )
}
