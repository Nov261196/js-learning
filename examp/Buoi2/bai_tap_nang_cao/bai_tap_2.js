const createGreeting = (template) => {
    return (name) => `${template}${name}`;
}


const formalGreet = createGreeting("Kinh gui ");
const casualGreet = createGreeting("Chao ");

console.log(formalGreet("Thay Phong")); // "Kinh gui Thay Phong!"
console.log(casualGreet("An")); // "Chao An!"


