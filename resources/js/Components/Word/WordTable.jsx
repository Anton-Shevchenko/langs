import SecondaryButton from "@/Components/SecondaryButton.jsx";

const rowStyle = {
    display: 'flex',
    padding: 10,
}
const style = {
    container: {
        marginTop: 20,
    },
    rowGrey: {
       ...rowStyle,
    },
    rowWhite: {
        ...rowStyle,
        backgroundColor: 'white',
    },
    value: {
        flex: 1,
    },
    actions: {
        marginRight: 0,
    }
};

export const WordTable = ({words, deleteWordAction}) => {
    return (
        <div style={style.container}>
            {words.map((word, key) =>
            <div key={word.id} style={key % 2 ? style.rowGrey : style.rowWhite}>
                <div style={style.value}>
                    {word.value}
                </div>
                <div style={style.actions}>
                    <SecondaryButton onClick={() => deleteWordAction(word.id)}>Delete</SecondaryButton>
                </div>
            </div>
            )}
        </div>
    )
}


