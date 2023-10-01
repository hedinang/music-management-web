
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import { FaMusic } from 'react-icons/fa';
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
    const [categoryList, setCategoryList] = useState([])
    const chooseCategory = (e) => {
        const u = categoryList.find(f => f.value === e)
        // setChoosedUser(u?.value)
    }
    const onFinish = async(values) => {
        const result = await apiFactory.saleApi.create({
            customerId: values?.customer,
            songId: values?.song
        })
        if (result.status === 200) {
            toast.success('Tạo đơn hàng thành công')
            navigate('/sale/list')
        } else {
            toast.error(result?.message)
        }
    }

    const FileMusic = useCallback(({ value, onChange }) => {
        const uploadMusic = (e) => {
            // onChange({
            //     ...value,
            //     file: e.target.files[0]
            // })

            const file = e.target.files[0];
            const reader = new FileReader();

            if (file) {
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    onChange({
                        file: e.target.files[0],
                        url: reader.result
                    })
                };
            } else {
                onChange({
                    file: null,
                    url: ''
                })

            }
        }

        const removeImg = (e) => {
            e.preventDefault()
            onChange({
                file: null,
                url: ''
            })
        }

        return <div className='flex flex-row items-center gap-[10px]'>

            <label
                htmlFor="music"
                className="w-[100px] h-[100px] bg-white border-[#5A96D7] boder-[1px] rounded-xl border-solid flex items-center justify-center pl-3 pr-3 cursor-pointer"
                style={{ border: '1px solid #5A96D7' }}>
                <input type="file" id="music" className="hidden" style={{ display: 'none' }}
                    accept="audio/*, video/*" onChange={uploadMusic} />
                <div className="flex flex-row items-center justify-center gap-[5px]">
                    <div className='text-[30px]'>+</div>
                    <FaMusic size={30} />
                </div>
            </label>
            {value.url && <audio controls={true} src={value.url} />}
            {value.url && <DeleteFilled className='text-[red]' onClick={removeImg} />}
        </div>

    }, [])
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
    </div>


}

export default SaleDetail
