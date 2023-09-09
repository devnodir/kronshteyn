import { Input, Typography } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import React from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'

const { TextArea } = Input

interface Props {
	control: any
	validation?: RegisterOptions
	label?: string
	name: string,
	wrapperClass?: string,
}

const TextAreaField: React.FC<Props & TextAreaProps> = ({ name, control, required, wrapperClass, label, validation, ...props }) => {


	return (
		<Controller
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { error },
			}) => (
				<div className={wrapperClass} style={{ width: "100%" }}>
					{label && <Typography.Text style={{ marginBottom: 4, display: "block" }} type={error && "danger"}>{label}</Typography.Text>}
					<TextArea
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
						status={error && "error"}
						name={name}
						size="large"
						autoComplete='off'
						{...props}
					/>
					{error && <Typography.Text style={{ fontSize: 12 }} type="danger">{error.message}</Typography.Text>}
				</div>
			)}
			name={name}
			control={control}
			rules={{ required: required, ...validation }}
		/>
	)
}

export default TextAreaField