import { Image, message } from 'antd'
import React, { Fragment, useState } from 'react'
import useApi from '@/hooks/useApi'
import { CERTIFICATE_CREATE, CERTIFICATE_DELETE, CERTIFICATE_GET_ALL } from '@/utils/variables'
import useApiMutationID from '@/hooks/useApiMutationID'
import UploadImage from '@/components/UploadImage'
import { imageURL } from '@/utils/methods'
import useApiMutation from '@/hooks/useApiMutation'

const Certificates: React.FC = () => {

	const [messageApi, contextHolder] = message.useMessage();

	useApi(CERTIFICATE_GET_ALL, { placeholderData: [], suspense: true, onSuccess })
	const { mutateAsync, isLoading } = useApiMutationID("delete", CERTIFICATE_DELETE)
	const { mutateAsync: mutateCreate } = useApiMutation(CERTIFICATE_CREATE)


	const [fileList, setFileList] = useState<any[]>([])
	const [preveiw, setPreveiw] = useState<number | null>(null)

	function onSuccess(data: any) {
		const files = data.map((item: any) => {
			return {
				uid: item._id,
				_id: item._id,
				name: item.images.name,
				url: imageURL(item.images.path),
				isUploaded: true,
			}
		})
		setFileList(files)
	}

	const updateImg = (file: any, res: any) => {
		const index = fileList.findIndex(el => el.uid === file.uid)
		fileList[index]._id = res.sert._id
		fileList[index].url = imageURL(res.sert?.images.path)
		fileList[index].status = "done"
		setFileList([...fileList])
	}

	const uploadImage = async ({ file, onSuccess, onError }: any) => {
		const formData = new FormData()
		formData.append("file", file)
		try {
			const res = await mutateCreate(formData)
			onSuccess()
			updateImg(file, res)
		} catch {
			onError()
		}
	}

	const handleRemoveImg = async (file: any) => {
		try {
			const res: any = await mutateAsync({ id: file._id })
			messageApi.success(res.message)
		} catch ({ message }: any) {
			// if (message) messageApi.error(message)
		}
	}

	return (
		<Fragment>
			{contextHolder}
			<div className='page'>
				<UploadImage
					fileList={fileList}
					customRequest={uploadImage}
					setFileList={setFileList}
					onRemove={handleRemoveImg}
					multiple={true}
					beforeUpload={undefined}
					onPreview={(file) => {
						const index = fileList.findIndex(el => el.uid === file.uid)
						setPreveiw(index)
					}}
				/>
				<div style={{ visibility: "hidden" }}>
					<Image.PreviewGroup
						preview={{
							onChange: (current) => setPreveiw(current),
							visible: typeof preveiw === "number",
							current: preveiw as number,
							onVisibleChange: () => setPreveiw(null)
						}}
					>
						{
							fileList.map((el: any, index: number) => (
								<Image key={index} src={el.url} />
							))
						}
					</Image.PreviewGroup>
				</div>
			</div>
		</Fragment>
	)
}

export default Certificates