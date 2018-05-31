import { I18n } from 'react-i18nify'
import en from './en.json'

I18n.setTranslations({
    en
});

if(localStorage.getItem('locale') === null){
    localStorage.setItem('locale', 'en');
    I18n.setLocale('en');
}
else
{
    I18n.setLocale(localStorage.getItem('locale'));
}

Object.defineProperty(I18n, "all", {value : ['en'],
    writable : false,
    enumerable : true,
    configurable : false
});


export default I18n
