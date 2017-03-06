import English from './localization/default-en';
import Dutch from './localization/default-nl';
import i18nJson from './localization/i18n';

let currentLanguage = 'en';

const languageBag = {};

class Localization {

    static init(i18nOn) {
        if (i18nOn) {
            Object.keys(i18nJson).forEach((key) => {
                Localization.set(key, i18nJson[key], currentLanguage);
            });
        } else {
            console.warn('In future Meister versions this localization method is deprecated. Set i18nEnabled to true in the Meister global object.');
            Object.keys(English).forEach((key) => {
                Localization.set(key, English[key], 'en');
            });

            Object.keys(Dutch).forEach((key) => {
                Localization.set(key, Dutch[key], 'nl');
            });
        }
    }

    static set(key, valueOrObj, language = currentLanguage) {
        // Create the language if it does not exist.
        if (!languageBag[language]) {
            languageBag[language] = {};
        }
        // no value or object use the key
        let value = key;
        if (typeof valueOrObj === 'object') {
            // it's a object its the i18n type
            value = valueOrObj[language];
        } else if (typeof valueOrObj === 'string') {
            // it's a string so use the deprecated method
            value = valueOrObj;
        }
        languageBag[language][key] = value;
    }

    static get(key, language = currentLanguage) {
        return languageBag[language][key];
    }

    static all(language = currentLanguage) {
        return languageBag[language];
    }

    static setLanguage(lang) {
        currentLanguage = lang;
    }
}

export default Localization;
