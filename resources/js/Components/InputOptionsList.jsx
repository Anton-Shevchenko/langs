import {useEffect, useRef} from "react";

export const InputOptionsList = ({name, options, setData, onClickOutside, isShow, setIsShow, setInputInFocus}) => {
    const selectOption = (option) => {
        options = []
        setData(name, option)
        setIsShow(false)
        setInputInFocus("")
    }
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
                setInputInFocus("")
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    if(!isShow) {
        return null;
    }

    return (
        <div ref={ref} style={style.container}>
            <div style={style.list}>
                {options.map(tr => (
                    <div onClick={() => selectOption(tr)} style={style.option} key={tr}>{tr}</div>
                ))}
            </div>
        </div>
    )
}

const style = {
    container: {
        position: "relative"
    },
    list: {
        width: "100%",
        backgroundColor: "grey",
        position: "absolute"
    },
    option: {

    }
}
