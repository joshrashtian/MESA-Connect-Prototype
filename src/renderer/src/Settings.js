class Settings {

    constructor(lang, mode){
        this.lang = lang;
        this.mode = mode;
    }

    getData() {
        return {lang: this.lang, mode: this.mode }
    }

}

export const globalSettings = new Settings('ENG', 'light')