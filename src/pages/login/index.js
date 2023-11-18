/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button, Form, Input, Spin } from "antd";
import apiFactory from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
const EXPIRY_TIME = process.env.REACT_APP_EXPIRY_TIME || "4";

function Login(props) {
  const navigate = useNavigate()
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
    setLoading(true)
    const result = await apiFactory.authApi.login(
      {
        username: values.username,
        password: values.password,
      }
    )

    setLoading(false)

    if (result.status === 200) {
      const result = await apiFactory.authApi.login(
        {
          username: values.username,
          password: values.password,
        }
      )
      if (!result?.data) {
        toast.error(result?.message)
      }
      const me = await apiFactory.authApi.getMe(result?.data?.access_token);

      if (!me?.data) {
        toast.error(result?.message)
      }

      if (me?.data?.type !== 'ADMIN') {
        toast.error("Tài khoàn này không phải là admin!")
        return
      }

      localStorage.setItem('username', me?.data?.username || 'Vô danh')

      let expires = new Date(
        new Date().setHours(new Date().getHours() + parseInt(EXPIRY_TIME))
      );
      Cookies.set("access_token", result?.data.access_token, { path: "/", expires });
      toast.success('Welcome to Shop Music')
      navigate('/')
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
          layout="vertical"
        >
          <p className="login-box-msg">Đăng nhập tài khoản quản trị</p>

          <div >
            <Form.Item name="username" label="Tên đăng nhập"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                },
              ]}
            >
              <Input type="password" disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button className="button w-[100px]" htmlType="submit">
                {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : 'Đăng Nhập'}
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
