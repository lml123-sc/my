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
  for (let i = s.length -1; i >= 0 ; i--) {
    if (s[i] === " ") {
      if (foundWord) break;
    } else {
      count++;
      foundWord = true;
    }
  }
  return count;
};
const arr = "luffy is still joyboy";
console.log("lengthOfLastWord(arr)", lengthOfLastWord(arr));
