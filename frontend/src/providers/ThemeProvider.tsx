import { IChildren } from '@/types/helper'
import { ConfigProvider } from 'antd'
import { ThemeConfig } from 'antd/es/config-provider'
import React from 'react'

interface Props {
	children: IChildren
}

export const theme: ThemeConfig = {
	token: {
		colorPrimary: "#7cb305"
	}
}


const ThemeProvider: React.FC<Props> = ({ children }) => {

	return (
		<ConfigProvider theme={theme}>
			{children}
		</ConfigProvider>
	)
}

export default ThemeProvider