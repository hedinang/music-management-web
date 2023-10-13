
import React, { useEffect, useState } from 'react';

import './style.scss';
import { Button, Input, Modal, Pagination, Select, Spin, Table } from 'antd';
import { AiFillCopy } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';

import { DeleteOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import { formatTime } from '../../utils/formatTime';
import { useNavigate } from 'react-router-dom';
import apiFactory from '../../api';
import { toast } from 'react-toastify';


const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        // sorter: (a,b) => a.ss_code?.localeCompare(b.ss_code),
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        {/* <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        /> */}
                    </div>
                ),
                dataIndex: 'index',
                render: (value, record) => <div className='text-center'>{record.index}</div>,
                width: 40
            },
        ],
    },
    {
        title: 'Tên người dùng',
        dataIndex: 'name',
        key: 'name',
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'name',
                render: (value, record) => record.name,
                width: 200

            },
        ],
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'username',
                render: (value, record) => record.username,
                width: 200

            },
        ],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'email',
                render: (value, record) => record.email,
                width: 200

            },
        ],
    },
    {
        title: 'Số dư tài khoản',
        dataIndex: 'balance',
        key: 'balance',
        // sorter: (a,b) => a.ss_code?.localeCompare(b.ss_code),
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'balance',
                render: (value, record) => record.balance,
                width: 150
            },
        ],
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        children: [
            {
                title: (
                    <div draggable onDragStart={(e) => e.preventDefault()} className="search-param-list-data">
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'createdAt',
                render: (value, record) => <div className='text-center'>{record.createdAt}</div>,
                width: 300
            },
        ],
    },

];
function CustomerList() {
    const navigate = useNavigate()
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [copyId, setCopyId] = useState(-1);

    const [disableCopy, setDisableCopy] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [disableDelete, setDisableDelete] = useState(true);
    const [customerList, setCustomerList] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const rowSelection = {
        columnWidth: '30px',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length === 1) {
                setDisableCopy(false);
                setCopyId(selectedRows[0].key);
            } else {
                setDisableCopy(true);
            }
            if (selectedRows.length > 0) {
                setDisableDelete(false);
            } else {
                setDisableDelete(true);
            }
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows.map((e) => e.key));
        },
        preserveSelectedRowKeys: true,
    }

    const fetchData = async () => {
        const result = await apiFactory.customerApi.getList({ limit, page })
        setCustomerList(result?.data?.items?.map((e, i) => (
            {
                key: e?.id,
                index: (page - 1) * limit + i + 1,
                username: e?.username,
                createdAt: formatTime(e?.createdAt),
                balance: e?.balance ? e?.balance : 0
            }
        )))
        setTotalItems(result?.data?.total_items)
    }

    const onDelete = async () => {
        setLoading(true)
        const result = await apiFactory.customerApi.delete(selectedRowKeys)
        setLoading(false)
        if (result.status === 200) {
            toast.success('Xoá thành công')
            setDeleteModal(false)
            fetchData()
        } else {
            toast.error(result?.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, limit])

    return <div className='category-list'>
        <div className='button-header'>
            <Button shape="round"
                type="primary"
                onClick={() => navigate('/customer/add')}
                className='bg-[#007dce] text-[white] flex items-center'
            >
                <FileAddOutlined className="mr-1" />  Thêm
            </Button>
            <Button className="bg-[#007dce] text-[white] flex items-center" shape="round" type="primary"
                // disabled={disableCopy} onClick={onCopy}
                disabled={disableCopy}
            >
                <AiFillCopy className="mr-1" /> Copy
            </Button>
            <Button
                className="flex items-center"
                shape="round"
                type="primary"
                danger
                icon={<DeleteOutlined className="mr-1" />}
                onClick={() => setDeleteModal(true)}
                disabled={disableDelete}
            >
                Xoá
            </Button>

            <Button
                className='ml-[auto] flex items-center bg-[#007dce] text-[white]'
                shape="round"
                type="primary"
            // icon={<SearchIcon className="mr-2" />}
            // onClick={onClear}
            >
                <FiRefreshCcw className="mr-2" /> Làm mới
            </Button>
            <Button
                className='bg-[#007dce] text-[white] flex items-center'
                shape="round"
                type="primary"
                icon={<SearchOutlined className="mr-1" />}
            // onClick={handleSearch}
            >
                Tìm kiếm
            </Button>
        </div>
        <Table
            dataSource={customerList}
            columns={columns}
            pagination={{
                defaultPageSize: 10,
                pageSizeOptions: [5, 10],
                pageSize: limit,
                position: ['bottomCenter'],
                style: { display: 'none' },
            }}
            scroll={{ y: 'calc(100vh - 150px)', x: 2000 }}
            // onRow={(record: any) => ({
            //     onDoubleClick: () => {
            //         onDoubleClick(record);
            //     },
            // })}
            // rowSelection={column.length > 0 ? { ...rowSelection } : null}
            showSorterTooltip={false}
            bordered
            rowSelection={columns.length > 0 ? { ...rowSelection } : null}

        />
        <div className="flex items-center justify-end wrapper-pagination mt-5">
            <Select
                defaultValue={limit}
                value={limit}
                // onChange={handleChangePagePerSizes}
                options={[
                    {
                        value: 10,
                        label: '10',
                    },
                    {
                        value: 20,
                        label: '20',
                    },
                    {
                        value: 30,
                        label: '30',
                    },
                ]}
            />
            <Pagination current={page} showSizeChanger={false} pageSize={limit}
                onChange={(e) => setPage(e)}
                total={totalItems} />
        </div>
        <Modal open={deleteModal} closable={false} footer={null}>
            <p>Bạn có chắc chắn muốn xoá không?</p>
            {loading ? <Spin className="mt-[20px] flex justify-center gap-[10px]" /> :
                <div className='mt-[20px] flex justify-center gap-[10px]'>
                    <Button className='bg-[#24dc22] text-white' onClick={() => setDeleteModal(false)}>Huỷ</Button>
                    <Button className='bg-[#ff4d4f] text-white' onClick={onDelete}>Xoá</Button>
                </div>
            }
        </Modal>
    </div>

}

export default CustomerList
