export const SelectInput = ({options, onChange, selected}) => {
    return (
        <select defaultValue={selected} onChange={(e) => onChange(e.target.value)}>
            {options ? options.map(option =>
                <option>{option}</option>
            ) : null}
        </select>
    )
}
