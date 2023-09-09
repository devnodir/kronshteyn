import React, { Suspense, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ILayout } from '@/types/general';
import PageLoader from '@/components/Loader/PageLoader';

const { Content, Footer } = Layout;

const AppLayout: React.FC<ILayout> = ({ title, children }) => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout className='layout'>
			<Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
			<Layout className="layout-content">
				<Navbar title={title} />
				<Content className='layout-content-pages'>
					<Suspense fallback={<PageLoader />}>
						{children}
					</Suspense>
				</Content>
				<Footer className='layout-content-footer'>Кронштейн ©2023 Created by
					<a href="https://devnodir.uz" style={{ marginLeft: "4px" }}>DEVNODIR</a>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default AppLayout;