import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRepos, getUserData } from "./data";
import { Avatar, Button, Card, Spin, Statistic } from "antd";
import {
  CodeOutlined,
  EditOutlined,
  EllipsisOutlined,
  LeftOutlined,
  LoadingOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ThemeButton from "./theme";
import Meta from "antd/lib/card/Meta";
import { Theme } from "./ThemeContext";
import Modal from "antd/lib/modal/Modal";

const UserInfo: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState<[]>([]);
  const [org, setOrg] = useState<[]>([]);
  const [picture, setPicture] = useState<string>();

  const [visibleRepos, setVisibleRepos] = useState(false);
  const [visibleOrgs, setVisibleOrgs] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // This will get you data from api and set it to useState hooks
  const Fetch = async (username: string) => {
    const repos = await getRepos(username);
    const orgAndData = await getUserData(username);
    const onlyNames = repos.map((element: { name: string }) => element.name);
    const onlyOrgsNames = orgAndData.orgs.map(
      (element: { login: string }) => element.login
    );
    const pic = orgAndData.user.avatar_url;
    
    setOrg(onlyOrgsNames);
    setRepos(onlyNames);
    setPicture(pic);

    setIsLoading(false);
  };

  // Get informations from api once
  useEffect(() => {
    Fetch(String(location.state));
  }, []);

  return (
    <>
      {/* This Button is changing theme */}
      <ThemeButton />
      {/* This Button will take you to Search page */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        style={{ float: "left", marginTop: 20, marginLeft: 20 }}
        onClick={() => history.push("/Search")}
      />
      <h1 style={{ color: "var(--theme-page-text)", paddingTop: "5%" }}>
        Info About {location.state}
      </h1>

      {isLoading ? (
        <Spin indicator={antIcon} />
      ) : (
        <div>
          <Card
            style={{ width: 360, background: "white", margin: "auto" }}
            actions={[
              <p onClick={() => setVisibleRepos(true)}>Repositories</p>,
              <p onClick={() => setVisibleOrgs(true)}> Organizations</p>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src={picture} style={{ width: 125, height: 125 }} />
              }
              // title={}
              description={
                <div style={{ display: "inline-block" }}>
                  <Statistic title="Repositories" value={repos.length} />
                  <Statistic title="Organizations" value={org.length} />
                </div>
              }
            />
          </Card>

          {/* <h2 style={{ color: "var(--theme-page-text)" }}>Repos:</h2>
          {repos.map((element) => (
            <p key={element}> {element} </p>
          ))}

          <h2 style={{ color: "var(--theme-page-text)" }}>Orgs:</h2>
          {}

          {org.map((element) => (
            <p key={element}> {element} </p>
          ))}
           */}
          <Modal
            title="Repositories"
            centered
            visible={visibleRepos}
            onOk={() => setVisibleRepos(false)}
            onCancel={() => setVisibleRepos(false)}
          >
            {repos.map((element) => (
            <p key={element}> {element} </p>
          ))}
          </Modal>

          <Modal
            title="Organizations"
            centered
            visible={visibleOrgs}
            onOk={() => setVisibleOrgs(false)}
            onCancel={() => setVisibleOrgs(false)}
          >
            {org.map((element) => (
            <p key={element}> {element} </p>
          ))}
          </Modal>


        </div>
      )}
    </>
  );
};

export default UserInfo;
