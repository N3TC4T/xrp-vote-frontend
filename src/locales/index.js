import { I18n } from 'react-i18nify'
import th from './th.json'
import en from './en.json'
import pt from './pt.json'

I18n.setTranslations({
    th,
    en,
    pt
});

if(localStorage.getItem('locale') === null){
    localStorage.setItem('locale', 'en');
    I18n.setLocale('en');
}
else
{
    I18n.setLocale(localStorage.getItem('locale'));
}

Object.defineProperty(I18n, "all", {value : ['en', 'th', 'pt'],
    writable : false,
    enumerable : true,
    configurable : false
});


export default I18n
