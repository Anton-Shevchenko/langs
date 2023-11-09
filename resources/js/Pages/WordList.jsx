import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {WordTable} from "@/Components/Word/WordTable";
import {useEffect, useState} from "react";
import {translateText} from "@/Services/Translator.js";
import {InputOptionsList} from "@/Components/InputOptionsList.jsx";
import {appStyles} from "@/Styles/app.js";
import {predictWordByPrefix} from "@/Services/Predictor.js";
import {SelectInput} from "@/Components/UI/SelectInput";
import {EN_LANG, LANGUAGES, NL_LANG} from "@/constants.js";
import {routes} from "@/API/routes.js";
import Pagination from "@/Components/UI/Pagination";

const DEFAULT_REQUEST_DELAY = 500

export default function WordList({auth, words}) {
    const initData = {
        value: '',
        translation: '',
    }
    const {data, setData, post, processing, errors, delete: deleteWordAction} = useForm(initData);
    const [translations, setTranslations] = useState([])
    const valueInput = 'value'
    const translateInput = 'translate'
    const [inputInFocus, setInputInFocus] = useState("")
    const [predicts, setPredicts] = useState([])
    const [showPredicts, setShowPredicts] = useState(false);
    const [showTranslationOptions, setShowTranslationOptions] = useState(false);
    const [valueLang, setValueLang] = useState(EN_LANG);
    const [translationLang, setTranslationLang] = useState(NL_LANG);

    useEffect(() => {
        if (data.value.length > 1 && inputInFocus === translateInput) {
            predictValue()
        }
        if (data.value.length > 1 && inputInFocus === valueInput) {
            predictTranslate()
        }
    }, [data.value, inputInFocus])

    const submit = (e) => {
        data.value_lang = valueLang
        data.translation_lang = translationLang
        e.preventDefault()
        post(route(routes.words.store));
        setData(initData)
    };

    const deleteWord = (id) => {
        deleteWordAction(route(routes.words.destroy, {id: id}));
    };

    const setValueLangAction = (lang) => {
        setValueLang(lang)
        setTranslationLang(LANGUAGES.filter(l => l !== lang)[0])
        setData(initData)
    }

    const setTranslationLangAction = (lang) => {
        setTranslationLang(lang)
        setValueLang(LANGUAGES.filter(l => l !== lang)[0])
    }

    const predictValue = () => {
        const delayDebounceFn = setTimeout(async () => {
            let translateOptions = await translateText(data.value, valueLang, translationLang)
            setTranslations(translateOptions)
            setShowTranslationOptions(true)
        }, DEFAULT_REQUEST_DELAY)

        return () => clearTimeout(delayDebounceFn)
    }

    const predictTranslate = () => {
        const delayDebounceFn = setTimeout(async () => {
            let translateOptions = await predictWordByPrefix(data.value, valueLang)
            setPredicts(translateOptions)
            setShowPredicts(true)
        }, DEFAULT_REQUEST_DELAY)

        return () => clearTimeout(delayDebounceFn)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div style={style.container} className="max-w-6xl mx-auto sm:px-6 lg:px-6">
                <form onSubmit={submit}>
                    <div style={appStyles.row}>
                        <div className="ml-4" style={appStyles.column}>
                            <InputLabel htmlFor="value" value="Value"/>
                            <TextInput
                                style={style.input}
                                id="value"
                                type="text"
                                name="value"
                                value={data.value}
                                className="mt-1 block w-full"
                                onFocus={() => setInputInFocus(valueInput)}
                                onChange={(e) => setData('value', e.target.value)}
                            />
                            <InputError message={errors.value}/>
                            <InputOptionsList
                                name="value"
                                setData={setData}
                                options={predicts}
                                onClickOutside={() => setShowPredicts(false)}
                                isShow={showPredicts}
                                setIsShow={setShowPredicts}
                                setInputInFocus={setInputInFocus}
                            />
                            <SelectInput
                                options={LANGUAGES}
                                onChange={setValueLangAction}
                                selected={valueLang}
                            />
                        </div>
                        <div className="ml-4" style={appStyles.column}>
                            <InputLabel htmlFor="translation" value="Translation"/>
                            <TextInput
                                style={style.input}
                                id="translation"
                                type="text"
                                name="translation"
                                value={data.translation}
                                className="mt-1 block w-full"
                                onFocus={() => setInputInFocus(translateInput)}
                                onChange={(e) => setData('translation', e.target.value)}
                            />
                            <InputError message={errors.translation}/>
                            <InputOptionsList
                                name="translation"
                                setData={setData}
                                options={translations}
                                onClickOutside={() => setShowTranslationOptions(false)}
                                isShow={showTranslationOptions}
                                setIsShow={setShowTranslationOptions}
                                setInputInFocus={setInputInFocus}
                            />
                            <SelectInput
                                options={LANGUAGES.filter(l => l !== valueLang)}
                                onChange={setTranslationLangAction}
                                selected={translationLang}
                            />
                        </div>
                        <div style={appStyles.column}>
                            {/*TODO make design*/}
                            <PrimaryButton style={{marginTop: 27, marginLeft: 60}} className="ml-4" disabled={processing}>
                                Create
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
                <WordTable words={words.data} deleteWordAction={deleteWord}/>
                <Pagination links={words.links} />
            </div>
        </AuthenticatedLayout>
    )
}

const style = {
    container: {
        marginTop: 20,
    },
    input: {
        width: 450,
        alignSelf: "center",
    },
}
