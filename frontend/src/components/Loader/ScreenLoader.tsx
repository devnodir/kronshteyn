import { Spin } from 'antd'
import React from 'react'
import logo from "@/assets/logo.svg"
import { LoadingOutlined } from '@ant-design/icons'

const ScreenLoader: React.FC = () => {
	return (
		<div className='screen-loader'>
			<div className="screen-loader-content">
				<img src={logo} alt="" />
				<Spin />
			</div>
		</div>
	)
}

export default ScreenLoader