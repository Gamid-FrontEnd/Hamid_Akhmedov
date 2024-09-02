# Problem 1
## Overview

This project demonstrates three unique implementations of a function that calculates the summation of all integers from `1` to `n`, where `n` is a given integer. 

## Implementations

### 1. Iterative approach (using a loop)

This implementation uses a simple `for` loop to iterate from `1` to `n`, accumulating the sum of the integers.

```javascript
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};
```

### 2. Recursive approach

This implementation uses recursion, where the function calls itself with n-1 until it reaches the base case of n === 1.

```javascript
var sum_to_n_b = function (n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_b(n - 1);
  }
};
```

### 3. Mathematical formula

This implementation uses the well-known mathematical formula for the sum of the first n natural numbers:

```javascript
var sum_to_n_c = function (n) {
  return n * ((n + 1) / 2); // It may be (n * (n + 1)) / 2
};
```



# Problem 2
## Overview

This project is a currency swap form that allows users to swap assets from one currency to another. The form is designed to be intuitive, visually appealing, and fully interactive with input validation and error handling.

## Features

- **Dynamic currency selection:** Users can select the input and output currencies from a dynamically generated list based on available tokens.
- **Interactive input:** Users can input the amount of the currency they wish to swap, and the form dynamically calculates the equivalent amount in the selected output currency.
- **SVG token icons:** Each currency is represented by an SVG icon fetched from a public repository, making the interface more visually informative.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
4. Open your browser and navigate to http://localhost:3000 to view the form.



# Problem 3
## Key improvements

### 1. Addition of `blockchain` property to `WalletBalance`

#### What was changed
- The `WalletBalance` interface was extended to include a new property: `blockchain`.
- This property allows each balance to be associated with a specific blockchain, which is essential for determining the priority of the balance.

#### Why it was changed
- **Priority calculation:** The `blockchain` property is necessary to determine the priority of each balance using the `getPriority` function.
- **Data integrity:** Distinguishing balances across different blockchains avoids confusion and ensures accurate handling of financial data.
- **Enhanced filtering and sorting:** With the `blockchain` property, balances can be more effectively filtered and sorted according to their priority, providing a better user experience.

### 2. Optimization of `getPriority` function calls

#### What was changed
- The `getPriority` function, which determines the priority of a balance based on its blockchain, was being called multiple times unnecessarily.
- The code was refactored to call `getPriority` only once per balance, and the resulting priority was cached.

#### Why it was changed
- **Performance improvement:** By reducing the number of calls to `getPriority`, the component became more efficient, especially when handling large datasets.
- **Code readability:** Centralizing the `getPriority` call made the code easier to understand and maintain.

### 3. Better Management of Function References

#### What was changed
- Functions like the one used to render rows were moved outside of JSX to avoid unnecessary re-renders.

#### Why it was changed
- **Avoiding unnecessary re-renders:** By defining functions outside of the JSX, the component prevents unnecessary re-renders, leading to improved performance.
- **Cleaner code:** This change leads to cleaner, more modular code, making it easier to maintain.
