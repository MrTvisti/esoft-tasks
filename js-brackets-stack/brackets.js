function checkBrackets(str) {
    const stack = [];
    const pairs = {')': '(', ']': '[', '}': '{'};
    const openingBrackets = ['(', '[', '{'];
    const closingBrackets = [')', ']', '}'];
    let flag = true;
    for(let i = 0; i < str.length; i++) {
        if (openingBrackets.includes(str[i])) {
            stack.push(str[i]);
        }
        else if (closingBrackets.includes(str[i]) && stack.length == 0) {
            flag = false;
            break;
        }
        else if (pairs[str[i]] === stack[stack.length - 1]) {
            stack.pop();
            continue;
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag === true && stack.length == 0) {
        return true;
    }
    return false;
}
const testCases = [
    "()",
    "()[]{}",
    "(]",   
    "([)]",
    "{[]}",      
    "([]){}",   

    "((()))",      
    "",            
    "(()",         
    "())",         
    "abc",
    "((a))"         
];
for (let str of testCases) {
    if (!/^[()[\]{}]*$/.test(str)) {
        console.log(`'В строке "${str}" есть символы, не являющиеся скобками'`)
    }
    else if (str.length > 10**4) {
        console.log('В строке  слишком много символов');
    }
    else {
        console.log(str, '-', checkBrackets(str));
    }
}
