import { Button, Space, Table, Tag, message } from 'antd'
import React, { Fragment, useMemo, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeFilled, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteConfirm from '@/components/DeleteConfirm'
import { useNavigate } from 'react-router-dom'
import useApi from '@/hooks/useApi'
import { PRODUCTION_DELETE, PRODUCTION_GET_ALL } from '@/utils/variables'
import { imageURL, mapTableData } from '@/utils/methods'
import moment from 'moment'
import useApiMutationID from '@/hooks/useApiMutationID'
import ProdMaterials from './Materials'

const Production: React.FC = () => {

	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	const { data, isLoading, refetch } = useApi(`${PRODUCTION_GET_ALL}/mater`, { placeholderData: [] })
	const { mutate, isLoading: deleteLoad } = useApiMutationID("delete", PRODUCTION_DELETE)

	const [modal, setModal] = useState(false)
	const [materials, setMaterials] = useState<any[]>([])

	const redirect = (id?: any) => {
		if (id) navigate(`/production/update/${id}`)
		else navigate("/production/create")
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
			render: (val: any[]) => (
				val?.length > 0 && <img src={imageURL(val[0]?.filePath)} style={{ height: "80px", borderRadius: "8px" }} alt="" />
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
			title: 'Materiallar',
			key: 'materials',
			dataIndex: 'materials',
			render: (materials: any) => (
				<Button type="link" icon={<EyeOutlined />} onClick={() => {
					setModal(true); setMaterials(materials)
				}}>Ko'rish ({materials.length})</Button>
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
			{modal && <ProdMaterials setOpen={setModal} data={materials} />}
		</Fragment>
	)
}

export default Production