import { Button, message } from 'antd';
import React from 'react'
import TextField from '@/components/Form/TextField';
import { useForm } from 'react-hook-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useApiMutation from '@/hooks/useApiMutation';
import { setLocalStorage } from '@/utils/localStorage';
import { LOGIN, USER_TOKEN } from '@/utils/variables';
import { setIsAuth, setUserData } from '@/utils/dispatch';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_VALIDATE } from '@/utils/validations';
import logo from "@/assets/logo.svg"

interface IFormData {
	login: string
	password: string
}

const Login: React.FC = () => {

	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	const { control, handleSubmit } = useForm<IFormData>()

	const { mutateAsync, isLoading } = useApiMutation(LOGIN)

	const submit = (data: IFormData) => {
		mutateAsync(data, {
			onSuccess: (res: any) => {
				setLocalStorage(USER_TOKEN, res.token)
				setUserData(res.user)
				setIsAuth(true)
				navigate("/", { replace: true })
			},
			onError: err => {
				messageApi.error(err.message)
			}
		})
	}

	return (
		<div className='login'>
			{contextHolder}
			<div className='login-content'>
				<div className="login-content-logo">
					<img src={logo} alt="" />
				</div>
				<form onSubmit={handleSubmit(submit)} className="login-form">
					<TextField
						wrapperClass='login-form-item'
						label='Login'
						name='login'
						control={control}
						addonBefore={<UserOutlined />}
					// required
					/>
					<TextField
						wrapperClass='login-form-item'
						label='Parol'
						autoComplete="off"
						name='password'
						isPassword
						control={control}
						addonBefore={<LockOutlined />}
						// required
						validation={PASSWORD_VALIDATE}
					/>
					<Button loading={isLoading} className='login-form-button' htmlType="submit" block size="large" type="primary" >Kirish</Button>
				</form>
			</div>
		</div>
	)
}

export default Login