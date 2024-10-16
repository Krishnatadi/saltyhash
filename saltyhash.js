class SimpleHash {
    static hash(input) {
      let hash = 0;
      for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return hash.toString(16); // Convert to hexadecimal
    }
  
    static generateSalt(length = 16) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let salt = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        salt += characters[randomIndex];
      }
      return salt;
    }
  
    static isStrongPassword(password) {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*]/.test(password);
      return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars
      );
    }
  
    static hashWithSalt(password, options = {}) {
      const isStrong = this.isStrongPassword(password);
      if (!isStrong) {
        return {
          success: false,
          message: 'Password does not meet strength requirements. Please ensure it is at least 8 characters long and includes uppercase, lowercase, numbers, and special characters.'
        };
      }
  
      const saltLength = options.saltLength || 16;
      const rounds = options.rounds || 12;
      const salt = this.generateSalt(saltLength);
      const hashedPassword = this.hash(password + salt);
      return {
        success: true,
        hash: `\$2a\$${rounds}\$${salt}${hashedPassword}`,
        salt,
        rounds,
      };
    }
  
    static async hashWithSaltAsync(password, options = {}) {
      return new Promise((resolve) => {
        const result = this.hashWithSalt(password, options);
        resolve(result);
      });
    }
  
    static compare(password, hashed) {
      const parts = hashed.split('$');
      if (parts.length < 4) return false; // Invalid hash format
      const salt = parts[3].slice(0, 16); // Extract the salt
      const newHash = this.hash(password + salt); // Hash the input password with the salt
      return newHash === parts[3].slice(16); // Compare the hash
    }
  }
  
  module.exports = SimpleHash;
  