import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {register} from '../../actions/auth'
import { connect } from 'react-redux'
import {returnErrors} from '../../actions/messages'

function Register({register, returnErrors}) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleBtn = () => {
        return (
            !email.length > 0 ||
            !username.length > 0 ||
            !password.length > 0 ||
            !password2.length > 0 
        )
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(password.length < 6) {
            returnErrors({"error":"Password must be atleast 6 characters"}, 400)
        } else if(password !== password2) {
            returnErrors({"error":"Password don`t match"}, 400)
        } else {
            // console.log(email, username, password, password2);
            register(email, username, password, password2);
        }
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h3 className="text-center">Register</h3>
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
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value= {username}
                            onChange= {(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value= {password}
                            onChange= {(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value= {password2}
                            onChange= {(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={handleBtn()} className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default connect(null, {register, returnErrors})(Register)
