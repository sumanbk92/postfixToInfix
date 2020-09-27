function leftAssoc(char) {
    return char != '^';
}

function priority(char) {
    if (char == '^') return 3;
    if (char == '/') return 2;
    if (char == '*') return 2;
    if (char == '-') return 1;
    if (char == '+') return 1;
    return 0;
}

function associativity(char) {
    if (char == '^') return 5;
    if (char == '/') return 4;
    if (char == '*') return 3;
    if (char == '-') return 2;
    if (char == '+') return 1;
    return 0;
}

function isOperator(char) {
    let operators = ["^", "/", "*", "+", "-"];
    return operators.includes(char);
}

var print = function (exp) {
    if (typeof (exp) == 'string') return exp;

    var left = print(exp.left);
    var right = print(exp.right);

    if (typeof (exp.left) != 'string' && (priority(exp.left.op) < priority(exp.op) || (exp.left.op == exp.op && exp.op == '^'))) 
        left = '(' + left + ')';
    
    if (typeof (exp.right) != 'string' && (associativity(exp.right.op) <= associativity(exp.op) || (exp.left.op == exp.op && (exp.op == '-' || exp.op == '/'))))
        right = '(' + right + ')';

    return left + '' + exp.op + '' + right;
};

function postfixToInfix(expr) {
    expr = expr.split("").join(" ");

    var i = 0;
    function nextChar() {
        while (i < expr.length && expr[i] == ' ') i++;
        if (i == expr.length) return '';
        var b = '';
        while (i < expr.length && expr[i] != ' ') b += expr[i++];
        return b;
    }

    var stack = [], char;

    while ((char = nextChar(expr)) != '') {
        if (isOperator(char)) {
            if (stack.length < 2) return 'invalid';
            stack.push({op: char, right: stack.pop(), left: stack.pop()});
        } else {
            stack.push(char);
        }
    }
    if (stack.length != 1) return 'invalid';
    return print(stack.pop());
}

console.log(postfixToInfix("ab+c*"));
console.log(postfixToInfix("abc*+"));
console.log(postfixToInfix("abc/+*"));
