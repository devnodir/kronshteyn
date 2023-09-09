import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound: React.FC = () => {

	const navigate = useNavigate()

	const goHome = () => navigate("/")

	return (
		<Result
			status="404"
			title="404"
			subTitle="Kechirasiz, bunday sahifa mavjud emas"
			extra={<Button onClick={goHome} type="primary" size="large">Asosiy sahifa</Button>}
		/>
	)
}

export default PageNotFound