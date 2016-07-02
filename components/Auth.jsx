/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
/* eslint-enable no-unused-vars */

import Component from '../common/BindingComponent';

// reducer
const auth = function (state = {status: 'logged out', value: 'guest'}, action) {
    switch (action.type) {
    case 'LOGIN':
        return Object.assign ({}, state, {
            status: 'logged in',
            value:  action.value
        });
        // eslint-disable-next-line no-unreachable
        break;
    case 'LOGOUT':
        return Object.assign ({}, state, {
            status: 'logged out',
            value:  action.value
        });
        // eslint-disable-next-line no-unreachable
        break;
    default:
        return state;
    }
};

// store
const store = createStore (auth);

// react component
export class Auth extends Component {
    constructor(props) {
        super (props);
        this.bind (
            'handleLogin',
            'handleLogout'
        );
    }
    
    onClick() {
        this.handleLogin ();
    }
    
    handleLogin() {
        let username = this.refs.username.value;
        // eslint-disable-next-line no-console
        console.log (username);
        
        // dispatch action
        store.dispatch ({
            type:  'LOGIN',
            value: username
        });
    }
    
    handleLogout() {
        // dispatch action
        store.dispatch ({
            type:  'LOGOUT',
            value: 'guest'
        });
        this.refs.username.value = '';
    }
    
    render() {
        let button, input ='';
        
        if (this.props.state.status === 'logged in') {
            input = '';
            button = <button onClick={this.handleLogout}>Log out</button>;
        } else {
            input = <input type="text" ref="username"/>;
            button = <button onClick={this.handleLogin}>Log in</button>;
        }
        return (
            <div>
                {input}
                {button}
                <h1>Current state is {this.props.state.status + ' as ' + this.props.state.value}</h1>
            </div>
        );
    }
}

const render = function () {
    ReactDOM.render (
        <Auth state={store.getState()}/>,
        document.getElementById ('root')
    );
};

store.subscribe (render);
render ();