import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from './../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
  

    const [ formValues, handleInputChange ] = useForm({
        email: 'wili_javi-@hotmail.com',  
        password: '123456'
    })



    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <Fragment>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleSubmit }>
                <input 
                    type='text' 
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />


                <input 
                    type='password' 
                    placeholder='Password'
                    name='password'
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"        
                    disabled={loading}
                >
                    Ingresar
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to='/auth/register' className="link">
                    Create new account
                </Link>

            </form>

        </Fragment>
    )
}
