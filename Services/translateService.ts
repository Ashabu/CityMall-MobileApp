import axios from 'axios';

class TranslateService {
    static events: Function[] = [];
    translate:any = {};
    lang: string | undefined;

    constructor() {
        this.translate = {};
    }

    //translates key to current language value
    t(key: string, ...params: any[]) {
        try {
            if (!key) return null;
            let parts = key.split('.');
            let value = this.translate;

            for (let part of parts) {
                value = value[part];
            }

            value = value || "";
            for (let i = 0; i < params.length; i++) {
                value = value.replace(new RegExp(`\\{${i}}`, "g"), params[i]);
            }

            return value;
        }
        catch (e) {
            return "";
        }
    }

    //set language
    use(lang: string, errCallback: (err: string) => void) {
        axios.get(`assets/translate/${lang}.json?v=1`).then(resp => {
            this.lang = lang;
            this.translate = resp.data;
            for (const e of TranslateService.events) {
                e(lang);
            }
        }).catch(err => {
            if (errCallback) errCallback(err);
        });
    }

    //register translation change event
    subscribe(fn: Function) {
        TranslateService.events.push(fn);

        return {
            unsubscribe: () => {
                const index = TranslateService.events.indexOf(fn);
                if (index != -1) TranslateService.events.splice(index, 1);
            }
        };
    }
}

export default new TranslateService();