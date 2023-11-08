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
import {EN_LANG, LANGUAGES, LANGUAGES_INFO, NL_LANG, UK_LANG} from "@/constants.js";
import {routes} from "@/API/routes.js";

const DEFAULT_REQUEST_DELAY = 500

export default function WordList({auth, words}) {
    const {data, setData, post, processing, errors, delete: deleteWordAction} = useForm({
        value: '',
        translation: '',
    });
    const [translations, setTranslations] = useState([])
    const valueInput = 'value'
    const translateInput = 'translate'
    const [inputInFocus, setInputInFocus] = useState("")
    const [predicts, setPredicts] = useState([])
    const [showPredicts, setShowPredicts] = useState(false);
    const [showTranslationOptions, setShowTranslationOptions] = useState(false);
    const [valueLang, setValueLang] = useState({
        pin: EN_LANG,
        list: LANGUAGES.filter(l => l !== NL_LANG)
    });
    const [translationLang, setTranslationLang] = useState({
        pin: NL_LANG,
        list: LANGUAGES.filter(l => l !== EN_LANG)
    });

    useEffect(() => {
        if (data.value.length > 1 && inputInFocus === translateInput) {
            predictValue()
        }
        if (data.value.length > 1 && inputInFocus === valueInput) {
            predictTranslate()
        }
    }, [data.value, inputInFocus])

    const submit = (e) => {
        e.preventDefault();

        post(route(routes.words.store));
    };

    const deleteWord = (id) => {
        deleteWordAction(route(routes.words.destroy, {id: id}));
    };

    // TODO try to play with state do to it in state consts
    const setValueLangAction = (lang) => {
        setValueLang({...valueLang, tip: lang})
        setTranslationLang({...translationLang, list: LANGUAGES.filter(l => l !== lang)})
    }

    const setTranslationLangAction = (lang) => {
        setTranslationLang({...translationLang, tip: lang})
        setValueLang({...valueLang, list: LANGUAGES.filter(l => l !== lang)})
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-6">
                <form onSubmit={submit}>
                    <div style={appStyles.row}>
                        <div style={appStyles.column}>
                            <InputLabel htmlFor="value" value="Value"/>
                            <TextInput
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
                                options={valueLang.list}
                                onChange={setValueLangAction}
                                selected={valueLang.pin}
                            />
                        </div>
                        <div style={appStyles.column}>
                            <InputLabel htmlFor="translation" value="Translation"/>
                            <TextInput
                                id="translation"
                                type="text"
                                name="translation"
                                value={data.translation}
                                className="mt-1 block w-full"
                                onFocus={() => setInputInFocus(translateInput)}
                                onChange={(e) => setData('translation', e.target.value)}
                            />
                            <InputError message={errors.value}/>
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
                                options={translationLang.list}
                                onChange={setTranslationLangAction}
                                selected={translationLang.pin}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Create
                        </PrimaryButton>
                    </div>
                </form>
                <WordTable words={words} deleteWordAction={deleteWord}/>
            </div>
        </AuthenticatedLayout>
    )
}
