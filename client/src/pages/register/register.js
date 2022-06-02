
import React from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import './register.css';
import 'react-datepicker/dist/react-datepicker.css';
import NetUtil from '../../util/net';
import { Navigate } from 'react-router-dom';


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
            success: false
        }
    }

    handleNameChanged(e){
        this.setState({
            name : e.target.value,
        })
    }
    handleBirthdayChanged(e){
        this.setState({
            birthday : e,
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
        e.preventDefault();
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = ()=>{
            console.log('filenam:',file);
            console.log('result:',reader.result);
            this.setState({
                photo: file,
                imagePreviewUrl : reader.result,
            })
        }
        reader.readAsDataURL(file);
    }
    handleSubmit(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", this.state.name);
        formData.append('birthday', this.state.birthday);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('address',this.state.address);
        formData.append('photo', this.state.photo);
        
        NetUtil.postForm('user/register',formData,(res)=>{this.onSubmitBack(res)})
    }

    onSubmitBack(res){
        if(res.status === 200 && res.data.code === 200){
            this.setState({
                success:true
            })
        }else{
            alert(res.data.msg)
        }
    }

    render(){
        if(this.state.success){
            return <Navigate to={"/list"} replace={true}/>
        }
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)} className="row">
                    <div className='input-group input-group-sm mb-3'>
                        <label className="input-group-text" >Name</label>
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
                        {/* <input 
                            type="text" 
                            required
                            name="password" 
                            className='form-control'
                            value={this.state.password} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        /> */}
                        <DatePicker required className='form-control' selected={this.state.birthday} onChange={(date)=>this.handleBirthdayChanged(date)}/>
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Phone</span>
                        <input 
                            type="text" 
                            required
                            name="phone" 
                            className='form-control'
                            value={this.state.phone} 
                            onChange={(e)=> this.handlePhoneChanged(e)}
                        />
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
                        <input 
                            type="email" 
                            required
                            name="email" 
                            className='form-control'
                            value={this.state.email} 
                            onChange={(e)=> this.handleEmailChanged(e)}
                        />
                    </div>

                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Address</span>
                        <input 
                            type="text" 
                            required
                            name="address" 
                            className='form-control'
                            value={this.state.address} 
                            onChange={(e)=> this.handleAddressChanged(e)}
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3'>
                        <span className="input-group-text" id="inputGroup-sizing-sm">Photo</span>
                        <input 
                            type="file" 
                            required
                            name="photo" 
                            accept='image/*'
                            className='form-control'
                            // value={this.state.photo} 
                            onChange={(e)=> this.handlePhotoChanged(e)}
                        />
                    </div>
                    <div className='d-grid gap-2'>
                            <input type="submit" className='btn btn-primary' value="Submit"/>
                    </div>
                    
                </form>
                {/* <div className='d-grid gap-2'> */}
                        <a className='pull-right' href='./'>I aleady have account</a>
                    {/* </div> */}
            </div>
        )
    }

    
}

export default Register