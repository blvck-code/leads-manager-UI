import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRouter = ({component:Component, auth, ...rest}) => (
    <Route 
        {...rest}
        render = {props => {
            if(auth.isLoading) {
                return <h2>Loading...</h2>
            }else if(auth.isAuthenticated === null) {
                return <Redirect to="/login" />
            }else {
                return <Component {...props} />
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRouter);
