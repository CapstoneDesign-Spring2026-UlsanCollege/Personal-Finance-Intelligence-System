export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  min,
  step,
  readOnly = false,
  disabled = false
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        className="field-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        readOnly={readOnly}
        disabled={disabled}
      />
    </label>
  );
}
