const getMinMax = (numbers) => {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const average = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;

  return [min, max, average];
};

const [min, max, average] = getMinMax([5, 2, 8, 1, 9, 3]);

console.log(min);
console.log(max);
console.log(average);