import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

interface Prop {
	routes: RouteObject[]
}

const RenderRoutes: React.FC<Prop> = ({ routes }) => {
	return useRoutes(routes)
}

export default RenderRoutes