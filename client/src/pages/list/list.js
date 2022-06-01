
import React from 'react';

import { Navigate } from 'react-router-dom';

import './list.css';

class ListPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            user:Array(10).fill(null),
            curPage:0,
        }
    }
    render(){
        return (
            <div className='container'>
                this is list view
            </div>
        )
    }
}
export default ListPage