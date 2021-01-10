import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Form, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";

const SearchBar: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <h1 style={{ paddingTop: "5%", color: "var(--theme-page-text)" }}>
        Repositories and Organisations of Git User
      </h1>

      <Form
        name="basic"
        onFinish={(value: { username: string }) =>
          history.push({
            pathname: "/User",
            search: value.username,
            state: value.username,
          })
        }
        // onFinishFailed={(err) => console.log(err)}
      >
        <div
          style={{
            minWidth: 297.02,
            margin: "auto",
            paddingTop: "10%",
            display: "inline-block",
          }}
        >
          <FormItem
            style={{ float: "left" }}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input Git username!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Git username"
              prefix={<SearchOutlined />}
            />
          </FormItem>

          <FormItem style={{ float: "right", margin: "auto" }}>
            <Button size="large" type="primary" htmlType="submit">
              Search
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
