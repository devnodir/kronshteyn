import { Modal, Upload, UploadProps } from 'antd'
import React, { Fragment, useState } from 'react'
import { ISetState } from '@/types/helper';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '@/utils/methods';

interface Props {
	fileList: any[],
	setFileList: ISetState<any[]>,
	length?: number
}

const UploadImage: React.FC<Props & UploadProps> = ({ fileList, setFileList, length, children, ...props }) => {

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const handlePreview = async (file: UploadFile) => {
		console.log(file);
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};

	const handleCancel = () => setPreviewOpen(false);


	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Yuklash</div>
		</div>
	);

	return (
		<Fragment>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onChange={({ fileList }) => setFileList(fileList)}
				beforeUpload={() => false}
				onPreview={handlePreview}
				accept="image/*"
				{...props}
			>
				{children || ((length && fileList.length >= length) ? null : uploadButton)}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</Fragment>
	)
}

export default UploadImage