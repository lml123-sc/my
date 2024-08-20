/**
* 示例：

输入：S = "a1b2" 输出：["a1b2", "a1B2", "A1b2", "A1B2"]

输入：S = "3z4" 输出：["3z4", "3Z4"]

输入：S = "12345" 输出：["12345"]

提示：

S 的长度不超过12。 S 仅由数字和字母组成。
*/
function letterCasePermutation(str) {
  const len = str.length;
  const res = [];
  const backtrack = (index,current) => {
    if(index === len) {
      res.push(current);
      return;
    }
    const char = str.charAt(index);
    if (char >= 'a' && char <= 'z') {
      // 如果是小写字母，生成大小写两种情况
      backtrack(index + 1, current + char);
      backtrack(index + 1, current + char.toUpperCase());
    } else if (char >= 'A' && char <= 'Z') {
      // 如果是大写字母，生成大小写两种情况
      backtrack(index + 1, current + char);
      backtrack(index + 1, current + char.toLowerCase());
    } else {
      // 如果不是字母，直接继续下一个字符
      backtrack(index + 1, current + char);
    }
  }
  
    backtrack(0, '');
    return res;
}
console.log(letterCasePermutation("a1b2")); // ["a1b2", "a1B2", "A1b2", "A1B2"]