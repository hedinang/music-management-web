
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import { useNavigate } from 'react-router-dom';
import apiFactory from '../../api';
import { Option } from "antd/es/mentions";
import { toast } from 'react-toastify';




const AsyncSelect = ({ type, value, onChange, initalData, setInitialData }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    // const [currentTotal, setCurrentTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([])
    const fetchDataList = async () => {
        let result
        switch (type) {
            case 'customer':
                result = await apiFactory.customerApi.getList({
                    limit: limit,
                    page: page,
                })
                if (result) {
                    setDataList(result?.data?.items?.map((e) => <Option key={e.id} value={e.id}>
                        {e.username}
                    </Option>))
                    setTotalItems(result?.data?.total_items)
                }
                break;
            case 'song':
                result = await apiFactory.songApi.getList({
                    limit: limit,
                    page: page,
                })
                if (result) {
                    setDataList(result?.data?.items?.map((e) => <Option key={e.id} value={e.id}>
                        {e.name}
                    </Option>))
                    setTotalItems(result?.data?.total_items)
                }
                break;

            default:
                break;
        }

    }
    // const onscroll = async (event: any) => {
    //     if ((event.currentTarget.scrollTop + event.currentTarget.clientHeight) >= event.currentTarget.scrollHeight &&
    //         (page * limit) < totalItems && !loading) {
    //         users.push(<Option key={'loading'} value={'loading'} disabled>
    //             <Spin className="absolute left-[50%]" />
    //         </Option>)
    //         setUsers([...users])
    //         setLoading(true)
    //         setTimeout(async () => {
    //             const data = await apiFactory.nursingApi.getList({
    //                 per: limit,
    //                 page: page + 1,
    //             })
    //             if (data) {
    //                 users.pop()
    //                 const newUsers = users.concat(data.nursing_staffs.map((e: any) => <Option key={e.id} value={e.id}>
    //                     {e.name_kana}
    //                 </Option>))
    //                 setUsers(newUsers)
    //                 setPage(page + 1)
    //                 setTotalItems(data.total_items)
    //             }
    //             setLoading(false)
    //         }, 500)

    //     }
    // }

    const chooseElement = async (e) => {
        onChange(e)
        switch (type) {
            case 'customer':
                // setInitialData({

                // })
                break
            case 'song':
                const result = await apiFactory.songApi.getById(e)
                console.log("first")

                setInitialData({
                    ...initalData,
                    song: {
                        name: result?.data?.name,
                        id: result?.data?.id,
                        url: result?.data?.url,
                        unitPrice: result?.data?.unit_price,
                        duration: result?.data?.duration,
                        totalPrice: result?.data?.unit_price * result?.data?.duration
                    }
                })
                break
            default:
                break;
        }

    }

    useEffect(() => {
        fetchDataList()
    }, [])
    return <>
        <Select
            onChange={chooseElement}
            onPopupScroll={onscroll}
        >
            {dataList}
        </Select>
    </>

}


function SaleDetail({ different }) {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [initalData, setInitialData] = useState({
        customer: {
            name: '',
            id: ''
        },
        song: {
            name: '',
            id: '',
            url: '',
            unitPrice: 0,
            totalPrice: 0
        }
    })
    const onFinish = async(values) => {
        setLoading(false)
        const result = await apiFactory.saleApi.create({
            customerId: values?.customer,
            songId: values?.song
        })
        setLoading(true)
        if (result.status === 200) {
            toast.success('Tạo đơn hàng thành công')
            navigate('/sale/list')
        } else {
            toast.error(result?.message)
        }
    }

    return <div className='category-detail'>
        <Form
            initialValues={initalData}
            onFinish={onFinish}
            form={form}
            // labelCol={{ style: { width: 120 } }}
            layout="vertical"

        >
            <Row>
                <Col span={11}>
                    <Form.Item label="Khách hàng"
                        name="customer"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <AsyncSelect type='customer' initalData={initalData} setInitialData={setInitialData} />
                    </Form.Item>

                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Form.Item label="Bài hát"
                        name="song"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <AsyncSelect type='song' initalData={initalData} setInitialData={setInitialData} />
                    </Form.Item>
                    {initalData.song.url &&
                        <>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Giá / 1 phút (VNĐ)">
                                        <Input disabled value={initalData.song.unitPrice} />
                                    </Form.Item>
                                </Col>
                                <Col span={2} />
                                <Col span={11}>
                                    <Form.Item label="Giá cả bài (VNĐ)">
                                        <Input disabled value={initalData.song.totalPrice} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <audio controls={true} src={initalData.song.url} />
                        </>
                    }
                </Col>
            </Row>
            <StickyFooter >
                <div className="flex justify-between gap-[5px]">
                    <Button className='bg-[#868e96] text-white ml-[230px]' onClick={() => navigate('/product/list')}>Quay lại</Button>
                    <div className='flex gap-[5px]'>
                        {different.type !== 'view' && <Button className='ml-auto bg-[#007dce] text-white' htmlType="submit">Lưu</Button>}
                        {different.type === 'view' && <Button className='ml-auto bg-[#aec57d] text-white'>Sửa</Button>}
                        {different.type === 'view' && <Button className='bg-[#ed2727] text-white'>Xoá</Button>}
                    </div>
                </div>
            </StickyFooter>
        </Form>
        <Modal title="Hệ thống đang xử lý" open={loading} closable={false} footer={null}>
            <Spin className="mt-[20px] flex justify-center gap-[10px]" />
        </Modal>
    </div>


}

export default SaleDetail
