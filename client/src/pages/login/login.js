
import React from 'react';

import { Navigate } from 'react-router-dom';

import './login.css';
import logo from '../../logo.svg';
import NetUtil from '../../util/net';


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
        let formData = new FormData();
        formData.append("username", username);
        formData.append('password', password);
        NetUtil.postForm('user/login',formData,(res)=>this.onLoginBack(res))
        
    }

    onLoginBack(res){
        if(res.status === 200 && res.data.code === 200){
            NetUtil.config['token'] = res.data.token;
            this.setState({
                login : true,
            });
        }else{
            alert(res.data.msg);
        }
    }

    render(){
        if(this.state.login){
            return <Navigate to={"/list"} replace={true}/>
        }
        return (
            <div className="login-wrapper">
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

                    {/* <div className='d-grid gap-2'> */}
                        <a className='pull-right' href='./register'>I have no account</a>
                    {/* </div> */}
                    
                </form>
                
            </div>
        )
    }

}

export default Login