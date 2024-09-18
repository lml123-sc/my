/**
* 设定两个指针

第一个指针start从数组第一个元素出发，向尾部前进

第二个指针end从数组的最后一个元素出发，向头部前进

start遍历到偶数，end遍历到奇数时，交换两个数的位置

当start>end时，完成交换
*/

const change = (value) => {
  if (Array.isArray(value)) {
    let start = 0;
    let end = value.length - 1;
    while (start < end) {
      while (value[start] % 2 === 0) {
        start++;
      }
      while (value[end] % 2 === 1) {
        end--;
      }
      if (start < end) {
        [value[start], value[end]] = [value[end], value[start]];
      }
    }
  }
  return value;
};
/**
* 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。
设定一个小索引left，从0开始
设定一个大索引right，从array.length开始
判断array[left] + array[right]的值s是否符合条件
符合条件 - 返回
大于sum，right向左移动
小于sum，left向右移动
若left=right，没有符合条件的结果
*/
const getSum = (array, sum) => {
  if (Array.isArray(array)) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
      const s = array[left] + array[right];
      if (s > sum) {
        right--;
      } else if (s < sum) {
        left++;
      } else {
        return [array[left], array[right]];
      }
    }
  }
  return [];
};

/**
* 输入一个正数S，打印出所有和为S的连续正数序列。

例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，5-6和7-8。
创建一个容器child，用于表示当前的子序列，初始元素为1,2

记录子序列的开头元素small和末尾元素big

big向右移动子序列末尾增加一个数 small向右移动子序列开头减少一个数

当子序列的和大于目标值，small向右移动，子序列的和小于目标值，big向右移动
*/
const getSum2 = (sum) => {
  const result = [];
  let child = [1, 2];
  let small = 1;
  let big = 2;
  let currentSum = 3;
  while (big < sum) {
    while (currentSum < sum && big < sum) {
      child.push(++big);
      currentSum += big;
    }
    while (currentSum > sum && small < big) {
      child.shift();
      currentSum -= small++;
    }
    if (currentSum === sum && child.length > 1) {
      result.push(child.slice());
      child.push(++big);
      currentSum += big;
    }
  }
  return result;
};
/**
* 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
使用一个map将遍历过的数字存起来，值作为key，下标作为值。

对于每一次遍历：

取map中查找是否有key为target-nums[i]的值
如果取到了，则条件成立，返回。
如果没有取到，将当前值作为key，下标作为值存入map
时间复杂度：O(n)

空间复杂度O(n)
*/
const getSum3 = (nums, target) => {};
/**
* 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

 

示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const n = nums.length;
  const newArr = new Array(n);
  for (let i = 0; i < n; ++i) {
    newArr[(i + k) % n] = nums[i];
  }
  for (let i = 0; i < n; ++i) {
    nums[i] = newArr[i];
  }

  return newArr;
};

/**
* 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。

单词 是指仅由字母组成、不包含任何空格字符的最大
子字符串
。

 

示例 1：

输入：s = "Hello World"
输出：5
解释：最后一个单词是“World”，长度为 5。
示例 2：

输入：s = "   fly me   to   the moon  "
输出：4
解释：最后一个单词是“moon”，长度为 4。
示例 3：

输入：s = "luffy is still joyboy"
输出：6
解释：最后一个单词是长度为 6 的“joyboy”。
*/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let count = 0;
  let foundWord = false;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === " ") {
      if (foundWord) break;
    } else {
      count++;
      foundWord = true;
    }
  }
  return count;
};
/**
* 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

返回 你能获得的 最大 利润 。

 

示例 1：

输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3。
最大总利润为 4 + 3 = 7 。
示例 2：

输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
最大总利润为 4 。
示例 3：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0。
*/
var maxProfit = function (prices) {
  let a = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      a += prices[i] - prices[i - 1];
    }
  }
  return a;
};
/**
* 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。

 

示例 1:

输入: s = "III"
输出: 3
示例 2:

输入: s = "IV"
输出: 4
示例 3:

输入: s = "IX"
输出: 9
示例 4:

输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
示例 5:

输入: s = "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
*/
var romanToInt = function (s) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanMap[s[i]];
    let prevValue = romanMap[s[i + 1]];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
  }
  return result;
};
const arr = "III"; // 58
console.log("lengthOfLastWord(arr)", romanToInt(arr));
