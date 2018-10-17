var tom = {
    id: '1',
    name: 'qian_xie',
    age: 18,
    "class": '软件133'
};
var Animal = /** @class */ (function () {
    function Animal(name, _age) {
        this._age = _age;
        this._name = name;
    }
    Animal.prototype.Action = function () {
        console.log('I am a animal');
    };
    return Animal;
}());
