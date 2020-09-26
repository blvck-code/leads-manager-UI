import React, {useEffect, useState} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { connect } from 'react-redux'
import {login}  from '../../actions/auth'
import PropTypes from 'prop-types'


function Login({login, auth}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const propTypes = () => ({
        login: PropTypes.func.isRequired
    })

    useEffect(() => {
        propTypes()
    }, [])

    const handleBtn = () => {
        return (
            !email.length > 0 ||
            !password.length > 0
        )
    }

    const handleSubmit = e => {

        e.preventDefault();
        login(email, password)
        setEmail('')
        setPassword('')
    }

    if(auth.isAuthenticated && auth.token !== 'undefined' && auth.token !== null){
        return <Redirect to="/" />
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h3 className="text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value= {email}
                            onChange= {(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={handleBtn()} className="btn btn-primary">
                            Sign In
                        </button>
                    </div>
                    <p>
                        Need an account? <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login)
