export class Address {
    constructor(
           public country: string,
           public flag: string,
           public state: string,
           public city: string,
           public zip: string,
           public street: string
    ) { }
}
export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public imageUrl: string,
        public company: string,
        public email: string,
        public password: string,
        public confirmPassword: string,
        public phone: string,
        public address: Address
    ) { }
}


