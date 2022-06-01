
import React from 'react';

import { Navigate } from 'react-router-dom';

import './login.css';
import logo from '../../logo.svg';


class Login extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            login:false,
        }
    }

    handleUsernameChanged(e){
        // console.log(e.target.value)
        this.setState({
            username : e.target.value,
        })
    }
    handlePasswordChanged(e){
        // console.log(e.target.value)
        this.setState({
            password : e.target.value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        fetch('http://localhost:8080/user/login',{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({username:username, password:password})
        })
        this.setState({
            login : true,
        });
    }

    render(){
        if(this.state.login){
            return <Navigate to={"/list"} replace={true}/>
        }
        return (
            <div className="container">
                    <img src={logo} className="App-logo" alt="logo" />
                <h1>Login</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)} className="row">
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                        <input 
                            type="text" 
                            required
                            name="username" 
                            className='form-control'
                            value={this.state.username} 
                            onChange={(e)=> this.handleUsernameChanged(e)}
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handlePasswordChanged(e)}
                        />
                    </div>
                   
                    <div className='d-grid gap-2'>
                            <input type="submit" className='btn btn-primary' value="Submit"/>
                    </div>
                    
                </form>
                
            </div>
        )
    }

}

export default Login