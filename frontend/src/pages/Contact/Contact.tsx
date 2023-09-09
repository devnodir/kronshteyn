import { Button, Space, Table, Tag, message } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteConfirm from '@/components/DeleteConfirm'
import { useNavigate } from 'react-router-dom'
import useApi from '@/hooks/useApi'
import { CONTACT_DELETE, CONTACT_GET_ALL } from '@/utils/variables'
import { imageURL, mapTableData } from '@/utils/methods'
import moment from 'moment'
import useApiMutationID from '@/hooks/useApiMutationID'

const Contact: React.FC = () => {

	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	const { data, isLoading, refetch } = useApi(CONTACT_GET_ALL)
	const { mutate, isLoading: deleteLoad } = useApiMutationID("delete", CONTACT_DELETE)

	useEffect(() => {
		console.log(isLoading);
	}, [isLoading])

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
			title: 'Ismi',
			key: 'name',
			dataIndex: 'informations',
			render: (informations: any) => informations.name
		},
		{
			title: 'Familiyasi',
			key: 'familiya',
			dataIndex: 'informations',
			render: (informations: any) => informations.familiya
		},
		{
			title: 'Telefon raqami',
			key: 'telefon',
			dataIndex: 'informations',
			render: (informations: any) => informations.telefon
		},
		{
			title: 'Telefon raqami',
			key: 'email',
			dataIndex: 'informations',
			render: (informations: any) => informations.email
		},
		{
			title: 'File',
			key: 'file',
			dataIndex: 'files',
			render: (files: any) => (
				files ? <a href={imageURL(files.path)} target="_blank"><EyeOutlined /> Ko'rish</a> : "-"
			)
		},
		{
			title: 'Vaqti',
			key: 'date',
			dataIndex: 'date',
			render: (val: any) => moment(val).format("DD.MM.YYYY")
		},
		{
			title: "O'chirish",
			dataIndex: '_id',
			key: '_id',
			render: (id: string) => (
				<Space>
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

export default Contact