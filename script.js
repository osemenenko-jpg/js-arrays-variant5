const expenses = [
  { id: 1, name: "Продукти", amount: 1200, category: "food", date: "2026-03-10" },
  { id: 2, name: "Автобус", amount: 50, category: "transport", date: "2026-03-11" },
  { id: 3, name: "Інтернет", amount: 300, category: "utilities", date: "2026-03-12" },
  { id: 4, name: "Кава", amount: 90, category: "food", date: "2026-03-13" },
  { id: 5, name: "Таксі", amount: 250, category: "transport", date: "2026-03-14" }
];

console.log("Початковий масив витрат:", expenses);

// 1. Додавання витрати
const addExpense = (arr, newExpense) => {
  if (
    !newExpense.id ||
    !newExpense.name ||
    !newExpense.amount ||
    !newExpense.category ||
    !newExpense.date
  ) {
    console.log("Помилка: не всі поля заповнені");
    return arr;
  }

  return [...arr, newExpense];
};

// 2. Видалення витрати за id
const removeExpense = (arr, id) => {
  return arr.filter(expense => expense.id !== id);
};

// 3. Фільтрація за категорією
const filterByCategory = (arr, category) => {
  return arr.filter(expense => expense.category === category);
};

// 4. Загальна сума витрат
const getTotalAmount = arr => {
  return arr.reduce((sum, expense) => sum + expense.amount, 0);
};

const expensesAfterAdd = addExpense(expenses, {
  id: 6,
  name: "Книга",
  amount: 400,
  category: "education",
  date: "2026-03-15"
});

console.log("Після додавання:", expensesAfterAdd);

const expensesAfterRemove = removeExpense(expensesAfterAdd, 2);
console.log("Після видалення id=2:", expensesAfterRemove);

const foodExpenses = filterByCategory(expensesAfterRemove, "food");
console.log("Витрати категорії food:", foodExpenses);

const totalAmount = getTotalAmount(expensesAfterRemove);
console.log("Загальна сума витрат:", totalAmount);
// 5. Фільтрація за діапазоном дат
const filterByDateRange = (arr, startDate, endDate) => {
  return arr.filter(expense => expense.date >= startDate && expense.date <= endDate);
};

// 6. Статистика по категоріях
const getCategoryStats = arr => {
  return arr.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }

    acc[expense.category] += expense.amount;
    return acc;
  }, {});
};

// 7. Топ-3 найбільші витрати
const getTop3Expenses = arr => {
  return [...arr]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
};

// 8. Середня витрата
const getAverageExpense = arr => {
  if (arr.length === 0) return 0;

  const total = arr.reduce((sum, expense) => sum + expense.amount, 0);
  return total / arr.length;
};
const marchExpenses = filterByDateRange(expensesAfterRemove, "2026-03-10", "2026-03-13");
console.log("Витрати з 2026-03-10 по 2026-03-13:", marchExpenses);

const categoryStats = getCategoryStats(expensesAfterRemove);
console.log("Статистика по категоріях:", categoryStats);

const top3Expenses = getTop3Expenses(expensesAfterRemove);
console.log("Топ-3 витрати:", top3Expenses);

const averageExpense = getAverageExpense(expensesAfterRemove);
console.log("Середня витрата:", averageExpense);
// 9. runningTotal - накопичений підсумок
const runningTotal = arr => {
  const result = [];
  let sum = 0;

  for (const num of arr) {
    sum += num;
    result.push(sum);
  }

  return result;
};

// 10. movingAverage - ковзне середнє
const movingAverage = (arr, windowSize) => {
  if (windowSize <= 0 || windowSize > arr.length) {
    return [];
  }

  const result = [];

  for (let i = 0; i <= arr.length - windowSize; i++) {
    let sum = 0;

    for (let j = 0; j < windowSize; j++) {
      sum += arr[i + j];
    }

    result.push(sum / windowSize);
  }

  return result;
};

// 11. twoSum - знайти два числа, що дають target
const twoSum = (arr, target) => {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const needed = target - arr[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(arr[i], i);
  }

  return null;
};

// 12. maxSubarraySum - алгоритм Кадане
const maxSubarraySum = arr => {
  if (arr.length === 0) return 0;

  let maxCurrent = arr[0];
  let maxGlobal = arr[0];

  for (let i = 1; i < arr.length; i++) {
    maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
};
const numbers = [1200, 50, 300, 90, 250, 400];
console.log("Числовий масив:", numbers);

console.log("runningTotal:", runningTotal(numbers));
console.log("movingAverage (windowSize=3):", movingAverage(numbers, 3));
console.log("twoSum (target=350):", twoSum(numbers, 350));

const testArray = [4, -1, 2, 1, -5, 4];
console.log("Тестовий масив для Kadane:", testArray);
console.log("maxSubarraySum:", maxSubarraySum(testArray));
const output = document.getElementById("output");

output.innerHTML = `
<h3>Загальна сума:</h3>
<p>${totalAmount}</p>

<h3>Середня витрата:</h3>
<p>${averageExpense}</p>

<h3>Статистика по категоріях:</h3>
<pre>${JSON.stringify(categoryStats, null, 2)}</pre>

<h3>Топ-3 витрати:</h3>
<pre>${JSON.stringify(top3Expenses, null, 2)}</pre>

<h3>Running Total:</h3>
<pre>${JSON.stringify(runningTotal(numbers))}</pre>

<h3>Moving Average:</h3>
<pre>${JSON.stringify(movingAverage(numbers, 3))}</pre>

<h3>Two Sum (350):</h3>
<pre>${JSON.stringify(twoSum(numbers, 350))}</pre>

<h3>Max Subarray Sum:</h3>
<p>${maxSubarraySum(testArray)}</p>
`;