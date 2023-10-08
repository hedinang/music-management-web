
import React, { useEffect, useState } from 'react';

import './style.scss';
import { Button, Input, Pagination, Select, Table } from 'antd';
import { AiFillCopy } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';

import { DeleteOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import { formatTime } from '../../utils/formatTime';
import { useNavigate } from 'react-router-dom';
import apiFactory from '../../api';

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
                        <Input
                            className="column-input-search"
                            placeholder={'Tìm kiếm'}
                        // value={querySearch.member_code}
                        // onChange={(e) => onSearch('member_code', e.target.value)}
                        />
                    </div>
                ),
                dataIndex: 'index',
                render: (value, record) => <div className='text-center'>{record.index}</div>,
                width: 150
            },
        ],
    },
    {
        title: 'Tên',
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
                width: 500

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
                width: 500
            },
        ],
    },

];
function AuthorList() {
    const [authorList, setauthorList] = useState([])
    const navigate = useNavigate()
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [copyId, setCopyId] = useState(-1);

    const [disableCopy, setDisableCopy] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [disableDelete, setDisableDelete] = useState(true);

    const rowSelection = {
        columnWidth: 15,
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
    };

    const fetchData = async () => {
        const result = await apiFactory.authorApi.getList({
            limit: limit,
            page: page
        })

        setauthorList(result?.data?.items?.map((e, i) => (
            {
                id: e?.id,
                index: (page - 1) * limit + i + 1,
                name: e?.name,
                createdAt: formatTime(e?.createdAt),
            }
        )))
        
        setTotalItems(result?.data?.total_items)
    }

    const onDoubleClick = (record) => {
        navigate(`/author/${record.id}`);
    };

    useEffect(() => {
        fetchData()
    }, [limit, page])

    return <div className='author-list'>
        <div>
            <div className='button-header'>
                <Button shape="round"
                    type="primary"
                    onClick={() => navigate('/author/add')}
                    className='bg-[#007dce] text-[white] flex items-center'
                >
                    <FileAddOutlined className="mr-1" />  Thêm
                </Button>
                <Button className="bg-[#007dce] text-[white] flex items-center" shape="round" type="primary"
                // disabled={disableCopy} onClick={onCopy}
                >
                    <AiFillCopy className="mr-1" /> Copy
                </Button>
                <Button
                    className="flex items-center"
                    shape="round"
                    type="primary"
                    danger
                    icon={<DeleteOutlined className="mr-1" />}
                // disabled={disableDelete}
                // onClick={onDeleteModal}
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
                dataSource={authorList}
                columns={columns}
                pagination={{
                    defaultPageSize: 10,
                    pageSizeOptions: [5, 10],
                    pageSize: limit,
                    position: ['bottomCenter'],
                    style: { display: 'none' },
                }}
                // scroll={{ y: 'calc(100vh - 388px)', x: 2000 }}
                onRow={(record) => ({
                    onDoubleClick: () => {
                        onDoubleClick(record);
                    },
                })}
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
                    //  onChange={handleChangePage} 
                    total={totalItems} />
            </div>
        </div>

    </div>

}

export default AuthorList
