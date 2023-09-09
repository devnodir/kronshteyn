import { Input, InputProps, Typography } from 'antd'
import React from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'


interface Props {
	control: any
	validation?: RegisterOptions
	label?: string
	name: string,
	isPassword?: boolean,
	wrapperClass?: string
	seporate?: string
}

const ThousandField: React.FC<Props & InputProps> = ({ name, control, required, wrapperClass, label, validation, isPassword, seporate = ",", ...props }) => {


	const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seporate);
	const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
		onChange(addCommas(removeNonNumeric(e.target.value)))
	};


	return (
		<Controller
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { error },
			}) => (
				<div className={wrapperClass} style={{ width: "100%" }}>
					{label && <Typography.Text style={{ marginBottom: 4, display: "block" }} type={error && "danger"}>{label}</Typography.Text>}
					<Input
						value={value}
						onChange={e => handleChange(e, onChange)}
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

export default ThousandField