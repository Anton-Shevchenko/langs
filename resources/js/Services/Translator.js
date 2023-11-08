
export const translateText = async (text, from, to) => {
    let response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&dt=at&sl=${from}&tl=${to}&dt=t&q=${text}`
    )
    let json = await response.json()

    return await json[5][0][2].map(predict => predict[0] ?? "")
}

