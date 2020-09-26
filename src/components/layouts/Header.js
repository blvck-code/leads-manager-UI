import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {logOut} from '../../actions/auth'


function Header({auth, logOut}) {

    const handleLogout = () => {
        logOut()
        return <Redirect to='/login' />
    }


    const authLinks = <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <span className="navbar-text mr-3">
                                <strong>
                                    {auth.user ? `Welcome ${auth.user.username}` : "" }
                                </strong>
                            </span>
                            <li className="nav-item">
                                <button onClick={() => handleLogout()} className="btn btn-info nav-link btn-sm text-light">Log Out</button>    
                            </li>
                        </ul>

    const guestLinks = <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <h4>Leads Manager</h4>
                     {auth.isAuthenticated && auth.token !== null ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logOut})(Header)
