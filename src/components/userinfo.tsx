import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRepos, getUserData } from "./data";
import { Avatar, Button, Card, Spin, Statistic } from "antd";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";

const UserInfo: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState<[]>([]);
  const [org, setOrg] = useState<[]>([]);
  const [picture, setPicture] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const [visibleRepos, setVisibleRepos] = useState(false);
  const [visibleOrgs, setVisibleOrgs] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // This will get you data from api and set it to useState hooks
  const Fetch = async (username: string) => {
    try {
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
    } catch (err) {
      setIsError(true);
    }
  };

  // Get informations from api once
  useEffect(() => {
    Fetch(String(location.state));
  }, []);

  return (
    <>
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        style={{ float: "left", marginTop: 20, marginLeft: 20 }}
        onClick={() => history.push("/Search")}
      />
      <h1 style={{ color: "var(--theme-page-text)", paddingTop: "5%" }}>
        Info About {location.state}
      </h1>

      {isError ? (
        <h2 style={{ color: "var(--theme-page-text)", paddingTop: "5%" }}>
          User Not Found
        </h2>
      ) : isLoading ? (
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
              description={
                <div style={{ display: "inline-block" }}>
                  <Statistic title="Repositories" value={repos.length} />
                  <Statistic title="Organizations" value={org.length} />
                </div>
              }
            />
          </Card>

          <Modal
            title="Repositories"
            centered
            visible={visibleRepos}
            onCancel={() => setVisibleRepos(false)}
            footer={[]}
          >
            {repos.length === 0 ? (
              <div style={{ textAlign: "center" }}>No Repositories to show</div>
            ) : (
              repos.map((element) => (
                <div key={element} style={{ textAlign: "center" }}>
                  <a
                    key={element}
                    href={`https://github.com/${String(
                      location.state
                    )}/${element}`}
                  >
                    <b> {element} </b>
                  </a>
                </div>
              ))
            )}
          </Modal>

          <Modal
            title="Organizations"
            centered
            visible={visibleOrgs}
            onCancel={() => setVisibleOrgs(false)}
            footer={[]}
          >
            {org.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                No Organizations to show
              </div>
            ) : (
              org.map((element) => (
                <div key={element} style={{ textAlign: "center" }}>
                  <a key={element} href={`https://github.com/${element}`}>
                    <b> {element} </b>{" "}
                  </a>
                </div>
              ))
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserInfo;
