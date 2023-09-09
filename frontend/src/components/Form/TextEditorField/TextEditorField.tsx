import { Input, Typography } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import React, { useState } from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'
import ReactQuill from 'react-quill'

interface Props {
	control: any
	validation?: RegisterOptions
	label?: string
	name: string,
	wrapperClass?: string,
}

const TextAreaField: React.FC<Props & TextAreaProps> = ({ name, control, required, wrapperClass, label, validation, ...props }) => {

	const [isFocus, setFocus] = useState(false)

	var toolbarOptions = [
		[
			{ 'header': [1, 2, 3, false] },
			'bold',
			'italic',
			'underline',
			'strike',
			'blockquote',
			{ 'color': [] },
			{ 'align': [] },
			{ 'list': 'ordered' },
			{ 'list': 'bullet' },
			{ 'indent': '-1' },
			{ 'indent': '+1' },
		],
	];

	return (
		<Controller
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { error },
			}) => (
				<div className={wrapperClass} style={{ width: "100%" }}>
					{label && <Typography.Text style={{ marginBottom: 4, display: "block" }} type={error && "danger"}>{label}</Typography.Text>}
					<ReactQuill
						theme='snow'
						onFocus={() => setFocus(true)}
						onBlur={() => { onBlur(); setFocus(false) }}
						onChange={onChange}
						value={value}
						ref={ref}
						modules={{
							toolbar: toolbarOptions
						}}
						id={name}
						className={`${error && "error"} ${isFocus && "focused"}`}
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