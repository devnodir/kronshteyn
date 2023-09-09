import page, { redirectTo } from './generator'
import AppLayout from '@/layout'
import { RouteObject } from 'react-router-dom'

const publicRoutes: RouteObject[] = [
	{ path: "/login", element: page("Login") },
	{ path: "*", element: redirectTo("/login", true) }
]

const privateRoutes: RouteObject[] = [
	{ path: "/services", element: page("Services", "Xizmatlar", AppLayout) },
	{ path: "/services/create", element: page("ServiceAction", "Xizmat yaratish", AppLayout) },
	{ path: "/services/update/:id", element: page("ServiceAction", "Xizmatni tahrirlash", AppLayout) },
	{ path: "/news", element: page("News", "Yangiliklar", AppLayout) },
	{ path: "/news/create", element: page("NewsAction", "Yangilik qo'shish", AppLayout) },
	{ path: "/news/update/:id", element: page("NewsAction", "Yangilikni tahrirlash", AppLayout) },
	{ path: "/production", element: page("Production", "Ishlab chiqarish", AppLayout) },
	{ path: "/production/create", element: page("ProductionAction", "Ishlab chiqarish qo'shish", AppLayout) },
	{ path: "/production/update/:id", element: page("ProductionAction", "Ishlab chiqarishni tahrirlash", AppLayout) },
	{ path: "/portfolio", element: page("Portfolio", "Portfolio", AppLayout) },
	{ path: "/portfolio/create", element: page("PortfolioAction", "Portfolio yaratish", AppLayout) },
	{ path: "/portfolio/update/:id", element: page("PortfolioAction", "Portfolioni tahrirlash", AppLayout) },
	{ path: "/materials", element: page("Materials", "Materiallar", AppLayout) },
	{ path: "/materials/create", element: page("MaterialAction", "Material yaratish", AppLayout) },
	{ path: "/materials/update/:id", element: page("MaterialAction", "Materialni tahrirlash", AppLayout) },
	{ path: "/certificates", element: page("Certificates", "Sertifikatlar", AppLayout) },
	{ path: "/contact", element: page("Contact", "Kontakt", AppLayout) },
	{ path: "/login", element: redirectTo("/services", true) },
	{ path: "/", element: redirectTo("/services", true) },
	{ path: "*", element: page("404") }
]

export { publicRoutes, privateRoutes }