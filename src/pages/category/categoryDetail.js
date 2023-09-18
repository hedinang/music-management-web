
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Row } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import FormItem from 'antd/es/form/FormItem';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiFactory from '../../api';



function CategoryDetail({ different }) {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [initalData, setInitialData] = useState({
        musicType: '',
        img: {
            url: '',
            file: null
        }

    })
    const onFinish = () => {
        // apiFactory.categoryApi.create({
        //     title: musicType,
        //     thumb: img
        // })
    }

    const CoverImage = useCallback(({ value, onChange }) => {
        const uploadImg = (e) => {
            onChange({
                ...value,
                file: e.target.files[0]
            })

            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({
                    file: e.target.files[0],
                    url: reader.result
                })
            };
            if (file) {
                reader.readAsDataURL(file);
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
            htmlFor="upload"
            className="w-[250px] h-[150px] bg-white border-[#5A96D7] boder-[1px] rounded-xl border-solid flex items-center justify-center pl-3 pr-3 cursor-pointer"
            style={{ border: '1px solid #5A96D7' }}>
            <input type="file" id="upload" className="hidden" style={{ display: 'none' }} accept="image/*" onChange={uploadImg} />
            <div className="flex flex-col items-center justify-center">
                {value.url !== '' ? (
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
    return <div className='category-detail'>
        <Form
            initialValues={initalData}
            onFinish={onFinish}
            form={form}
            // labelCol={{ style: { width: 120 } }}
            layout='vertical'

        >
            <Row>
                <Col span={11}>
                    <Form.Item label="Tên loại nhạc"
                        name="musicType"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh cover"
                        name="img"
                        className="mb-[8px]"
                        required={false}
                    >
                        <CoverImage />


                    </Form.Item>
                </Col>

            </Row>


            <StickyFooter >
                <div className="flex justify-between gap-[5px]">
                    <Button className='bg-[#868e96] text-white ml-[230px]' onClick={() => navigate('/category/list')}>Quay lại</Button>
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

export default CategoryDetail
