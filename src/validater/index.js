import { defineRule, configure } from 'vee-validate';
import { required, max, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';
import enNames from '../locales/enNames.json'
import jaNames from '../locales/jaNames.json'

defineRule('required', required)
defineRule('max', max)
defineRule('email', email)

const customLocalize = localize({
  en: {
    messages: en.messages,
    names: enNames
  },
  ja: {
    messages: ja.messages,
    names: jaNames
  }
})

setLocale('ja')

configure({
  generateMessage: customLocalize
})
