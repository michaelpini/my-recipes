export class User {

    constructor(
        public id: string,
        public email: string,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) { }

    getValidMilliSeconds(): number | null{
        const milliSeconds = this._tokenExpirationDate.getTime() - new Date().getTime();
        return milliSeconds > 0 ? milliSeconds : null;
    }

    get token () {
        return this.getValidMilliSeconds() ? this._token : null;
    }
}
