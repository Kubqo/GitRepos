import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Input } from 'antd';
import { useHistory } from "react-router-dom";

const { Search } = Input;


const SearchBar: React.FC = () => {
    const history = useHistory();
    const onSearch = (value:string) => history.push({
        pathname: '/User',
        search: value,
        state: value 
    });;

    return(
        <>
            <h1 style = {{marginTop:"5%"}}> Repositories and Organisations of Git User</h1>
            <Search 
              style = {{width: 400, marginTop:"10%"}} 
              placeholder="Enter username on Git" 
              onSearch={(onSearch)} 
              enterButton />
        </>
    )
}

export default SearchBar