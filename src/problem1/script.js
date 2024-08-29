// Iterative approach using a loop
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// Recursive Approach
var sum_to_n_b = function (n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_b(n - 1);
  }
};

// Math formula
var sum_to_n_c = function (n) {
  return n * ((n + 1) / 2); // It may be (n * (n + 1)) / 2
};
