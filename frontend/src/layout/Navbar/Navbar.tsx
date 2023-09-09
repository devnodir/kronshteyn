import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Typography } from 'antd'
import type { MenuProps } from 'antd';
import React from 'react'
import { removeLocalStorage } from '@/utils/localStorage';
import { USER_TOKEN } from '@/utils/variables';
import useAppSelector from '@/hooks/useAppSelector';

const { Header } = Layout

interface Props {
	title?: string
}


const Navbar: React.FC<Props> = ({ title }) => {

	const { userData } = useAppSelector(({ auth }) => auth)

	const logout = () => {
		removeLocalStorage(USER_TOKEN)
		window.location.reload()
	}

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: "Chiqish",
			icon: <LogoutOutlined />,
			danger: true,
			onClick: logout
		},
	];

	return (
		<Header className='layout-content-head' >
			<Typography.Title level={4}>{title}</Typography.Title>
			<Dropdown menu={{ items }} trigger={["click"]}>
				<div className='user-menu'>
					<Typography.Text >{userData?.login}</Typography.Text>
					<Avatar shape="square" icon={<UserOutlined />} />
				</div>
			</Dropdown>
		</Header>
	)
}

export default Navbar