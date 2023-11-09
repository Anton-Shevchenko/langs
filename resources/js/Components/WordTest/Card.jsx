import {Colors} from "@/Styles/app.js";

export const Card = ({questionWord, answerOptions}) => {
    const optionHoverEnter = (e) => {e.target.style.backgroundColor = Colors.creamHover}
    const optionHoverLeave = (e) => {e.target.style.backgroundColor = ""}

    return (
        <div style={style.container}>
            <div style={style.questionWord}>{questionWord}</div>
            {answerOptions.map(option =>
                <div
                    key={option.id}
                    onMouseOver={optionHoverEnter}
                    onMouseLeave={optionHoverLeave}
                    style={style.option}
                >
                    {option}
                </div>)}
        </div>
    )
}

const style = {
    container: {
        color: Colors.strongGrey,
        width: 500,
        backgroundColor: Colors.cream,
        margin: 20,
        textAlign: "center",
        borderRadius: 10,
        fontWeight: "bold",
        overflow: "hidden",
    },
    questionWord: {
        padding: 20,
        fontSize: 30,
    },
    option: {
        align: "center",
        height: 50,
        borderTop: "0.2px solid #D3D3D3",
        paddingTop: 13,
    },
}
