export const SelectInput = ({options, onChange, selected}) => {
    return (
        <select defaultValue={selected} onChange={(e) => onChange(e.target.value)}>
            {options.map(option =>
                <option>{option}</option>
            )}
        </select>
    )
}
