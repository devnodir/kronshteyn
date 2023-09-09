import useApi from '@/hooks/useApi'
import { IChildren } from '@/types/helper'
import { setIsAuth, setUserData } from '@/utils/dispatch'
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage'
import { AUTH_USER, USER_TOKEN } from '@/utils/variables'
import { message } from 'antd'
import React, { Fragment, useEffect } from 'react'

interface Props {
	children: IChildren
}

const token = getLocalStorage(USER_TOKEN)

const AuthProvider: React.FC<Props> = ({ children }) => {

	const [messageApi, contextHolder] = message.useMessage();
	const { error } = useApi(AUTH_USER, { onSuccess, onError, enabled: Boolean(token), suspense: true })

	function onSuccess(res: any) {
		setUserData(res.user)
		setIsAuth(true)
	}

	function onError({ message }: any) {
		removeLocalStorage(USER_TOKEN)
	}

	useEffect(() => {
		if (error?.message) messageApi.error(error.message)
	}, [error])

	return <Fragment>
		{contextHolder}
		{children}
	</Fragment>
}

export default AuthProvider