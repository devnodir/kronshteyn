import type { MenuProps } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined, FormatPainterOutlined, NotificationOutlined, ContactsOutlined, BgColorsOutlined, BookOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		label: "Xizmatlar",
		key: "/services",
		icon: <FormatPainterOutlined />
	},
	{
		label: "Ishlab chiqarish",
		key: "/production",
		icon: <ShoppingCartOutlined />
	},
	{
		label: "Yangiliklar",
		key: "/news",
		icon: <NotificationOutlined />
	},
	{
		label: "Materiallar",
		key: "/materials",
		icon: <BgColorsOutlined />
	},
	{
		label: "Portfolio",
		key: "/portfolio",
		icon: <ShoppingOutlined />
	},
	{
		label: "Sertifikat",
		key: "/certificates",
		icon: <BookOutlined />
	},
	{
		label: "Kontakt",
		key: "/contact",
		icon: <ContactsOutlined />
	},
];

const linkedItems: MenuItem[] = items.map((el: any) => {
	return {
		...el,
		label: <Fragment>{el.label} <NavLink to={el.key} /></Fragment>
	}
})

export default linkedItems