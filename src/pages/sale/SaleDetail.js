
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import { FaMusic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiFactory from '../../api';
import { Option } from "antd/es/mentions";




const AsyncSelect = ({ chooseCategory }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    // const [currentTotal, setCurrentTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const fetchUserList = async () => {
        const data = await apiFactory.nursingApi.getList({
            per: limit,
            page: page,
        })
        if (data) {
            setUsers(data.nursing_staffs.map((e) => <Option key={e.id} value={e.id}>
                {e.name_kana}
            </Option>))
            setTotalItems(data.total_items)
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
    useEffect(() => {
        // fetchUserList()
    }, [])
    return <>
        <Select
            onChange={(e) => chooseCategory(e)}
            onPopupScroll={onscroll}
        >
            {users}
        </Select>
    </>

}


function SaleDetail({ different }) {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [initalData, setInitialData] = useState({
        name: '',
        author: '',
        category: '',
        img: {
            url: '',
            file: null
        },
        product: {
            url: '',
            file: null
        }

    })
    const [categoryList, setCategoryList] = useState([])
    const chooseCategory = (e) => {
        const u = categoryList.find(f => f.value === e)
        // setChoosedUser(u?.value)
    }
    const onFinish = () => {
        // apiFactory.categoryApi.create({
        //     title: musicType,
        //     thumb: img
        // })
    }

    const CoverImage = useCallback(({ value, onChange }) => {
        const uploadImg = (e) => {
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

        return <label
            htmlFor="img"
            className="w-[250px] h-[133px] bg-white border-[#5A96D7] boder-[1px] rounded-xl border-solid flex items-center justify-center pl-3 pr-3 cursor-pointer"
            style={{ border: '1px solid #5A96D7' }}>
            <input type="file" id="img" className="hidden" style={{ display: 'none' }} onChange={uploadImg}
                // accept="audio/*, video/*" 
                accept="image/*"
            />
            <div className="flex flex-col items-center justify-center">
                {value.url ? (
                    <div className='flex flex-col justify-center items-center gap-[5px]'>
                        <img src={value.url} alt="preview" className="w-full h-[100px] object-cover" />
                        <DeleteFilled className='text-[red]' onClick={removeImg} />
                    </div>
                ) : (
                    <>
                        <FileImageOutlined size={40} color="#A5AAB4" />
                        <p className="text-[#A5AAB4] text-[12px] text-center">
                            upload
                        </p>
                    </>
                )}
            </div>
        </label>
    }, [])

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
                    <Form.Item label="Danh mục"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <AsyncSelect chooseCategory={chooseCategory} />

                    </Form.Item>

                    <Row>
                        <Col span={11}>
                            <Form.Item label="Giá / 1 phút"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Giá cả bài" name="author">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                </Col>

            </Row>


            <StickyFooter >
                <div className="flex justify-between gap-[5px]">
                    <Button className='bg-[#868e96] text-white ml-[230px]' onClick={() => navigate('/product/list')}>Quay lại</Button>
                    <div className='flex gap-[5px]'>
                        {different.type !== 'view' && <Button className='ml-auto bg-[#007dce] text-white'>Lưu</Button>}
                        {different.type === 'view' && <Button className='ml-auto bg-[#aec57d] text-white'>Sửa</Button>}
                        {different.type === 'view' && <Button className='bg-[#ed2727] text-white'>Xoá</Button>}
                    </div>
                </div>
            </StickyFooter>
        </Form>
    </div>


}

export default SaleDetail
