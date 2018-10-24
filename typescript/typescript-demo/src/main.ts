interface IPerson {
    readonly id: string,
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: IPerson = {
    id: '1',
    name: 'qian_xie',
    age: 24,
    class: '13软件3班'
};

class Animal {
    private _name: string;
    constructor(name: string, private _age: number) {
        this._name = name;
    }
    Action(): void {
        XQUtil.getFirstName('dog');
        console.log('I am a animal');
    }
}

