import React, { Fragment } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Typography, Upload, UploadProps } from 'antd';
import { Controller } from 'react-hook-form';

const { Dragger } = Upload;

interface Props {
	control: any
	name: string
	required?: boolean
}

const FileField: React.FC<Props & UploadProps> = ({ control, name, required }) => (
	<Controller
		render={({
			field: { onChange, value, name, ref },
			fieldState: { error },
		}) => (
			<Fragment>
				<Dragger
					multiple={false}
					showUploadList={false}
					onChange={(val) => onChange(val.file)}
					ref={ref}
					name={name}
					beforeUpload={() => false}
				>
					<p className="ant-upload-drag-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						{value?.name}<InboxOutlined />
					</p>
					<p className="ant-upload-text">Faylni tanlash uchun bu yerni bosing</p>
					<p className="ant-upload-hint">
						Siz bu orqali faqat belgilangan fayl turlarini yuklashingiz mumkin.
					</p>
				</Dragger>
				{error && <Typography.Text style={{ fontSize: 12 }} type="danger">{error.message}</Typography.Text>}
			</Fragment >
		)}
		name={name}
		control={control}
		rules={{ required: required }}
	/>
);

export default FileField;