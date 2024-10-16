# SaltyHash

**SaltyHash** is a robust password hashing library that combines salting and hashing to enhance security. It validates password strength to ensure secure authentication practices, making it an ideal choice for developers looking to protect user credentials effectively.


## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Examples](#examples)


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

To install `saltyhash`, use npm:
```console
$ npm install saltyhash
```


## Features

- **Password Hashing**: Securely hash passwords using salting to protect against rainbow table attacks.
- **Salt Generation**: Automatically generate secure, random salts for each password hash, ensuring unique hashes even for identical passwords.
- **Password Strength Validation**: Check if passwords meet configurable security requirements, including length, character diversity, and complexity.
- **Asynchronous Support**: Hash passwords asynchronously for better performance in non-blocking environments, making it suitable for web applications.
- **Password Comparison**: Easily verify plaintext passwords against their hashes, enabling secure login mechanisms.
- **User Management Functions**: Built-in support for user registration, login, and password changes, streamlining implementation in applications.
- **Customizable Security Policies**: Allow developers to configure password strength requirements to suit their application’s security needs.
- **Error Handling**: Provide meaningful error messages to guide users in case of failed operations or invalid inputs.
- **Cross-Platform Compatibility**: Works seamlessly in both Node.js and browser environments, increasing versatility for developers.



## Examples
### 1. Hashing a Password
This example demonstrates how to hash a strong password using the **saltyhash** library. It checks if the hashing was successful and prints the resulting hashed password.
```javascript
const SimpleHash = require('saltyhash');

const strongPassword = 'MySuperSecret1!';
const hashedResult = SimpleHash.hashWithSalt(strongPassword);

if (hashedResult.success) {
  console.log('Hashed Password:', hashedResult.hash);
} else {
  console.log(hashedResult.message);
}
// Expected Output: Hashed Password: $2a$12$<salt><hashed_password>

```

### 2. Comparing Passwords
In this example, a password is hashed and then compared to the original to verify if they match. If they match, it prints **true**.
```javascript
const SimpleHash = require('saltyhash');
const password = 'MySuperSecret1!';
const hashedPassword = SimpleHash.hashWithSalt(password);

if (hashedPassword.success) {
  const isMatch = SimpleHash.compare(password, hashedPassword.hash);
  console.log('Password matches:', isMatch); // Should print true
}
// Expected Output: Password matches: true

```

### 3. Handling Weak Passwords
This example illustrates how the library handles weak passwords. It attempts to hash a weak password and displays a message if it does not meet the strength requirements.
```javascript
const SimpleHash = require('saltyhash');
const weakPassword = 'weak';
const weakResult = SimpleHash.hashWithSalt(weakPassword);
console.log(weakResult.success ? 'Hashed Password:' + weakResult.hash : weakResult.message);
// Expected Output: Password does not meet strength requirements. Please ensure it is at least 8 characters long and includes uppercase, lowercase, numbers, and special characters.

```

### 4. Generating Multiple Hashes
This example shows how to generate and hash multiple passwords in a loop. It attempts to hash five different passwords and logs the results.
```javascript
const SimpleHash = require('saltyhash');
for (let i = 0; i < 5; i++) {
    const newPassword = `Password${i}1!`;
    const newHashed = SimpleHash.hashWithSalt(newPassword);
    if (newHashed.success) {
      console.log(`New Hashed Password ${i}:`, newHashed.hash);
    } else {
      console.log(newHashed.message);
    }
  }
  // Expected Output: New Hashed Password 0: $2a$12$<salt><hashed_password>
  // New Hashed Password 1: $2a$12$<salt><hashed_password>
  // New Hashed Password 2: $2a$12$<salt><hashed_password>
  // New Hashed Password 3: $2a$12$<salt><hashed_password>
  // New Hashed Password 4: $2a$12$<salt><hashed_password>

```

### 5. Asynchronous Hashing
This example demonstrates how to hash a password asynchronously. It uses the hashWithSaltAsync method and logs the result once the hashing is complete.
```javascript
const SimpleHash = require('saltyhash');
const passwordAsync = 'AnotherStrongPassword1!';

SimpleHash.hashWithSaltAsync(passwordAsync).then(asyncResult => {
  console.log(asyncResult.success ? 'Asynchronously Hashed Password:' + asyncResult.hash : asyncResult.message);
});
// Expected Output: Asynchronously Hashed Password: $2a$12$<salt><hashed_password>

```

### 6. Password Strength Checking
This example checks the strength of two passwords, one strong and one weak. It prints whether each password meets the strength criteria.
```javascript
const SimpleHash = require('saltyhash');
console.log('Is "MySuperSecret1!" a strong password?', SimpleHash.isStrongPassword('MySuperSecret1!')); // Should print true
console.log('Is "weak" a strong password?', SimpleHash.isStrongPassword('weak')); // Should print false
// Expected Output: Is "MySuperSecret1!" a strong password? true
// Is "weak" a strong password? false

```

### 7. Checking Password Strength with Different Passwords
You can validate the strength of various passwords easily:
```javascript
const SimpleHash = require('saltyhash');
const passwordsToCheck = ['simple', 'Complex123!', 'Another1!', 'weakpass', 'StrongPassword1!'];

passwordsToCheck.forEach(password => {
  const isStrong = SimpleHash.isStrongPassword(password);
  console.log(`Is "${password}" a strong password?`, isStrong); // true or false
});
// Expected Output:
// Is "simple" a strong password? false
// Is "Complex123!" a strong password? true
// Is "Another1!" a strong password? false
// Is "weakpass" a strong password? false
// Is "StrongPassword1!" a strong password? true

```


### 8. Validating User Login
You can validate a user's login by comparing the entered password with the stored hashed password:
```javascript
const SimpleHash = require('saltyhash');
const username = 'user1';
const enteredPassword = 'Admin123!';
// Initialize a user database with some example users
const users = {
    user1: SimpleHash.hashWithSalt('Admin123!').hash, // Hashed password for user1
    user2: SimpleHash.hashWithSalt('MyOldPassword2!').hash  // Hashed password for user2
  };
const storedHash = users[username];
const isLoginValid = SimpleHash.compare(enteredPassword, storedHash);

console.log(`Is the login valid for ${username}?`, isLoginValid); // Should print true or false
// Expected Output: Is the login valid for user1? true

```


### 9. Handling Multiple Users with Async Operations
You can handle multiple user registrations and hash their passwords asynchronously:
```javascript
const SimpleHash = require('saltyhash');
const userRegistrations = [
  { username: 'userA', password: 'UserA123!' },
  { username: 'userB', password: 'UserB!456' },
];

async function registerUsers(registrations) {
  const results = await Promise.all(
    registrations.map(async user => {
      const hashed = await SimpleHash.hashWithSaltAsync(user.password);
      return { username: user.username, hashed: hashed.success ? hashed.hash : hashed.message };
    })
  );
  console.log('Registration Results:', results);
}

registerUsers(userRegistrations);
// Expected Output: 
// Registration Results: [
//   { username: 'userA', hashed: '$2a$12$<salt><hashed_password>' },
//   { username: 'userB', hashed: '$2a$12$<salt><hashed_password>' }
// ]


```

### 10. Hashing and Validating API Keys
The library can also be used for hashing API keys:
```javascript
const SimpleHash = require('saltyhash');
const apiKey = 'mySuperSecretApiKey123!';
const hashedApiKey = SimpleHash.hashWithSalt(apiKey);

console.log('Hashed API Key:', hashedApiKey.success ? hashedApiKey.hash : hashedApiKey.message);
// Expected Output: Hashed API Key: $2a$12$<salt><hashed_api_key>
```

### 11. Logging Failed Attempts
You can keep track of failed password attempts for better security:
```javascript
const SimpleHash = require('saltyhash');
const failedAttempts = [];
// Initialize a user database with some example users
const users = {
    user1: SimpleHash.hashWithSalt('MyOldPassword1!').hash, // Hashed password for user1
    user2: SimpleHash.hashWithSalt('MyOldPassword2!').hash  // Hashed password for user2
  };
function login(username, enteredPassword) {
  const storedHash = users[username];
  if (storedHash) {
    const isValid = SimpleHash.compare(enteredPassword, storedHash);
    if (!isValid) {
      failedAttempts.push({ username, time: new Date() });
      console.log('Login failed for:', username);
    } else {
      console.log('Login successful for:', username);
    }
  } else {
    console.log('User not found:', username);
  }
}

login('user1', 'WrongPassword!'); // Example of a failed login
// Expected Output: Login failed for: user1

```

### 12. Password Change with Validation
You can implement a password change feature with validation:
``` javascript
const SimpleHash = require('saltyhash');
// Initialize a user database with some example users
const users = {
    user1: SimpleHash.hashWithSalt('MyOldPassword1!').hash, // Hashed password for user1
    user2: SimpleHash.hashWithSalt('MyOldPassword2!').hash  // Hashed password for user2
  };
  
function changePassword(username, oldPassword, newPassword) {
    const storedHash = users[username];
    if (storedHash && SimpleHash.compare(oldPassword, storedHash)) {
      const newHashed = SimpleHash.hashWithSalt(newPassword);
      if (newHashed.success) {
        users[username] = newHashed.hash;
        console.log(`Password changed successfully for ${username}.`);
      } else {
        console.log(newHashed.message);
      }
    } else {
      console.log('Old password is incorrect or user not found.');
    }
  }
  
  changePassword('user1', 'Admin123!', 'NewPassword1!');
  // Expected Output: Password changed successfully for user1.

```


### User Authentication System
user authentication system that utilizes the **saltyhash** package for a simple web application. This example will cover user registration, login, password management, and password strength validation, showcasing how developers can easily integrate the package into their applications
``` javascript
const SimpleHash = require('saltyhash');

// Simulate a user database
const users = {};

// Function to register a new user with password strength validation
function registerUser(username, password) {
  if (!SimpleHash.isStrongPassword(password)) {
    return console.log('Password does not meet strength requirements.');
  }
  const hashed = SimpleHash.hashWithSalt(password);
  if (hashed.success) {
    users[username] = hashed.hash;
    console.log(`User registered successfully: ${username}`);
  } else {
    console.log(hashed.message);
  }
}

// Function to login a user
function loginUser(username, password) {
  const storedHash = users[username];
  if (storedHash && SimpleHash.compare(password, storedHash)) {
    console.log(`Login successful for ${username}.`);
  } else {
    console.log('Invalid username or password.');
  }
}

// Function to change a user's password
function changePassword(username, oldPassword, newPassword) {
  const storedHash = users[username];
  if (storedHash && SimpleHash.compare(oldPassword, storedHash)) {
    const newHashed = SimpleHash.hashWithSalt(newPassword);
    if (newHashed.success) {
      users[username] = newHashed.hash;
      console.log(`Password changed successfully for ${username}.`);
    } else {
      console.log(newHashed.message);
    }
  } else {
    console.log('Old password is incorrect or user not found.');
  }
}

// Function to display all registered users (for admin purposes)
function listUsers() {
  console.log('Registered Users:', Object.keys(users).join(', ') || 'No users registered.');
}

// Example usage
registerUser('user1', 'MySuperSecret1!'); // Register a new user with a strong password
loginUser('user1', 'MySuperSecret1!');     // Login with correct password
changePassword('user1', 'MySuperSecret1!', 'MyNewPassword1!'); // Change password
loginUser('user1', 'MyNewPassword1!');     // Login with new password
listUsers(); // Display all registered users

```
