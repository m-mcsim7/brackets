module.exports = function check(str, bracketsConfig) {
  let bracketsConfigFlat = bracketsConfig.flat();
  const openBrackets = [bracketsConfigFlat[0]];
  const closeBrackets = [bracketsConfigFlat[1]];
  const sameBrackets = [];
  for (let i = 2; i < bracketsConfigFlat.length; i++) {
    if (i % 2 == 0) {
      openBrackets.push(bracketsConfigFlat[i]);
    } else {
      closeBrackets.push(bracketsConfigFlat[i]);
    }
  }
  for (let i = 1; i < bracketsConfigFlat.length; i++) {
    if (bracketsConfigFlat[i] === bracketsConfigFlat[i - 1]) {
      sameBrackets.push(bracketsConfigFlat[i]);
    }
  }
  let stack = [];
  let brackets = {};
  for (let i = 1; i < bracketsConfigFlat.length; i++) {
    brackets[bracketsConfigFlat[i]] = bracketsConfigFlat[i - 1];
  }
  function isClosedBrackets(ch) {
    return closeBrackets.indexOf(ch) > -1;
  }
  for (let i = 0; i < str.length; i++) {
    if (sameBrackets.indexOf(str[i]) > -1) {
      if (stack.indexOf(str[i]) > -1 && stack[stack.length - 1] == str[i]) {
        stack.pop(str[i]);
      } else {
        stack.push(str[i]);
      }
    }
    else if (isClosedBrackets(str[i])) {
      if (brackets[str[i]] !== stack.pop()) return false;
    } else {
      stack.push(str[i]);
    }
  }
  return stack.length === 0;
};
