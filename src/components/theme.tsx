import React from "react";
import { Switch } from "antd";
import { useTheme, Theme } from './ThemeContext';

const ThemeButton: React.FC = () => {

  const { theme, setTheme } = useTheme();

  const setThemeButton  = () => {
    if (theme === "Light") {
      setTheme(Theme.Dark)
    }else{
      setTheme(Theme.Light)
    }

  }

  return (
    <>
      <Switch
        style={{ float: "right", marginTop: 20, marginRight: 20 }}
        checkedChildren="Light"
        unCheckedChildren="Dark"
        defaultChecked = {false}
        onChange={() => setThemeButton()}
      />
    </>
  );
};

export default ThemeButton;
