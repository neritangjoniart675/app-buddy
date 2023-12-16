/* 
Filename: ComplexCodeExample.js

Description: 
This complex JavaScript code demonstrates an advanced algorithm for calculating prime numbers using the Sieve of Eratosthenes method. It includes various helper functions and utilizes advanced concepts such as recursion and memoization.

Note: Please be aware that this code may take some time to execute depending on the input range due to the complexity of the algorithm.

Author: Your Name
Date: Date 

*/

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Function to generate an array of prime numbers using the Sieve of Eratosthenes algorithm
function generatePrimes(n) {
  const primes = Array(n + 1).fill(true);
  primes[0] = false;
  primes[1] = false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes.reduce((acc, curr, index) => (curr ? [...acc, index] : acc), []);
}

// Function to memoize the results to improve performance
function memoize(func) {
  const cache = {};
  return function (num) {
    if (num in cache) {
      return cache[num];
    }
    const result = func(num);
    cache[num] = result;
    return result;
  };
}

// Memoized version of the isPrime function
const memoizedIsPrime = memoize(isPrime);

// Recursive function to find all prime numbers within a range
function findPrimesInRange(start, end, primes = []) {
  if (start > end) {
    return primes;
  }
  if (memoizedIsPrime(start)) {
    primes.push(start);
  }
  return findPrimesInRange(start + 1, end, primes);
}

// Example usage:
const startRange = 1;
const endRange = 1000;
const primesInRange = findPrimesInRange(startRange, endRange);
console.log(`Primes between ${startRange} and ${endRange}:`);
console.log(primesInRange);