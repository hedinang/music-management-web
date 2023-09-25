
import React, { useCallback, useEffect, useState } from 'react';

import './style.scss';
import { Button, Col, Form, Input, Row, Select, Spin, Tag } from 'antd';
import StickyFooter from '../../components/stickyFooter/StickyFooter';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import { FaMusic } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import apiFactory from '../../api';
import { Option } from "antd/es/mentions";
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';





async function getDuration(file) {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
        const audio = document.createElement("audio");
        audio.muted = true;
        const source = document.createElement("source");
        source.src = url; //--> blob URL
        audio.preload = "metadata";
        audio.appendChild(source);
        audio.onloadedmetadata = function () {
            resolve(audio.duration)
        };
    });
}



function SongDetail({ different }) {
    const param = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [initalData, setInitialData] = useState({
        name: '',
        author: '',
        category: [],
        img: {
            url: '',
            file: null
        },
        song: {
            url: '',
            file: null
        },
        unitPrice: 0,
        totalPrice: 0,
        duration: 0

    })

    const onFinish = async (values) => {
        let result
        // if (different.type === 'edit') {
        //     result = await apiFactory.songApi.update({
        //         id: param.id,
        //         name: values?.musicType.trim(),
        //         file: values?.img?.file,
        //         origin_url: values?.img?.url
        //     })

        // }
        if (different.type === 'add') {
            // result = await apiFactory.songApi.create({
            //     name: values?.name,
            //     author: values?.author,
            //     category: values?.category.map(e => e.value),
            //     img: values?.img.file,
            //     audio: values?.song.file,
            //     duration: initalData.duration,
            //     unit_price: Number(values?.unitPrice?.replaceAll(',', ''))
            // })
            console.log('aaa')
        }

        if (result?.status === 200) {
            if (different.type === 'add') {
                toast.success('Tạo danh mục nhạc thành công')
            }

            if (different.type === 'edit') {
                toast.success('Cập nhật danh mục nhạc thành công')
            }

            navigate('/song/list')
        } else {
            toast.error(result?.message)
        }
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
                accept="image/*" disabled={different.type === 'view'}
            />
            <div className="flex flex-col items-center justify-center">
                {value.url ? (
                    <div className='flex flex-col justify-center items-center gap-[5px]'>
                        <img src={value.url} alt="preview" className="w-full h-[100px] object-cover" />
                        {different.type !== 'view' && value.url && <DeleteFilled className='text-[red]' onClick={removeImg} />}
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
        const uploadMusic = async (e) => {
            const file = e.target.files[0];
            const duration = await getDuration(file)
            let totalPrice = 0
            if (initalData?.unitPrice) {
                totalPrice = Math.round(duration / 60) * initalData?.unitPrice
            }
            setInitialData({ ...initalData, duration: Math.round(duration / 60), totalPrice: totalPrice })
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

        return <div className='flex flex-row items-center gap-[10px]'>
            <label
                htmlFor="music"
                className="w-[100px] h-[100px] bg-white border-[#5A96D7] boder-[1px] rounded-xl border-solid flex items-center justify-center pl-3 pr-3 cursor-pointer"
                style={{ border: '1px solid #5A96D7' }}>
                <input type="file" id="music" className="hidden" style={{ display: 'none' }}
                    accept="audio/*, video/*" onChange={uploadMusic} disabled={different.type === 'view'} />
                <div className="flex flex-row items-center justify-center gap-[5px]">
                    <div className='text-[30px]'>+</div>
                    <FaMusic size={30} />
                </div>
            </label>
            {value.url && <audio controls={true} src={value.url} />}
            {different.type !== 'view' && value.url && <DeleteFilled className='text-[red]' onClick={removeImg} />}
        </div>
    }, [initalData])

    const onChangeUnitPrice = (e) => {
        const unitPrice = Number(e.target.value.replaceAll(',', ''))
        const totalPrice = initalData.duration * unitPrice
        setInitialData({ ...initalData, unit_price: unitPrice, totalPrice: totalPrice })
    }

    const fetchData = async () => {
        if (param.id) {
            const result = await apiFactory.songApi.getById(param.id)
            if (result.data) {
                setInitialData({
                    name: result.data.name,
                    author: result.data.author,
                    category: result?.data?.category?.map(e => ({
                        value: e.id,
                        label: e.name
                    })),
                    img: {
                        url: result.data.img_url,
                        file: null
                    },
                    song: {
                        url: result.data.audio_url,
                        file: null
                    },
                    unit_price: result.data.unit_price,
                    totalPrice: result.data.duration * result.data.unit_price,
                    duration: result.data.duration
                })

                form.setFieldsValue({
                    name: result.data.name,
                    author: result.data.author,
                    category: result?.data?.category?.map(e => ({
                        value: e.id,
                        label: e.name
                    })),
                    img: {
                        url: result.data.img_url,
                        file: null
                    },
                    song: {
                        url: result.data.audio_url,
                        file: null
                    },
                    unitPrice: result.data.unit_price,
                    totalPrice: result.data.duration * result.data.unit_price,
                    duration: result.data.duration
                })
            }
        }

    }

    const AsyncSelect = ({ value, onChange }) => {
        const [limit, setLimit] = useState(10);
        const [page, setPage] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        // const [currentTotal, setCurrentTotal] = useState(0)
        const [loading, setLoading] = useState(false)
        const [categoryList, setCategoryList] = useState([])
        const fetchCategoryList = async () => {
            const result = await apiFactory.categoryApi.getList({
                per: limit,
                page: page,
            })
            if (result?.data?.items) {
                const choosedList = value.map(e => e.value)

                setCategoryList(result?.data?.items?.map(e => {
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
            const clonePatientList = categoryList.map((f) => {
                if (f.value === e) {
                    f.disabled = false
                }
                return f
            })
            setCategoryList(clonePatientList)
            onChange(value);
        }
        const onscroll = async (event) => {
            if ((event.currentTarget.scrollTop + event.currentTarget.clientHeight) >= event.currentTarget.scrollHeight &&
                (page * limit) < totalItems && !loading) {
                categoryList.push(<Option key={'loading'} value={'loading'} disabled>
                    <Spin className="absolute left-[50%]" />
                </Option>)
                setCategoryList([...categoryList])
                setLoading(true)
                setTimeout(async () => {
                    const data = await apiFactory.categoryApi.getList({
                        per: limit,
                        page: page + 1,
                    })
                    if (data) {
                        categoryList.pop()
                        const newCategoryList = categoryList.concat(data?.data?.items.map((e) => ({
                            component: <Option key={e.id} value={e.id}>
                                {e.name}
                            </Option>,
                            disabled: false,
                            value: e.id,
                            label: e.name
                        })))
                        setCategoryList(newCategoryList)
                        setPage(page + 1)
                        setTotalItems(data?.data?.total_items)
                    }
                    setLoading(false)
                }, 500)

            }
        }
        useEffect(() => {
            fetchCategoryList()
        }, [])
        return <>
            <Select
                // onChange={(e) => chooseCategory(e)}
                onPopupScroll={onscroll}
                onChange={(e) => {
                    const category = categoryList.find((f) => f.value === e)
                    value.push(category)
                    const cloneCategoryList = categoryList.map((f) => {
                        if (f.value === e) f.disabled = true
                        return f;
                    })

                    setCategoryList(cloneCategoryList)
                    onChange([...value]);
                }}
                value=''
            >
                {categoryList.filter(e => e.disabled === false).map(e => e.component)}
            </Select>
            <div className="patient-list">
                {value?.map((e) => {
                    return <Tag
                        color={'blue'}
                        closable
                        onClose={(event) => removeItem(event, e.value)}
                        // style={{ marginRight: 3 }}
                        className='h-[30px] text-[15px] mt-[5px]'
                    >
                        {e.label}
                    </Tag>
                })}
            </div>
        </>

    }

    useEffect(() => {
        fetchData()
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
                    <Form.Item label="Tên bài hát"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <Input disabled={different.type === 'view'} />
                    </Form.Item>

                    <Form.Item label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <Input disabled={different.type === 'view'} />
                    </Form.Item>

                    <Form.Item label="Danh mục"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}>
                        <AsyncSelect />

                    </Form.Item>

                    <Row>
                        <Col span={11}>
                            <Form.Item label="Giá / 1 phút (VNĐ)" name="unitPrice">
                                <NumericFormat
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    // value={value?.unitPrice} disabled={difference.type === 'view' || !value?.unitPriceSetting}
                                    onChange={onChangeUnitPrice}
                                    disabled={different.type === 'view'}
                                    customInput={Input}
                                    thousandsGroupStyle="thousand" thousandSeparator="," decimalScale={2}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Giá cả bài (VNĐ)"
                            // name="totalPrice"
                            >
                                <NumericFormat
                                    disabled
                                    customInput={Input}
                                    thousandsGroupStyle="thousand" thousandSeparator="," decimalScale={2}
                                    value={initalData.totalPrice}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Form.Item
                        label="Ảnh cover"
                        name="img"
                        className="mb-[8px]"
                        required={false}
                    >
                        <CoverImage />
                    </Form.Item>

                    <Form.Item
                        label="File nhạc"
                        name="song"
                        className="mb-[8px]"
                        required={true}
                    >
                        <FileMusic />
                    </Form.Item>
                </Col>

            </Row>


            <StickyFooter >
                <div className="flex justify-between gap-[5px]">
                    <Button className='bg-[#868e96] text-white ml-[230px]' onClick={() => navigate('/song/list')}>Quay lại</Button>
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

export default SongDetail
