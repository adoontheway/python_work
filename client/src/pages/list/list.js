
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
        }
        NetUtil.postJson('user/list',{page:0},(res)=> this.onUserList(res))
    }

    onUserList(res){
        console.log(res);
        if(res.data.code === 200){
            this.setState({
                users:res.data.data.users,
                curPage:res.data.data.cur_page,
                maxPage:res.data.data.total_page,
            })
        }
        
    }

    render(){
        if(this.state.curPage === -1){
            return (
                <div className='container'>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Operation</th>
                        </tr>
                    </table>
                </div>
            )
        }
        return (
            <div className='container'>
                <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            {/* <th>Photo</th> */}
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.users.map((user, index) => {
                        return <UserItem data={user} key={index}/>
                    })}
                    </tbody>
                </table>
                <div className='pull-left pagination'>
                    <ul className='pagination'></ul>
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
                {/* <td><img src={props.data.photo} alt=''></img></td> */}
                <td>
                    <a className='btn btn-success btn-xs' href='#' onClick={()=>{alert("not implemented now")}}>Details</a>
                </td>
            </tr>
    )
}
export default ListPage