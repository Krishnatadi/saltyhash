![NPM Version](https://img.shields.io/npm/v/saltyhash)
![GitHub Issues](https://img.shields.io/github/issues/krishnatadi/saltyhash)

# SaltyHash
`SaltyHash` is a robust, customizable password hashing library that supports various cryptographic algorithms. It provides both synchronous and asynchronous hashing methods, making it flexible for different applications.


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
```bash
$ npm install saltyhash
```
or
```bash
yarn add saltyhash
```


## Features

- **Secure Hashing:** Uses strong cryptographic algorithms.

- **Salt Generation:** Enhances security by preventing dictionary attacks.

- **Customizable Rounds & Versions:** Allows users to specify iterations and algorithm versions.

- **Comparison Methods:** Verifies hashed values securely.

- **Constant-Time Comparison:** Prevents timing attacks.

- **Cross-Platform Compatibility**: Works seamlessly in both Node.js and browser environments, increasing versatility for developers.



## Usage
### 1. Importing the Module
Before using any function, you must import SaltyHash:

``` javascript
const {SaltyHashSync, SaltyHashAsync} = require('SaltyHash');
```

### 2. Generating a Hashed Password (Synchronous)
This method immediately returns a hashed password.

```javascript
const hashedPassword = SaltyHashSync.hash('mypassword@1234');
console.log('Hashed Password1:', hashedPassword);
```
| Parameter          | Type    | Description                                             |
|--------------------|---------|---------------------------------------------------------|
| password           | String  | The plain text password to hash.                        |
| rounds (optional)  | Number  | The number of iterations for the hashing function (default: 12). |
| algorithm (optional)| String | The cryptographic algorithm used (default: sha256).     |
| version (optional) | String  | The hashing standard version (default: 2a).            |

Example with Custom Rounds & Algorithm

``` javascript
const hashedPassword = SaltyHashSync.hash('mypassword@1234', 12, 'sha256', '2b');
console.log('Hashed Password:', hashedPassword);
```

### 3. Generating a Hashed Password (Asynchronous)
If you prefer non-blocking operations, use the async version:
Note: Parameters (Same as hashSync)
```javascript
(async () => {
    const hashedPassword = await SaltyHashAsync.hash('mypassword');
    console.log('Hashed Password:', hashedPassword);
})();
```
Parameters (Same as hash Synchronous)
Example with Custom Parameters

``` javascript
(async () => {
    const hashedPassword = await SaltyHashAsync.hash('mypassword', 12, 'sha256', '2b');
    console.log('Hashed Password:', hashedPassword);
})();
```


### 4. Comparing a Password with a Hash (Synchronous)
Verifies if the given password matches the stored hashed password.
```javascript
const isMatch = SaltyHashSync.comparePassword('mypassword', hashedPassword);
console.log('Do they match?', isMatch);
```

| Parameter       | Type    | Description                                      |
|-----------------|---------|--------------------------------------------------|
| password        | String  | The plain text password to verify.               |
| hashedPassword  | String  | The stored hashed password to compare against.   |

``` javascript
const isMatch = SaltyHashSync.comparePassword('mypassword', hashedPassword);
console.log(isMatch ? 'Password is correct!' : 'Invalid password.');
```


### 5. Comparing a Password with a Hash (Asynchronous)
The async version for checking password validity.
```javascript
(async () => {
    const isMatch = await SaltyHashAsync.comparePassword('mypassword', hashedPassword);
    console.log('Do they match?', isMatch);
})();
```
``` javascript
(async () => {
    const isMatch = await SaltyHashAsync.comparePassword('mypassword', hashedPassword);
    console.log(isMatch ? 'Password is correct!' : 'Invalid password.');
})();
```


### 6. Constant-Time Comparison (Synchronous)
Prevents timing attacks by ensuring comparisons always take the same time, regardless of input.
```javascript
const result = SaltyHashSync.constantTimeCompare('string1', 'string2');
console.log('Strings match securely:', result);
```
| Parameter | Type   | Description                 |
|-----------|--------|-----------------------------|
| string1   | String | First string to compare.    |
| string2   | String | Second string to compare.   |

``` javascript
const secureMatch = SaltyHashSync.constantTimeCompare('password123', 'password123');
console.log(secureMatch ? 'Match confirmed!' : 'Mismatch detected!');
```


### 7. Constant-Time Comparison (Asynchronous)
Prevents timing attacks by ensuring comparisons always take the same time, regardless of input.
```javascript
(async () => {
  try {
      const isMatch = await SaltyHashAsync.constantTimeCompare('mypassword', 'mypassword');
      console.log('Do they match?', isMatch);
  } catch (error) {
      console.error('Error during comparison:', error);
  }
})();
```


### 8. Generating a Salt (Using KDF)
Generates a secure salt using a Key Derivation Function (KDF).
Synchronous:
```javascript
const salt = SaltyHashSync.generateSaltFromKDF('mypassword');
console.log('Generated Salt:', salt);
```
| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| password  | String | The password used to generate the salt. |

``` javascript
const salt = SaltyHashSync.generateSaltFromKDF('securepass');
console.log('Securely Generated Salt:', salt);
```
Asynchronous:
``` javascript
(async () => {
      const isMatch = await SaltyHashAsync.generateSaltFromKDF('mypassword');
      console.log('Do they match?', isMatch);
})();
```



## Supported Hashing Algorithms
Supported Cryptographic Algorithms in `SaltyHash`
SaltyHash supports various hashing algorithms categorized based on their cryptographic nature and security level.

### 1. RSA-Based Hashing Algorithms
These algorithms combine RSA encryption with hashing for digital signatures and secure authentication.
| Algorithm       | Description                                                                    |
|-----------------|--------------------------------------------------------------------------------|
| RSA-MD5         | RSA encryption combined with the MD5 hashing algorithm (weak security).       |
| RSA-RIPEMD160   | RSA encryption with RIPEMD-160, an alternative to SHA1.                       |
| RSA-SHA1        | RSA encryption using SHA-1 (deprecated due to vulnerabilities).               |
| RSA-SHA1-2      | Variant of RSA-SHA1, used in some older cryptographic protocols.               |
| RSA-SHA224      | RSA encryption with SHA-224, a truncated version of SHA-256.                  |
| RSA-SHA256      | RSA encryption with SHA-256 (widely used, recommended).                       |
| RSA-SHA3-224    | RSA encryption with SHA3-224, a part of the SHA-3 family.                     |
| RSA-SHA3-256    | RSA encryption with SHA3-256 (more secure alternative to SHA-256).            |
| RSA-SHA3-384    | RSA encryption with SHA3-384.                                                 |
| RSA-SHA3-512    | RSA encryption with SHA3-512 (strongest SHA-3 variant).                       |
| RSA-SHA384      | RSA encryption with SHA-384 (stronger than SHA-256).                          |
| RSA-SHA512      | RSA encryption with SHA-512 (very strong security).                           |
| RSA-SHA512/224  | RSA with a truncated SHA-512 output (224 bits).                               |
| RSA-SHA512/256  | RSA with a truncated SHA-512 output (256 bits).                               |
| RSA-SM3         | RSA encryption combined with the SM3 hash function (China’s cryptographic standard). |


### 2. BLAKE2 Cryptographic Algorithms
BLAKE2 is a high-speed, cryptographic hashing function designed as a replacement for MD5 and SHA.
| Algorithm   | Description                                                             |
|-------------|-------------------------------------------------------------------------|
| blake2b512  | BLAKE2 hashing algorithm with 512-bit output (secure & faster than SHA).|
| blake2s256  | BLAKE2 variant with 256-bit output, optimized for lower-memory devices. |



### 3. SHA & SHA-3 Cryptographic Algorithms
SHA (Secure Hash Algorithm) and SHA-3 are widely used cryptographic functions.
| Algorithm   | Description                                                             |
|-------------|-------------------------------------------------------------------------|
| sha1        | SHA-1, now considered insecure due to collision vulnerabilities.        |
| sha224      | SHA-224, a truncated version of SHA-256.                                |
| sha256      | SHA-256, one of the most commonly used secure hash functions.           |
| sha384      | SHA-384, a stronger variant of SHA-256.                                 |
| sha512      | SHA-512, providing higher security but larger output.                   |
| sha3-224    | SHA-3 variant with a 224-bit output (more secure than SHA-224).         |
| sha3-256    | SHA-3 variant with a 256-bit output (alternative to SHA-256).           |
| sha3-384    | SHA-3 variant with a 384-bit output.                                    |
| sha3-512    | SHA-3 variant with a 512-bit output (highest security).                 |
| shake128    | SHAKE function with adjustable output length (128-bit security).        |
| shake256    | SHAKE function with 256-bit security (customizable hash length).        |
| sha512-256  | SHA-512 truncated to 256 bits for a balance of security and efficiency. |



### 4. MD5 & RIPEMD (Not Recommended)
These are older hash functions with known vulnerabilities.
| Algorithm             | Description                                                              |
|-----------------------|--------------------------------------------------------------------------|
| md5                  | MD5, a legacy hash function that is not secure for cryptographic purposes. |
| md5-sha1             | Combination of MD5 and SHA-1 hashing (not secure).                       |
| md5WithRSAEncryption | MD5 hashing combined with RSA encryption.                                |
| ripemd               | RACE Integrity Primitives Evaluation Message Digest (alternative to SHA-1). |
| ripemd160            | RIPEMD-160, similar to SHA-1 but with different structure.               |
| ripemd160WithRSA     | RIPEMD-160 combined with RSA encryption.                                 |
| rmd160               | Another name for ripemd160.                                              |



### 5. RSA-PKCS1 Hashing
Used for RSA signature verification.
| Algorithm                              | Description                                         |
|----------------------------------------|-----------------------------------------------------|
| id-rsassa-pkcs1-v1_5-with-sha3-224     | RSA PKCS#1 v1.5 signature using SHA3-224.          |
| id-rsassa-pkcs1-v1_5-with-sha3-256     | RSA PKCS#1 v1.5 signature using SHA3-256.          |
| id-rsassa-pkcs1-v1_5-with-sha3-384     | RSA PKCS#1 v1.5 signature using SHA3-384.          |
| id-rsassa-pkcs1-v1_5-with-sha3-512     | RSA PKCS#1 v1.5 signature using SHA3-512.          |



### 6. SSL/TLS Hashing Algorithms
Used in older SSL/TLS security protocols.
| Algorithm   | Description                                     |
|-------------|-------------------------------------------------|
| ssl3-md5    | MD5-based hash used in SSL 3.0 (not secure).    |
| ssl3-sha1   | SHA-1 hash used in SSL 3.0 (deprecated).        |



### 7. SM3 Cryptographic Algorithms
SM3 is a Chinese cryptographic standard for secure hashing.
| Algorithm             | Description                                              |
|-----------------------|----------------------------------------------------------|
| sm3                  | Secure hash function used in China’s cryptographic standard. |
| sm3WithRSAEncryption | SM3 hashing combined with RSA encryption.                |



### 8. RSA with Encryption
Used for RSA digital signatures.
| Algorithm                   | Description                                           |
|-----------------------------|-------------------------------------------------------|
| sha1WithRSAEncryption       | SHA-1 hash with RSA encryption (deprecated).          |
| sha224WithRSAEncryption     | SHA-224 with RSA encryption.                          |
| sha256WithRSAEncryption     | SHA-256 with RSA encryption (widely used).            |
| sha384WithRSAEncryption     | SHA-384 with RSA encryption.                          |
| sha512WithRSAEncryption     | SHA-512 with RSA encryption.                          |
| sha512-224WithRSAEncryption | SHA-512 (224-bit) with RSA encryption.                |
| sha512-256WithRSAEncryption | SHA-512 (256-bit) with RSA encryption.                |

### List all available algorithms:
``` javascript
console.log(saltyHashAlg.getHashes());
```



## Understanding Parameters

### Rounds
Determines how many iterations the hashing function performs.

- **Default**: 12  
- **Recommended**: 12-16 (higher = more security, but slower)

```javascript
const hashedPassword = SaltyHash.hashSync('mypassword', 14);
```

## Versions
Defines the hashing standard.

| Version | Description                     |
|---------|---------------------------------|
| 2a      | Default version for compatibility |
| 2b      | Improved security               |

```javascript
const hashedPassword = SaltyHash.hashSync('mypassword', 12, 'sha512', '2b');
```


## Use Cases  

### Security & Authentication  
- Developers working on **password hashing** can check available secure algorithms before applying them.  
- Ensures **compatibility** when using hash functions for **HMAC authentication, token generation, or digital signatures**.  

### Data Integrity Verification  
- Useful for **file integrity checking** by verifying the availability of cryptographic functions like SHA-256 or BLAKE2.  

### Blockchain & Cryptography Development  
- Blockchain developers can retrieve supported algorithms dynamically and ensure compatibility with hashing requirements.  

### Custom Cryptographic Libraries  
- Developers building cryptographic libraries can integrate **saltyhash** to retrieve and validate supported hashing functions dynamically.  

---

## Benefits  

**Lightweight & Efficient** - No unnecessary dependencies, ensuring faster execution.  
**Dynamic & Future-Proof** - Automatically retrieves available algorithms instead of hardcoding.  
**Extendable** - Easily modify the algorithm list or add custom functions.  
**Minimal Setup** - Just install and use with minimal configuration.
**Supports Both Synchronous & Asynchronous Methods** - Offers flexibility depending on your use case.  
**Optimized Performance** - Uses efficient hashing methods to minimize processing time.  


---

## Why Developers Should Use saltyhash  

**Saves Time** – No need to manually check supported hash functions.  
**Enhances Security** – Helps ensure secure algorithms are used.  
**Lightweight** – No unnecessary dependencies.  
**Highly Extendable** – Custom hashing functions can be added easily.  
**Browser Support** – Can be used in frontend projects via CDN.  



## Use SaltyHash in the Frontend  

You can easily integrate **SaltyHash** into your frontend applications using a CDN. This allows you to generate and verify hashes directly in the browser without any additional setup.  

### CDN Link  
[https://cdn.jsdelivr.net/npm/saltyhash@1.0.1/saltyhash.min.js](https://cdn.jsdelivr.net/npm/saltyhash@1.0.1/saltyhash.min.js)  


### Why Use the CDN?  
- **No Installation Needed** – Simply include the script tag in your HTML file.  
- **Fast & Efficient** – Loads directly from a global CDN with caching.  
- **Use in Any Web Project** – Works with vanilla JavaScript, React, Vue, or any frontend framework.  
- **Secure & Reliable** – Uses Node.js's crypto module, ensuring robust security.  

By including the above CDN, you can start using **SaltyHash** in your frontend applications instantly!


## Community and Ecosystem

By using **SALTY HASH**, you are joining a growing community of developers who are passionate about secure passwords. We encourage you to share your experiences, ideas, and feedback on GitHub Discussions or any community platform of your choice.

We welcome contributions! If you’d like to contribute, Share use cases, submit an issue or a pull request on GitHub.

We'd love to hear from you and see how you're using **SALTY HASH** in your projects!
Contributing


## Issues and Feedback

For issues, feedback, and feature requests, please open an issue on our [GitHub Issues page](http://github.com/krishnatadi/saltyhash/issues). We actively monitor and respond to community feedback.
