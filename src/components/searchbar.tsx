import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import Theme from "./theme";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const history = useHistory();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Git username is required"),
  });

  return (
    <div>
      {/* <Theme/> */}
      <h1 style={{ paddingTop: "5%" }}>
        {" "}
        Repositories and Organisations of Git User
      </h1>

      <Formik
        initialValues={{
          username: "",
        }}
        onSubmit={(values) =>
          history.push({
            pathname: "/User",
            search: values.username,
            state: values.username,
          })
        }
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <div className="input">
            <Form>
              <Field
                style={{ width: 200, marginTop: "10%" }}
                name="username"
                placeholder="Git User"
              />

              <button className="ant-btn-primary" type="submit">
                {<SearchOutlined />} Search
              </button>

              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
