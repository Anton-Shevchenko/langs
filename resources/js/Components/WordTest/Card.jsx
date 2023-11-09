import {Colors} from "@/Styles/app.js";
import {useState} from "react";

export const Card = ({questionWord, answerOptions}) => {
    const classErrOption = "errOption";

    const optionHoverEnter = (e) => {
        e.target.className !== classErrOption ? e.target.style.backgroundColor = Colors.creamHover: null
    }
    const optionHoverLeave = (e) => {
        e.target.className !== classErrOption ? e.target.style.backgroundColor = "": null
    }
    const [rightCards, setRightCards] = useState([])

    const clickOptionAction = (isCorrect, cardId, e) => {
        if (isCorrect) {
            setRightCards([...rightCards, cardId])

            return
        }

        e.target.style.backgroundColor = Colors.error;
        e.target.className = classErrOption;
    }

    return (
        <div style={style.container}>
            <div style={style.questionWord}>{questionWord.value}</div>
            <div style={style.body}>
                {rightCards.includes(questionWord.id) ?
                    <div style={style.rightBody}>
                        <div style={style.imgBox}>
                            <img
                                style={style.img}
                                src="https://png.monster/wp-content/uploads/2022/04/png.monster-137-370x315.png"
                            />
                        </div>
                        <p style={style.p}>{questionWord.translation}</p>
                    </div> :
                    <>
                        {answerOptions.map(option =>
                            <div key={option.id} onClick={(e) => {
                                clickOptionAction(questionWord.translation === option, questionWord.id, e)
                            }}
                                 onMouseOver={optionHoverEnter}
                                 onMouseLeave={optionHoverLeave}
                                 style={style.option}
                            >
                                {option}
                            </div>)}
                    </>
                }
            </div>
        </div>
    )
}

const style = {
    container: {
        color: Colors.strongGrey,
        width: 400,
        backgroundColor: Colors.cream,
        textAlign: "center",
        borderRadius: 10,
        fontWeight: "bold",
        overflow: "hidden",
        margin: 'auto',
        marginTop: 40,
    },
    questionWord: {
        padding: 20,
        fontSize: 30,
    },
    option: {
        align: "center",
        height: '25%',
        borderTop: "0.2px solid #D3D3D3",
        paddingTop: 13,
    },
    body: {
        height: 200,
    },
    img: {
        width: 100,
        right: 20,
        alignSelf: 'right',
    },
    imgBox: {
        textAlign: '-webkit-center',
        width: '100%'
    },
    rightBody: {
        paddingTop: 20,
        backgroundColor: "",
    },
    p: {
        marginTop: 20,
        color: "#99c43c"
    }
}
