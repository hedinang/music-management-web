
import React, { useEffect, useState } from 'react';

import { requestReportDashboard } from "../../services/ApiService"
import banner from '../../assets/banner.jpg'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Col, Row } from 'antd';
import { HiMusicNote, HiUserGroup } from 'react-icons/hi';
import './style.scss';
import { BsCheckLg, BsFillCartFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const highlightCardList = [
  { key: 1, title: 'Tổng số người dùng', icon: <HiUserGroup fontSize={80} color='#07629c' />, digit: 0, bgColor: '#0273b7' },
  { key: 2, title: 'Tổng số bài hát', icon: <HiMusicNote fontSize={80} color='#07629c' />, digit: 1, bgColor: '#00c0ef' },
  { key: 3, title: 'Tổng số yêu cầu mua hàng chưa duyệt', icon: <BsFillCartFill fontSize={80} color='#07629c' />, digit: 0, bgColor: '#f39c13' },
  { key: 4, title: 'Tổng số đơn hàng thành công', icon: <BsCheckLg fontSize={80} color='#07629c' />, digit: 0, bgColor: '#05a55a' },
  { key: 5, title: 'Tổng số đơn hàng từ chối', icon: <AiOutlineCloseCircle fontSize={80} color='#07629c' />, digit: 0, bgColor: '#de4b39' }
]
const data = [{ name: '1', song: 65 }, { name: '2', song: 59 }, { name: '3', song: 80 }, { name: '4', song: 81 },
{ name: '5', song: 56 }, { name: '6', song: 55 }, { name: '7', song: 40 }]


function Dashboard() {

  var [datasource, setDatasource] = useState({})


  const highlightCard = ({ title, icon, digit, bgColor }) => {
    return <Col span={8} className='p-[5px]'>
      <Card style={{ backgroundColor: `${bgColor}` }} className=' h-[100%]' hoverable >
        <div className='card'>
          <div>
            <div className='text-[36px] text-[white]'>{digit}</div>
            <div className='text-[15px] text-[white]'>
              {title}
            </div>
          </div>
          {icon}
        </div>
      </Card>
    </Col>
  }
  useEffect(() => {
    // requestReportDashboard().then((data) => {
    //   setDatasource(data)
    // })
  }, [])

  return <div className='dashboard'>
    {/* <div>
      <img style={{ width: "100%", "object-fit": "cover", height: 200 }} src={banner} ></img>
    </div> */}
    <Row>

      {highlightCardList.map(e => highlightCard(e))}

    </Row>

    <Row>
      <hr></hr>
      <br>
      </br>
      <Col md={2}></Col>
      <Col md={8}>
        <LineChart width={800} height={400} data={data} margin={{ top: 45, right: 20, bottom: 5, left: 0 }} >
          <Line type="monotone" dataKey="song" stroke="#4cc0c0" />
          <CartesianGrid stroke="#ccc"
          // strokeDasharray="5 5" 

          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend width={100} wrapperStyle={{ top: 0, right: 200, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
        </LineChart>
      </Col>
      <Col md={2}></Col>
    </Row>

  </div>

}

export default Dashboard
