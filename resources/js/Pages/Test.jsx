import {Card} from "@/Components/WordTest/Card";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Colors} from "@/Styles/app.js";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Test({auth, tests}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div style={style.container}>
                <div className="flex items-center justify-end mt-2">
                    <PrimaryButton
                        className="ml-4"
                        style={style.btn}
                        onClick={() => window.location.reload(false)}
                    >
                        Next
                    </PrimaryButton>
                </div>
                <div style={style.grid}>
                    {tests.map(test => <Card onClick answerOptions={test.options} questionWord={test}/>)}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

const style = {
    container: {
        padding: 20,
    },
    grid: {
        display: "grid",
        gridColumnGap: 10,
        gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
        textAlign: "center",
        alignContent: "center",
        width: "100%",
    },
    btn: {
        right: 30,
        backgroundColor: Colors.blue,
    }
}
