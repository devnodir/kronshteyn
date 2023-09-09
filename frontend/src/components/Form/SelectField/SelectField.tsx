import { SelectProps, Select, Typography } from 'antd'
import React from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'

interface Props {
	control: any
	validation?: RegisterOptions
	label?: string
	name: string,
	isPassword?: boolean,
	wrapperClass?: string
}

const SelectField: React.FC<Props & SelectProps> = ({ name, control, wrapperClass, label, validation, isPassword, ...props }) => {


	return (
		<Controller
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { error },
			}) => (
				<div className={wrapperClass} style={{ width: "100%" }}>
					{label && <Typography.Text style={{ marginBottom: 4, display: "block" }} type={error && "danger"}>{label}</Typography.Text>}
					<Select
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
						style={{ width: "100%" }}
						status={error && "error"}
						size="large"
						filterOption={(input, option) =>
							// @ts-ignore
							(option[props.fieldNames?.label || "label"] ?? '').toLowerCase().includes(input.toLowerCase())
						}
						{...props}
					/>
					{error && <Typography.Text style={{ fontSize: 12 }} type="danger">{error.message}</Typography.Text>}
				</div>
			)}
			name={name}
			control={control}
			rules={validation}
		/>
	)
}

export default SelectField