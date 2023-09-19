/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button, Form, Input } from "antd";
import apiFactory from "../../api";
import { toast } from "react-toastify";
const EXPIRY_TIME = process.env.REACT_APP_EXPIRY_TIME || "4";

function Login(props) {
  const [loading, setLoading] = useState(false);
  // function doLogin(){
  //   if (loading){
  //     return;
  //   } 
  //   setLoading(true)
  //   trackPromise(new Promise((resolve)=>{

  //       ApiService.requestLogin(username,password).then((data)=>{
  //           console.log(props)
  //           props.history.push("/")
  //           setLoading(false)
  //           resolve()
  //           trackPromise(new Promise((resolve)=>{}),"authen")
  //       }).catch(e=>{
  //         console.log(e)
  //           resolve()
  //           setLoading(false)
  //           window.showAlert("Đăng nhập thất bại!");
  //       })
  //   }),"loading")

  // }

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onFinish = async (values) => {
    const result = await apiFactory.authApi.login(
      {
        username: values.username,
        password: values.password,
      }
    )

    if (result.code === 0) {
      let expires = new Date(
        new Date().setHours(new Date().getHours() + parseInt(EXPIRY_TIME))
      );
      Cookies.set("token", result?.data.jwttoken, { path: "/", expires });
      toast.success(result?.message)
      window.location.assign("/dashboard");
    } else {
      toast.error(result?.message)
    }
  }

  return (<div class="hold-transition login-page" style={{ "textAlign": "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }} >
    <div style={{ "textAlign": "center" }}>
      <img style={{ width: "100%", "object-fit": "cover", maxWidth: "600px" }} src="banner.jpg" ></img>
    </div>
    <div style={{ height: "100%" }} >

      <div
        style={{ position: "none", display: "inline-block", width: "100%", maxWidth: "600px", height: "100%" }}
        className="login-box-body"
      >
        <Form
          initialValues={data} onFinish={onFinish} autoComplete="off"
        >
          <p className="login-box-msg">Đăng nhập tài khoản quản trị</p>

          <div >
            <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item>
              <Button className="button" htmlType="submit">
                {'Đăng Nhập'}
              </Button>
            </Form.Item>
          </div>
        </Form>

      </div>
    </div>
  </div>
  )
}

export default Login
