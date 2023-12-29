class Settings {

    constructor(lang, mode){
        this.lang = lang;
        this.mode = mode;
    }

}

export const settings = new Settings('ENG', 'light')