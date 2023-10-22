
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, Spin, Tag } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import apiFactory from '../../api';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { Option } from 'antd/es/mentions';

function CustomerDetail({ different }) {
    const param = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [initalData, setInitialData] = useState({
        name: '',
        username: '',
        password: '',
        rePassword: '',
        img: {
            url: '',
            file: null
        },
        favorite: [],
        email: '',
        phone: '',
        balance: 0,
        changePassword: false

    })

    const onFinish = async (values) => {
        setLoading(true)
        if ((different.type === 'add' || values?.changePassword) && values?.password !== values?.rePassword) {
            toast.error('Mật khẩu phải khớp với mật khẩu xác nhận!')
            return
        }
        let balance = values?.balance
        if (typeof (values?.balance) !== 'number') {
            balance = Number(values?.balance?.replaceAll(',', ''))
        }
        let result
        if (different.type === 'edit') {
            result = await apiFactory.customerApi.update({
                id: param?.id,
                name: values?.name,
                username: values?.username,
                password: values?.password,
                image: values?.img?.file,
                image_url: values?.img?.url,
                email: values?.email,
                phone: values?.phone,
                balance: balance,
                favorite: values?.favorite?.map(e => e.value),
                change_password: values?.changePassword,
            })
        }

        if (different.type === 'add') {
            result = await apiFactory.customerApi.create({
                name: values?.name,
                username: values?.username,
                password: values?.password,
                image: values?.img?.file,
                email: values?.email,
                phone: values?.phone,
                balance: balance,
                favorite: values?.favorite?.map(e => e.value)
            })
        }
        setLoading(false)

        if (result.status === 200) {
            toast.success(result?.message)
            navigate('/customer/list')
        } else {
            toast.error(result?.message)
        }
    }

    const CoverImage = useCallback(({ value, onChange }) => {
        const uploadImg = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            if (file) {
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    onChange({
                        file: e.target.files[0],
                        url: reader.result
                    })
                }
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
            <input type="file" id="img" className="hidden" style={{ display: 'none' }} onChange={uploadImg} disabled={different.type === 'view'}
                // accept="audio/*, video/*" 
                accept="image/*"
            />
            <div className="flex flex-col items-center justify-center">
                {value.url ? (
                    <div className='flex flex-col justify-center items-center gap-[5px]'>
                        <img src={value.url} alt="preview" className="w-full h-[100px] object-cover" />
                        {different.type !== 'view' && <DeleteFilled className='text-[red]' onClick={removeImg} />}
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

    const AsyncSelectFavoriteSong = ({ value, onChange }) => {
        const [limit, setLimit] = useState(10);
        const [page, setPage] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        // const [currentTotal, setCurrentTotal] = useState(0)
        const [loading, setLoading] = useState(false)
        const [songList, setSongList] = useState([])
        const fetchSongList = async () => {
            const result = await apiFactory.songApi.getList({
                per: limit,
                page: page,
            })
            if (result?.data?.items) {
                const choosedList = value.map(e => e.value)

                setSongList(result?.data?.items?.map(e => {
                    if (!choosedList.includes(e.id)) {
                        return {
                            component: <Option key={e.id} value={e.id}>
                                {e.name}
                            </Option>,
                            disabled: false,
                            value: e.id,
                            label: e.name
                        }
                    }
                    return {
                        component: <Option key={e.id} value={e.id}>
                            {e.name}
                        </Option>,
                        disabled: true,
                        value: e.id,
                        label: e.name
                    }
                }))
                // .filter(e => {
                //     return !choosedList.includes(e.id)
                // })

                // setCategoryList(availableList?.map((e) => ({
                //     component: <Option key={e.id} value={e.id}>
                //         {e.name}
                //     </Option>,
                //     disabled: false,
                //     value: e.id,
                //     label: e.name
                // })))
                setTotalItems(result?.data?.total_items)
            }
        }

        const removeItem = (event, e) => {
            event.preventDefault();
            const index = value.findIndex((f) => f.value === e)
            value.splice(index, 1)
            const cloneSongList = songList.map((f) => {
                if (f.value === e) {
                    f.disabled = false
                }
                return f
            })
            setSongList(cloneSongList)
            onChange(value);
        }
        const onscroll = async (event) => {
            if ((event.currentTarget.scrollTop + event.currentTarget.clientHeight) >= event.currentTarget.scrollHeight &&
                (page * limit) < totalItems && !loading) {
                songList.push(<Option key={'loading'} value={'loading'} disabled>
                    <Spin className="absolute left-[50%]" />
                </Option>)
                setSongList([...songList])
                setLoading(true)
                setTimeout(async () => {
                    const data = await apiFactory.categoryApi.getList({
                        per: limit,
                        page: page + 1,
                    })
                    if (data) {
                        songList.pop()
                        const newCategoryList = songList.concat(data?.data?.items.map((e) => ({
                            component: <Option key={e.id} value={e.id}>
                                {e.name}
                            </Option>,
                            disabled: false,
                            value: e.id,
                            label: e.name
                        })))
                        setSongList(newCategoryList)
                        setPage(page + 1)
                        setTotalItems(data?.data?.total_items)
                    }
                    setLoading(false)
                }, 500)

            }
        }
        useEffect(() => {
            fetchSongList()
        }, [])
        return <>
            <Row>
                <Col span={11}>
                    <Select
                        // onChange={(e) => chooseCategory(e)}
                        onPopupScroll={onscroll}
                        onChange={(e) => {
                            const category = songList.find((f) => f.value === e)
                            value.push(category)
                            const cloneSongList = songList.map((f) => {
                                if (f.value === e) f.disabled = true
                                return f;
                            })

                            setSongList(cloneSongList)
                            onChange([...value]);
                        }}
                        disabled={different.type === 'view'}
                        value=''
                    >
                        {songList.filter(e => e.disabled === false).map(e => e.component)}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="patient-list">
                        {value?.map((e) => {
                            return <Tag
                                color={'blue'}
                                closable={different.type !== 'view'}
                                onClose={(event) => removeItem(event, e.value)}
                                // style={{ marginRight: 3 }}
                                className='h-[30px] text-[15px] mt-[5px]'
                            >
                                {e.label}
                            </Tag>
                        })}
                    </div>
                </Col>
            </Row>
        </>

    }
    const fetchData = async () => {
        if (param.id) {
            const result = await apiFactory.customerApi.getById(param.id)
            if (result.data) {
                setInitialData({
                    name: result.data.name,
                    username: result?.data?.username,
                    img: {
                        url: result.data.image,
                        file: null
                    },
                    email: result?.data?.email,
                    phone: result?.data?.phone,
                    balance: result?.data?.balance,
                    changePassword: false,
                    favorite: result?.data?.favorite?.map(e => ({
                        value: e.id,
                        label: e.name
                    })),
                })

                form.setFieldsValue({
                    name: result.data.name,
                    username: result?.data?.username,
                    img: {
                        url: result.data.image,
                        file: null
                    },
                    email: result?.data?.email,
                    phone: result?.data?.phone,
                    balance: result?.data?.balance,
                    changePassword: false,
                    favorite: result?.data?.favorite?.map(e => ({
                        value: e.id,
                        label: e.name
                    })),
                })
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return <div className='category-detail'>
        <Form
            initialValues={initalData}
            onFinish={onFinish}
            form={form}
            layout="vertical"

        >
            <Row>
                <Col span={11}>
                    <Form.Item label="Tên người dùng"
                        name="name"
                    >
                        <Input disabled={different.type === 'view'} />
                    </Form.Item>

                    <Form.Item label="Tên đăng nhập"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <Input disabled={different.type === 'view'} />
                    </Form.Item>
                    {
                        different.type === 'edit' && <Form.Item name="changePassword">
                            <Radio.Group
                                className='mt-[20px] mb-[18px]'
                                onChange={(e) => setInitialData({ ...initalData, changePassword: e.target.value })}
                            >
                                <Radio value={false}>Giữ nguyên mật khẩu</Radio>
                                <Radio value={true}>Thay đổi mật khẩu</Radio>
                            </Radio.Group>
                        </Form.Item>
                    }
                    {(different.type === 'add' || initalData.changePassword) &&
                        <>
                            <Form.Item label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc!',
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label="Xác nhận mật khẩu"
                                name="rePassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc!',
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>
                        </>
                    }
                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Form.Item
                        label="Ảnh đại diện"
                        name="img"
                        className="mb-[8px]"
                        required={false}
                    >
                        <CoverImage />
                    </Form.Item>
                    <Form.Item label="Số dư tài khoản"
                        name="balance"
                    >
                        <NumericFormat
                            onKeyPress={(event) => {
                                if (!/[0-9.]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            // value={value?.unitPrice} disabled={difference.type === 'view' || !value?.unitPriceSetting}
                            // onChange={onChangeUnitPrice} 
                            disabled={different.type === 'view'}
                            customInput={Input}
                            thousandsGroupStyle="thousand" thousandSeparator="," decimalScale={2}
                        />
                    </Form.Item>
                    <Form.Item label="Địa chỉ email"
                        name="email"
                    >
                        <Input type='email' disabled={different.type === 'view'} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại"
                        name="phone"
                    >
                        <NumericFormat
                            onKeyPress={(event) => {
                                if (!/[0-9.]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            // value={value?.unitPrice} disabled={difference.type === 'view' || !value?.unitPriceSetting}
                            // onChange={onChangeUnitPrice} 
                            disabled={different.type === 'view'}
                            customInput={Input}
                            maxLength={15}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label="Danh sách bài hát ưa thích"
                        name="favorite">
                        <AsyncSelectFavoriteSong />
                    </Form.Item>
                </Col>
            </Row>
            <StickyFooter >
                <div className="flex justify-between gap-[5px]">
                    <Button className='bg-[#868e96] text-white ml-[230px]' onClick={() => navigate('/customer/list')}>Quay lại</Button>
                    <div className='flex gap-[5px]'>
                        {different.type !== 'view' && <Button className='ml-auto bg-[#007dce] text-white' htmlType="submit">Lưu</Button>}
                        {different.type === 'view' && <Button className='ml-auto bg-[#aec57d] text-white' onClick={() => navigate(`/customer/edit/${param.id}`)}>Sửa</Button>}
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

export default CustomerDetail
