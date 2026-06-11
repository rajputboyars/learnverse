// Curated JavaScript coding challenges. Tests run client-side in a sandboxed
// Web Worker; XP is awarded once per challenge server-side.
export const CHALLENGES = [
  {
    slug: 'sum-two-numbers',
    title: 'Sum of Two Numbers',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Implement `add(a, b)` that returns the sum of two numbers.',
    starter: 'function add(a, b) {\n  // your code here\n}',
    tests: `assertEqual(add(2, 3), 5);\nassertEqual(add(-1, 1), 0);\nassertEqual(add(10, 20), 30);`,
  },
  {
    slug: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Implement `reverse(str)` that returns the string reversed.',
    starter: 'function reverse(str) {\n  // your code here\n}',
    tests: `assertEqual(reverse("hello"), "olleh");\nassertEqual(reverse("abc"), "cba");\nassertEqual(reverse(""), "");`,
  },
  {
    slug: 'is-palindrome',
    title: 'Palindrome Check',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Implement `isPalindrome(str)` that returns true if the string reads the same forwards and backwards.',
    starter: 'function isPalindrome(str) {\n  // your code here\n}',
    tests: `assertEqual(isPalindrome("racecar"), true);\nassertEqual(isPalindrome("hello"), false);\nassertEqual(isPalindrome("abba"), true);`,
  },
  {
    slug: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Implement `fizzbuzz(n)` returning an array 1..n where multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz", else the number.',
    starter: 'function fizzbuzz(n) {\n  // return an array\n}',
    tests: `assertEqual(fizzbuzz(5), [1, 2, "Fizz", 4, "Buzz"]);\nassertEqual(fizzbuzz(15).pop(), "FizzBuzz");`,
  },
  {
    slug: 'max-of-array',
    title: 'Maximum of an Array',
    difficulty: 'medium',
    xp: 20,
    prompt: 'Implement `maxOf(arr)` that returns the largest number in an array.',
    starter: 'function maxOf(arr) {\n  // your code here\n}',
    tests: `assertEqual(maxOf([1, 5, 3]), 5);\nassertEqual(maxOf([-2, -5, -1]), -1);\nassertEqual(maxOf([42]), 42);`,
  },
  {
    slug: 'count-vowels',
    title: 'Count Vowels',
    difficulty: 'medium',
    xp: 25,
    prompt: 'Implement `countVowels(str)` that returns how many vowels (a, e, i, o, u) the string contains (case-insensitive).',
    starter: 'function countVowels(str) {\n  // your code here\n}',
    tests: `assertEqual(countVowels("hello"), 2);\nassertEqual(countVowels("AEIOU"), 5);\nassertEqual(countVowels("xyz"), 0);`,
  },
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'hard',
    xp: 30,
    prompt: 'Implement `twoSum(nums, target)` returning indices [i, j] of the two numbers that add up to target.',
    starter: 'function twoSum(nums, target) {\n  // return [i, j]\n}',
    tests: `assertEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);\nassertEqual(twoSum([3, 2, 4], 6), [1, 2]);`,
  },
];

export function getChallenge(slug) {
  return CHALLENGES.find((c) => c.slug === slug) || null;
}
