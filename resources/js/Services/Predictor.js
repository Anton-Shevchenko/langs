import {EN_LANG, NL_LANG} from "@/constants.js";

const localServiceLanguage = [
    NL_LANG,
]

const MAX_PREDICTS_COUNT = 5
const DEFAULT_VOCAB = 100

export const predictWordByPrefix = async (prefix, lang) => {
    if (lang === EN_LANG) {
        let response = await fetch(
            `https://api.imagineville.org/word/predict?prefix=${prefix}&vocab=${DEFAULT_VOCAB}k&num=${MAX_PREDICTS_COUNT}`
        )

        let json = await response.json()

        return json?.results.map(predict => predict['text'] ?? "")
    }

    if (localServiceLanguage.includes(lang)) {
        let response = await fetch(`/predict/${lang}/${prefix}`);
        let predicts = await response.json()

        return predicts?.map(predict => predict['word'] ?? "")
    }

    return []
}
