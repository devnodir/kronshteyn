import items from '@/routes/navItems'
import { ISetState } from '@/types/helper'
import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import logo from "@/assets/logo.svg"
import logoM from "@/assets/logo-m.svg"
import { useLocation } from 'react-router-dom'

const { Sider } = Layout

interface Props {
	collapsed: boolean
	setCollapsed: ISetState<boolean>
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed }) => {

	const { pathname } = useLocation()
	const [active, setActive] = useState<string | undefined>()

	useEffect(() => {
		const item = items.find((el: any) => pathname.startsWith(el.key))
		setActive(item?.key as string)
	}, [pathname])

	return (
		<Sider className='layout-sider' theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
			<div className='layout-sider-logo'>
				<img src={collapsed ? logoM : logo} alt="" />
			</div>
			<Menu className='layout-sider-menu' mode="inline" items={items} selectedKeys={[active || ""]} onSelect={({ key }) => setActive(key)} />
		</Sider>
	)
}

export default Sidebar