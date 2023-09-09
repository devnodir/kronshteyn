import TextEditorField from '@/components/Form/TextEditorField'
import TextField from '@/components/Form/TextField'
import UploadImage from '@/components/UploadImage'
import useApi from '@/hooks/useApi'
import useApiMutation from '@/hooks/useApiMutation'
import { SERVICE_CREATE, SERVICE_GET_ONE, SERVICE_UPDATE } from '@/utils/variables'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Row, message } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import useApiMutationID from '@/hooks/useApiMutationID'
import { imageURL } from '@/utils/methods'

interface IFormData {
	titleRu: string
	titleUz: string
	textRu: string
	textUz: string
}

const ServicesAction: React.FC = () => {

	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate()

	const { id } = useParams()

	const { handleSubmit, control, reset } = useForm<IFormData>()

	const [fileList, setFileList] = useState<any[]>([])

	const { data } = useApi(`${SERVICE_GET_ONE}/${id}`, { enabled: Boolean(id), suspense: true, keepPreviousData: false })
	const { mutate: mutateCreate, isLoading: createLoading } = useApiMutation(SERVICE_CREATE)
	const { mutate: mutateUpdate, isLoading: updateLoading } = useApiMutationID("put", SERVICE_UPDATE)

	useEffect(() => {
		if (data) {
			reset({
				"titleRu": data.ru.title,
				"titleUz": data.uz.title,
				"textRu": data.ru.text,
				"textUz": data.uz.text,
			})
			if (data.images) {
				setFileList([{
					uid: id,
					name: data.images.name,
					url: imageURL(data.images.path),
					isUploaded: true,
				}])
			}
		}
	}, [data])

	const submit = (data: IFormData) => {
		if (!fileList.length) {
			messageApi.warning("Kamida 1 rasm qo'shing")
		} else {
			const formData = new FormData()
			Object.entries(data).forEach((item) => {
				formData.append(item[0], item[1])
			});
			fileList.forEach((file) => {
				if (!file.isUploaded) formData.append("file", file.originFileObj)
			})
			const mutateData = id ? { id, data: formData } : formData
			const mutateFunc = id ? mutateUpdate : mutateCreate
			mutateFunc(mutateData, {
				onSuccess: () => {
					messageApi.success(id ? "Uzgartirildi" : "Yaratildi")
					navigate(-1)
				},
				onError: ({ message }) => {
					if (message) messageApi.error(message)
				}
			})
		}
	}

	return (
		<Fragment>
			{contextHolder}
			<div className="page-head">
				<Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/services")}>Ortga qaytish</Button>
			</div>
			<div className="page">
				<form onSubmit={handleSubmit(submit)}>
					<Row gutter={[24, 24]}>
						<Col span={12}>
							<TextField
								label='Title Uz'
								control={control}
								name="titleUz"
								required
							/>
						</Col>
						<Col span={12}>
							<TextField
								label='Title Ru'
								control={control}
								name="titleRu"
								required
							/>
						</Col>
						<Col span={12}>
							<TextEditorField
								label='Text Uz'
								control={control}
								name="textUz"
							// required
							/>
						</Col>
						<Col span={12}>
							<TextEditorField
								label='Text Ru'
								control={control}
								name="textRu"
							// required
							/>
						</Col>
						<Col span={24}>
							<UploadImage
								fileList={fileList}
								setFileList={setFileList}
								length={1}
							/>
						</Col>
					</Row>
					<div style={{ maxWidth: 300, margin: "auto", marginTop: 32 }}>
						<Button loading={createLoading || updateLoading} type='primary' size='large' block htmlType="submit">Saqlash</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default ServicesAction