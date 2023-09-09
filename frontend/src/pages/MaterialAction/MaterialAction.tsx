import TextEditorField from '@/components/Form/TextEditorField'
import TextField from '@/components/Form/TextField'
import UploadImage from '@/components/UploadImage'
import useApi from '@/hooks/useApi'
import useApiMutation from '@/hooks/useApiMutation'
import { MATERIAL_CREATE, MATERIAL_GET_ONE, MATERIAL_UPDATE, PRODUCTION_GET_ALL } from '@/utils/variables'
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography, message } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import useApiMutationID from '@/hooks/useApiMutationID'
import { imageURL, parseOptions } from '@/utils/methods'
import SelectField from '@/components/Form/SelectField/SelectField'

interface ITrans {
	ru: { key: string, value: string },
	uz: { key: string, value: string },
}

interface IFormData {
	proizId: string,
	translations: ITrans[]
}

const MaterialAction: React.FC = () => {

	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate()

	const { id } = useParams()

	const { handleSubmit, control, reset, getValues } = useForm<IFormData>({
		defaultValues: {
			translations: [{
				ru: { key: "", value: "" },
				uz: { key: "", value: "" },
			}]
		}
	})

	const { fields, append, remove } = useFieldArray({ control, name: "translations" });

	const [fileList, setFileList] = useState<any[]>([])

	const { data: productions, isLoading, refetch } = useApi(PRODUCTION_GET_ALL, { placeholderData: [] })
	const { data } = useApi(`${MATERIAL_GET_ONE}/${id}`, { enabled: Boolean(id), suspense: true, keepPreviousData: false })
	const { mutate: mutateCreate, isLoading: createLoading } = useApiMutation(MATERIAL_CREATE)
	const { mutate: mutateUpdate, isLoading: updateLoading } = useApiMutationID("put", MATERIAL_UPDATE)

	useEffect(() => {
		if (data) {
			reset({
				proizId: data.proizId,
				translations: data.translations
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

	const addItem = () => {
		append({
			ru: { key: "", value: "" },
			uz: { key: "", value: "" },
		}, { focusName: `translations.${fields.length}.uz.key` })
	}

	const submit = (data: IFormData) => {
		if (!fileList.length) {
			messageApi.warning("Kamida 1 rasm qo'shing")
		} else {
			const formData = new FormData()
			formData.append("proizId", data.proizId)
			formData.append("settings", JSON.stringify(data.translations))
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
				<Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/materials")}>Ortga qaytish</Button>
			</div>
			<div className="page">
				<form onSubmit={handleSubmit(submit)}>
					<Row gutter={[16, 24]}>
						<Col span={12}>
							<SelectField
								label='Ishlab chiqarish'
								control={control}
								name="proizId"
								options={parseOptions(productions as any[])}
								fieldNames={{ value: "_id", label: "titleUz" }}
								validation={{ required: true }}
							/>
						</Col>
						<Col span={12}>
							<Typography.Text style={{ display: "block" }} >Rasm</Typography.Text>
							<UploadImage
								fileList={fileList}
								setFileList={setFileList}
								length={1}
								listType="picture"
							>
								{!fileList.length && <Button icon={<UploadOutlined />} style={{ marginTop: 4, width: "100%" }} block size="large">Yuklash</Button>}
							</UploadImage>
						</Col>
						{
							fields.map((el, index) => (
								<Fragment key={el.id}>
									<Col span={6}>
										<TextField
											label='Key Uz'
											control={control}
											name={`translations.${index}.uz.key`}
											required
										/>
									</Col>
									<Col span={5}>
										<TextField
											label='Value Uz'
											control={control}
											name={`translations.${index}.uz.value`}
											required
										/>
									</Col>
									<Col span={6}>
										<TextField
											label='Key Ru'
											control={control}
											name={`translations.${index}.ru.key`}
											required
										/>
									</Col>
									<Col span={5}>
										<TextField
											label='Value Ru'
											control={control}
											name={`translations.${index}.ru.value`}
											required
										/>
									</Col>
									<Col span={2}>
										<Button
											danger
											type='primary'
											icon={<DeleteOutlined />}
											size="large"
											onClick={() => remove(index)}
											style={{ marginTop: 24 }}
										/>
									</Col>
								</Fragment>
							))
						}
					</Row>
					<div style={{ margin: "auto", marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 500 }}>
						<Button type="dashed" size='large' block icon={<PlusOutlined />} onClick={addItem}>Qo'shish</Button>
						<Button loading={createLoading || updateLoading} type='primary' size='large' block htmlType="submit">Saqlash</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default MaterialAction