import React from "react";
import { Switch } from "antd";

const Theme: React.FC = () => {
  return (
    <>
      <Switch
        style={{ float: "right", marginTop: 20, marginRight: 20 }}
        checkedChildren="Light"
        unCheckedChildren="Dark"
        defaultChecked
      />
    </>
  );
};

export default Theme;
