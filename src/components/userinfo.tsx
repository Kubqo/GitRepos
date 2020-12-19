import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRepos, getUserData } from "./data";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const UserInfo: React.FC = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState<[]>([]);
  const [org, setOrg] = useState<[]>([]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const Fetch = async (username: string) => {
    const repos = await getRepos(username);
    const orgAndData = await getUserData(username);
    const onlyNames = repos.map((element: { name: string }) => element.name);
    const onlyOrgsNames = orgAndData.orgs.map(
      (element: { login: string }) => element.login
    );

    setOrg(onlyOrgsNames);
    setRepos(onlyNames);

    setIsLoading(false);
  };

  useEffect(() => {
    Fetch(String(location.state));
  }, []);

  return (
    <>
      <h1> Info About {location.state}</h1>
      {isLoading ? (
        <Spin indicator={antIcon} />
      ) : (
        <div>
          <h2>Repos:</h2>
          {repos.map((element) => (
            <p key={element}> {element} </p>
          ))}
          <h2>Orgs:</h2>
          {org.map((element) => (
            <p key={element}> {element} </p>
          ))}
        </div>
      )}
    </>
  );
};

export default UserInfo;
