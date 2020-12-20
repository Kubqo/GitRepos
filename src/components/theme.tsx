import React, { useEffect } from "react";
import { Switch } from "antd";
import { useTheme, Theme } from "./ThemeContext";

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const setThemeButton = () => {
    if (theme === "Light") {
      setTheme(Theme.Dark);
      localStorage.setItem("theme", "Dark");
    } else {
      setTheme(Theme.Light);
      localStorage.setItem("theme", "Light");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "Dark") {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
  }, []);

  return (
    <>
      <Switch
        style={{ float: "right", marginTop: 20, marginRight: 20 }}
        checkedChildren="Light"
        unCheckedChildren="Dark"
        defaultChecked={localStorage.getItem("theme") === "Dark"}
        onChange={() => setThemeButton()}
      />
    </>
  );
};

export default ThemeButton;
