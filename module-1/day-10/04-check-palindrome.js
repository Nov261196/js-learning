function reverseString(text) {
    let result = "";

    for (let i = text.length - 1; i >= 0; i--) {
        result += text[i];
    }
    return result;
}

function isPalindrome(text) {
    return text === reverseString(text);
}

console.log(reverseString("madam"));