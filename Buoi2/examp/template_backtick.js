const name = "An";
const age = 20;
// Cach cu (ES5) — noi chuoi bang +
const msg1 = "Toi la " + name + ", " + age + " tuoi.";
// Cach moi (ES6) — template literal
const msg2 = `Toi la ${name}, ${age} tuoi.`;
// Co the viet bieu thuc trong ${}
const msg3 = `Nam sau toi ${age + 1} tuoi.`


console.log(msg1);
console.log(msg2);
console.log(msg3);
