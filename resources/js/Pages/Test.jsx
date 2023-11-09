import {Card} from "@/Components/WordTest/Card";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Test({auth, tests}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div>
                {tests.map(test => <Card answerOptions={test.options} questionWord={test.value} />)}
            </div>
        </AuthenticatedLayout>
    )
}
