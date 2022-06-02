
import React from 'react';

import { Navigate } from 'react-router-dom';
import NetUtil from '../../util/net';

import './list.css';

class ListPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            users:Array(10).fill(null),
            curPage:-1,
            maxPage:-1,
            pageSize:10,
        }
        NetUtil.postJson('user/list',{page:0,page_size:10},(res)=> this.onUserList(res))
    }

    onUserList(res){
        if(res.status === 200 && res.data.code === 200){
            this.setState({
                users:res.data.data.users,
                curPage:res.data.data.cur_page,
                maxPage:res.data.data.total_page,
            })
        }else{
            alert(res.data.msg)
        }
    }

    onPrePage(){
        if(this.state.curPage <= 0) return 
        NetUtil.postJson('user/list',{page:this.state.curPage-1,page_size:10},(res)=> this.onUserList(res))
    }

    onNextPage(){
        if(this.state.curPage >= this.state.maxPage) return 
        NetUtil.postJson('user/list',{page:this.state.curPage+1,page_size:10},(res)=> this.onUserList(res))
    }

    render(){
        if(this.state.curPage === -1){
            return (
                <div className='container'>
                    <h1>User List</h1>
                    <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Operation</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className='container'>
                <h1>User List</h1>
                <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.users.map((user, index) => {
                        return <UserItem data={user} key={index}/>
                    })}
                    </tbody>
                </table>
                <div className='pull-left pagination '>
                    <button className='btn btn-success btn-xs margin-el' onClick={()=>this.onPrePage()}> Pre </button>
                    
                    <button className='btn btn-info btn-dark margin-el' onClick={()=>this.onNextPage()}> Next </button>
                </div>
            </div>
        )
    }
}

function UserItem(props) {
    return (
            <tr>
                <td>{props.data.name}</td>
                <td>{props.data.phone}</td>
                
                <td>{props.data.address}</td>
                <td>{props.data.email}</td>
                <td><img src={'static/upload/'+props.data.photo} alt='header'></img></td>
                <td>
                    <a className='btn btn-success btn-xs' href='#' onClick={()=>{alert("not implemented now")}}>Details</a>
                </td>
            </tr>
    )
}
export default ListPage