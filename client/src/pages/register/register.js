
import React from 'react';
import './register.css';

class Register extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:"",
            birthday:"",
            phone:"",
            email:"",
            address:"",
            photo:"",
        }
    }

    handleNameChanged(e){
        this.setState({
            name : e.target.value,
        })
    }
    handleBirthdayChanged(e){
        this.setState({
            birthday : e.target.value,
        })
    }
    handlePhoneChanged(e){
        this.setState({
            phone : e.target.value,
        })
    }
    handleEmailChanged(e){
        this.setState({
            email : e.target.value,
        })
    }
    handleAddressChanged(e){
        this.setState({
            address : e.target.value,
        })
    }
    handlePhotoChanged(e){
        this.setState({
            photo : e.target.value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        fetch('http://localhost:8080/user/register',{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({username:username, password:password})
        })
    }

    render(){
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)} className="row">
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                        <input 
                            type="text" 
                            required
                            name="name" 
                            className='form-control'
                            value={this.state.name} 
                            onChange={(e)=> this.handleNameChanged(e)}
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Birthday</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        />
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Phone</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        />
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        />
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Address</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Photo</span>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
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

export default Register