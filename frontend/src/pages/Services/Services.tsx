import { Button, Space, Table, Tag, message } from 'antd'
import React, { Fragment, useMemo } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteConfirm from '@/components/DeleteConfirm'
import { useNavigate } from 'react-router-dom'
import useApi from '@/hooks/useApi'
import { SERVICE_DELETE, SERVICE_GET_ALL } from '@/utils/variables'
import { imageURL, mapTableData } from '@/utils/methods'
import moment from 'moment'
import useApiMutationID from '@/hooks/useApiMutationID'

const Services: React.FC = () => {

	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	const { data, isLoading, refetch } = useApi(SERVICE_GET_ALL, { placeholderData: [] })
	const { mutate, isLoading: deleteLoad } = useApiMutationID("delete", SERVICE_DELETE)

	const redirect = (id?: any) => {
		if (id) navigate(`/services/update/${id}`)
		else navigate("/services/create")
	}

	const deleteItem = (id: string) => {
		mutate({ id }, {
			onSuccess: () => {
				refetch()
				messageApi.success("O'chirildi")
			},
			onError: ({ message }) => {
				if (message) messageApi.error(message)
			}
		})
	}

	const columns = [
		{
			title: 'NO',
			key: 'no',
			dataIndex: 'no',
		},
		{
			title: 'Rasm',
			key: 'images',
			dataIndex: 'images',
			render: (val: any) => (
				<img src={imageURL(val.path)} style={{ height: "80px", borderRadius: "8px" }} alt="" />
			)
		},
		{
			title: 'Title UZ',
			key: 'uz',
			dataIndex: 'uz',
			render: (val: any) => (
				<p style={{ maxWidth: 300 }}>{val.title}</p>
			)
		},
		{
			title: 'Title RU',
			key: 'ru',
			dataIndex: 'ru',
			render: (val: any) => (
				<p style={{ maxWidth: 300 }}>{val.title}</p>
			)
		},
		{
			title: 'Vaqti',
			key: 'date',
			dataIndex: 'date',
			render: (val: any) => moment(val).format("DD.MM.YYYY")
		},
		{
			title: 'Tahrirlash',
			dataIndex: '_id',
			key: '_id',
			render: (id: string) => (
				<Space>
					<Button icon={<EditOutlined />} shape="circle" onClick={() => redirect(id)} />
					<DeleteConfirm
						onConfirm={() => deleteItem(id)}
						button={(showModal) => <Button icon={<DeleteOutlined />} type="primary" danger shape="circle" onClick={showModal} />}
					/>
				</Space>
			)
		},
	];

	return (
		<Fragment>
			{contextHolder}
			<div className='page'>
				<div className="page-head">
					<div />
					<Button icon={<PlusOutlined />} type="primary" onClick={() => redirect()}>Yaratish</Button>
				</div>
				<Table
					columns={columns}
					dataSource={mapTableData(data || [])}
					pagination={false}
					loading={isLoading || deleteLoad}
					scroll={{ x: "max-content" }}
				/>
			</div>
		</Fragment>
	)
}

export default Services