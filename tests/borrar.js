function filterDuplicates(data) {
  // Write your code here
  // To debug: console.error('Debug messages...');

  return [...new Set(data)];
}

// console.log(filterDuplicates([1, 1, 2, 4, 4, 5]));

// JavaScript code​​​​​​‌​​‌​‌‌​​‌​‌​​​​​​​‌‌‌‌‌‌ below
// Use printErr(...) to debug your solution.

// function customSort(table, criteria) {
//   // Your code goes here
//   let arr = table.sort((a, b) => {
//     // console.log(a.key);
//     // console.log(b.key);
//     return b.key - a.key;
//   });
//   console.log(arr);
//   return arr;
// }
function customSort(table, criteria) {
  // Your code goes here
  return table.sort((a, b) => b.key - a.key);
}
var a = [
  { key: 6 },
  { key: 9 },
  { key: 2 },
  { key: 1 },
  { key: 12 },
  { key: 63 },
  { key: 20 },
  { key: 25 },
  { key: 13 },
  { key: 19 },
  { key: 32 },
  { key: 70 },
  { key: 14 },
  { key: 7 },
  { key: 8 },
];
console.log(customSort(a, "key"));
