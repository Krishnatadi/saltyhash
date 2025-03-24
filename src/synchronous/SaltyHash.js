const crypto = require('crypto');

class SaltyHash {
  /**
   * Static method to hash a given input with rounds (bcrypt-like with salt).
   * @param {string} input - The input string to hash.
   * @param {number} rounds - The number of rounds to apply during hashing. Default is 12.
   * @param {string} algorithm - The hashing algorithm to use. Default is sha256.
   * @param {string} version - The version of the hashing scheme. Default is '2b'.
   * @returns {string} - The hashed output, including the version, rounds, salt, and hash value.
   */
  static hash(input, rounds = 12, algorithm = 'sha256', version = '2a') {
    // Validate rounds
    if (!input || input.trim() === '') {
      throw new Error('Input password is required and cannot be empty.');
    }     
    // Validate rounds
    if (typeof rounds !== 'number' || rounds <= 0) {
      throw new Error('Rounds must be a positive number.');
    }
    if (!crypto.getHashes().includes(algorithm)) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    if (version.length !== 2) {
      throw new Error('Version must be exactly 2 characters.');
    }


    // Generate a random salt using pbkdf2Sync (Key Derivation Function)
    const salt = crypto.pbkdf2Sync(input, crypto.randomBytes(16), rounds, 22, algorithm).toString('base64').slice(0, 22); // Ensure it is exactly 22 characters long

    // Initialize the hash value with the input and salt
    let hash = input + salt;

    // Apply rounds for hashing using the specified algorithm
    for (let i = 0; i < rounds; i++) {
      const hashObj = crypto.createHash(algorithm);
      hashObj.update(hash);
      hash = hashObj.digest('hex'); // Update the hash after each round
    }

    // Ensure the hash is 31 characters long (by taking the first 31 characters of the hash)
    const finalHash = hash.slice(0, 31); // Take only the first 31 characters of the hash

    // Format the hash with version, rounds, salt, and hash value
    return `$${version}$${rounds}$${salt}${finalHash}`; // Format: $version$rounds$salt$hash
  }

  /**
   * Compares a password with a stored hash (with version support).
   * @param {string} password - The plain password input to compare.
   * @param {string} hashed - The stored hash value that contains the version, rounds, salt, and hash.
   * @returns {boolean} - True if the password matches the hash, false otherwise.
   */
  static comparePassword(password, hashed) {
    // Validate password
    if (!password || password.trim() === '') {
      throw new Error('Password is required and cannot be empty.');
    }
    // Validate hashed value
    if (!hashed || hashed.trim() === '') {
      throw new Error('Hash value is required and cannot be empty.');
    }
    // Split the stored hash based on `$` to extract the relevant components
    const parts = hashed.split('$');
    
    // Check if the hash is in the correct format
    if (parts.length !== 4) {
      throw new Error('Invalid hash format');
    }

    // Extract version, rounds, salt, and hash from the stored hash
    const version = parts[1];
    const rounds = parts[2];   // Example: 12
    const saltHash = parts[3]; // Example: 22-character salt


    // Extract version, rounds, salt, and hash from the stored hash
    if (version.length !== 2) {
      throw new Error('Version must be exactly 2 characters.');
    }


    // Extract salt and hash from the full saltHash string
    const saltFromHash = saltHash.slice(0, 22); // First 22 characters are the salt
    const storedHash = saltHash.slice(22);      // The remaining characters are the hash

    // Validate the salt length (must be exactly 22 characters)
    if (saltFromHash.length !== 22) {
      throw new Error("Invalid salt length.");
    }

    // Validate hash length (must be exactly 31 characters)
    if (storedHash.length !== 31) {
      throw new Error("Invalid hash length.");
    }

    // Recreate the hash with the provided password, salt, and rounds
    let hash = password + saltFromHash;

    // Apply rounds for hashing using the specified algorithm
    const algorithm = 'sha256'; // Default algorithm
    for (let i = 0; i < parseInt(rounds); i++) {
      const hashObj = crypto.createHash(algorithm);
      hashObj.update(hash);
      hash = hashObj.digest('hex');
    }

    // Ensure the recreated hash is 31 characters long
    const finalHash = hash.slice(0, 31);

    // Compare the calculated hash with the stored hash and return true or false
    return finalHash === storedHash;
  }

  /**
   * Constant-time string comparison to prevent timing attacks.
   * @param {string} str1 - First string to compare.
   * @param {string} str2 - Second string to compare.
   * @returns {boolean} - True if both strings are equal, false otherwise.
   */
  static constantTimeCompare(str1, str2) {
    if (str1.length !== str2.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < str1.length; i++) {
      result |= str1.charCodeAt(i) ^ str2.charCodeAt(i);
    }

    return result === 0;
  }


  /**
   * Generates a salt from a Key Derivation Function (KDF).
   * @param {string} input - The input string to derive salt.
   * @param {number} rounds - Number of iterations for KDF.
   * @param {string} algorithm - The algorithm to use for KDF.
   * @returns {string} - Generated salt.
   */
  static generateSaltFromKDF(input, rounds = 100000, algorithm = 'sha256') {
    // Validate inputs
    if (!input || input.trim() === '') {
      throw new Error('Input password is required and cannot be empty.');
    }     
    // Validate rounds
    if (typeof rounds !== 'number' || rounds <= 0) {
      throw new Error('Rounds must be a positive number.');
    }
    if (!crypto.getHashes().includes(algorithm)) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }

    const salt = crypto.pbkdf2Sync(input, crypto.randomBytes(16), rounds, 22, algorithm).toString('base64').slice(0, 22);
    return salt;
  }
}

module.exports = SaltyHash;
