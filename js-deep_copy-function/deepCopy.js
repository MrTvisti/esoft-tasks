function deepClone(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (visited.has(obj)) {
        return visited.get(obj);
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Map) {
        const clone = new Map();
        visited.set(obj, clone);
        for (const [key, value] of obj.entries()) {
            clone.set(deepClone(key, visited), deepClone(value, visited));
        }
        return clone;
    }

    if (obj instanceof Set) {
        const clone = new Set();
        visited.set(obj, clone);
        for (const value of obj.values()) {
            clone.add(deepClone(value, visited));
        }
        return clone;
    }

    const isArr = Array.isArray(obj);
    const clone = isArr ? [] : Object.create(Object.getPrototypeOf(obj));
    visited.set(obj, clone);
    const keys = Reflect.ownKeys(obj);
    for (const key of keys) {
        clone[key] = deepClone(obj[key], visited);
    }

    return clone;
}

const obj1 = { a: 1, b: { c: 2 } };
const copy1 = deepClone(obj1);
copy1.b.c = 99;
console.log("Тест 1 (Вложенность):", obj1.b.c === 2 && copy1.b.c === 99 ? "Пройден" : "Провален");

const obj2 = { arr: [1, 2, { d: 3 }], date: new Date(2023, 0, 1) };
const copy2 = deepClone(obj2);
copy2.arr[2].d = 100;
console.log("Тест 2 (Массивы и Date):", obj2.arr[2].d === 3 && copy2.arr[2].d === 100 ? "Пройден" : "Провален");

const obj3 = { myMap: new Map([['key', 'value']]), mySet: new Set([1, 2]) };
const copy3 = deepClone(obj3);
copy3.myMap.set('key', 'new_value');
console.log("Тест 3 (Map и Set):", obj3.myMap.get('key') === 'value' && copy3.myMap.get('key') === 'new_value' ? "Пройден" : "Провален");

const obj4 = { name: "Цикл" };
obj4.self = obj4;
const copy4 = deepClone(obj4);
console.log("Тест 4 (Циклическая ссылка):", copy4.self === copy4 && copy4.name === "Цикл" ? "Пройден" : "Провален");

const mySymbol = Symbol('test');
const obj5 = { 
    func: function() { return "hello"; }, 
    [mySymbol]: "symbol value" 
};
const copy5 = deepClone(obj5);
console.log("Тест 5 (Функции и Symbols):", 
    copy5.func() === "hello" && copy5[mySymbol] === "symbol value" ? "Пройден" : "Провален");

class MyClass {
    constructor() { this.val = 1; }
    myMethod() {}
}
const obj6 = new MyClass();
const copy6 = deepClone(obj6);
console.log("Тест 6 (Прототип):", Object.getPrototypeOf(copy6) === Object.getPrototypeOf(obj6) ? "Пройден" : "Провален");