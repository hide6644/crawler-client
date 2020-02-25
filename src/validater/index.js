import Vue from "vue"
import { extend, localize } from "vee-validate"
import { required, max, email } from "vee-validate/dist/rules"
import en from "vee-validate/dist/locale/en.json"
import ja from "vee-validate/dist/locale/ja.json"
import enNames from '../locale/enNames.json'
import jaNames from '../locale/jaNames.json'

extend("required", required)
extend("max", max)
extend("email", email)

localize({
  en: {
    messages: en.messages,
    names: enNames
  },
  ja: {
    messages: ja.messages,
    names: jaNames
  }
})

let LOCALE = "ja"

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, "locale", {
  get() {
    return LOCALE
  },
  set(val) {
    LOCALE = val
    localize(val)
  }
})
