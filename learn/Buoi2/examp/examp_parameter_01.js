const test = (value = "MAC DINH") => console.log(value);
    test(); // "MAC DINH"
    test(undefined); // "MAC DINH"
    test(null); // null
    test(0); // 0
    test(""); // ""
    test(false); // false

console.log(test());
console.log(test(undefined));
console.log(test(null));
console.log(test(0));
console.log(test(""));
console.log(test(false));
