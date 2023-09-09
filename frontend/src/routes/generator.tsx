import { Navigate } from "react-router-dom"
import React, { lazy } from "react"
import { ILayout } from "@/types/general"

// generate that lazy imported page
const generatePage = (folderPath: string, title?: string, Layout?: React.FC<ILayout>) => {
	const Page = lazy(() => import(`../pages/${folderPath}/index.ts`))
	return Layout ? <Layout title={title}><Page /></Layout> : <Page />
}

// generate redirect component
const redirectTo = (path: string, replace?: boolean) => {
	return <Navigate to={path} replace={replace} />
}

export { redirectTo }
export default generatePage