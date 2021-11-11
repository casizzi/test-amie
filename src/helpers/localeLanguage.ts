const localeLanguage = (locale : string) => {
    const languageNamesInEnglish = new (Intl as any).DisplayNames(['en'], { type: 'language' })
    return languageNamesInEnglish.of(locale)
}

export default localeLanguage