import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions'

export default function (WrappedComponent) {

    class AuthenticationCheck extends Component {
        componentWillMount() {
            this.props.dispatch(auth());

        }
        componentWillReceiveProps(nextProps) {
            if (!nextProps.user.user.isAuth) {
                this.props.history.push('/login')
            }
        }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}