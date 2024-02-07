
import './FormField.css'

export default function FormField({ id, className, type = 'text', title, value, containerStyle, placeholder = title, disabled = false, ref, onChange }) {
	const isCheckbox = type === 'checkbox'

	const FieldComponent = isCheckbox
		? InputCheckbox
		: type === 'textarea'
			? TextArea
			: InputDefault

	return (
		<div style={{ display: isCheckbox ? 'flex' : 'block', ...containerStyle }}>
			{!isCheckbox && <FormLabel htmlFor={id}>{title}</FormLabel>}
			<FieldComponent
				id={id}
				className={className || ''}
				name={id}
				type={type}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				ref={ref}
				onChange={onChange}
			/>
			{isCheckbox && <FormLabel htmlFor={id} className='formLabelCheckbox'>{title}</FormLabel>}
		</div>
	)
}

function FormLabel({ htmlFor, className, children }) {
	return <label htmlFor={htmlFor} className={`formLabel preventSelect ${className}`}>{children}</label>
}

function InputDefault({ id, className, type, title, value, placeholder = title, disabled, onChange }) {
	return (
		<input
			type={type}
			className={`formInput ${className}`}
			id={id}
			name={id}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			onChange={onChange}
		/>
	)
}

function InputCheckbox({ id, title, className, value, placeholder = title, disabled = false, onChange }) {
	return (
		<input
			type='checkbox'
			className={`formInput ${className}`}
			id={id}
			name={id}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			onChange={onChange}
		/>
	)
}

function TextArea({ id, title, className, value, placeholder = title, disabled = false, onChange, ref }) {
	return (
		<textarea
			id={id}
			className={`formInput ${className}`}
			ref={ref}
			placeholder={placeholder}
			disabled={disabled}
			value={value}
			onChange={onChange}
		/>
	)
}
