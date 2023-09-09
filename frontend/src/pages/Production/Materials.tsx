import { ISetState } from '@/types/helper'
import { imageURL, mapTableData } from '@/utils/methods'
import { Modal, Table } from 'antd'
import moment from 'moment'
import React from 'react'

interface Props {
	setOpen: ISetState<boolean>
	data: any[]
}

const ProdMaterials: React.FC<Props> = ({ setOpen, data }) => {


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
			title: 'Uz',
			key: 'translationsUz',
			dataIndex: 'translations',
			render: (translations: any) => (
				translations.map((item: any, index: number) => (
					<div key={index}>
						<span>{item.uz.key}</span>
						<span>---</span>
						<span>{item.uz.value}</span>
					</div>
				))
			)
		},
		{
			title: 'Ru',
			key: 'translationsRu',
			dataIndex: 'translations',
			render: (translations: any) => (
				translations.map((item: any, index: number) => (
					<div key={index}>
						<span>{item.ru.key}</span>
						<span>---</span>
						<span>{item.ru.value}</span>
					</div>
				))
			)
		},
		{
			title: 'Vaqti',
			key: 'date',
			dataIndex: 'date',
			render: (val: any) => moment(val).format("DD.MM.YYYY")
		}
	];

	return (
		<Modal
			title="Materiallar"
			open={true}
			onCancel={() => setOpen(false)}
			footer={null}
			centered
			width={900}
		>
			<Table
				columns={columns}
				dataSource={mapTableData(data)}
				pagination={false}
				scroll={{ x: "max-content" }}
			/>
		</Modal>
	)
}

export default ProdMaterials