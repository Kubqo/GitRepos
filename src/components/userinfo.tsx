import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getRepos, getUserData } from "./data"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const UserInfo: React.FC<{username:string}> = ({username}) => {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [repos, setRepos] = useState<[]>([]);
    const [org, setOrg] = useState<[]>([]);
   
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const Fetch = async () => {
       const repos = await getRepos("djc")
       const orgAndData = await getUserData("djc")
       const onlyNames = repos.map((element:{name:string}) => element.name)
       const onlyOrgsNames = orgAndData.orgs.map((element:{login:string}) => element.login)
       
       setOrg(onlyOrgsNames)
       setRepos(onlyNames)
       
       setIsLoading(false)
    }    

    useEffect(() => {Fetch()},[])

    return(
        <>
            <h1> Info About {location.state}</h1>
            {isLoading ? 
            <Spin indicator={antIcon} />:
            <div>
                {repos.map((element) => <p key = {element}> {element} </p>)}
                {org.map((element) => <p key = {element}> {element} </p>)}
            </div>
            }

        </>
    )
}

export default UserInfo