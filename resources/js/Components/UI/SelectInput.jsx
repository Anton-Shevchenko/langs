import {Colors} from "@/Styles/app.js";

export const SelectInput = ({options, onChange, selected}) => {
    return (
        <select
            style={style.select}
            defaultValue={selected}
            onChange={(e) => onChange(e.target.value)}
            onFocus={(e) => e.target.blur()}
        >
            {options ? options.map(option =>
                <option style={style.option} key={option}>{option}</option>
            ) : null}
        </select>
    )
}

const style = {
    select: {
        border: 'none',
        color: Colors.blue,
        backgroundColor: "transparent",
    },
    option: {

    }
}
