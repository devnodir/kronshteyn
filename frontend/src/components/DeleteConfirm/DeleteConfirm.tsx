import { IReactNode, IVoid } from '@/types/helper'
import { Modal, Typography } from 'antd'
import React, { Fragment, useState } from 'react'

interface Props {
	button: (showModal: IVoid) => IReactNode
	onConfirm: IVoid
}

const DeleteConfirm: React.FC<Props> = ({ button, onConfirm }) => {

	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const onOk = () => {
		hideModal()
		onConfirm()
	}

	return (
		<Fragment>
			{button(showModal)}
			<Modal
				title="Diqqat!!!"
				open={open}
				onOk={onOk}
				onCancel={hideModal}
				okText="O'chirish"
				cancelText="Bekor qilish"
				centered
				okButtonProps={{ danger: true }}
			>
				<Typography.Text style={{ marginBottom: 50, display: "block" }}>Ma'lumotni o'chirib yuborishga rozimisiz?</Typography.Text>
			</Modal>
		</Fragment>
	)
}

export default DeleteConfirm