declare module "saltyhash" {
    class SaltyHash {
        /**
         * Hashes a given input with rounds (bcrypt-like with salt).
         * @param input - The input string to hash.
         * @param rounds - The number of rounds to apply during hashing (default: 12).
         * @param algorithm - The hashing algorithm to use (default: 'sha256').
         * @param version - The version of the hashing scheme (default: '2a').
         * @returns The hashed output, including the version, rounds, salt, and hash value.
         * @throws Error if input is empty, rounds are invalid, or algorithm is unsupported.
         */
        static hash(input: string, rounds?: number, algorithm?: string, version?: string): string;

        /**
         * Compares a password with a stored hash (with version support).
         * @param password - The plain password input to compare.
         * @param hashed - The stored hash value that contains the version, rounds, salt, and hash.
         * @returns True if the password matches the hash, false otherwise.
         * @throws Error if password or hashed value is invalid or if hash format is incorrect.
         */
        static comparePassword(password: string, hashed: string): boolean;

        /**
         * Performs constant-time string comparison to prevent timing attacks.
         * @param str1 - First string to compare.
         * @param str2 - Second string to compare.
         * @returns True if both strings are equal, false otherwise.
         */
        static constantTimeCompare(str1: string, str2: string): boolean;

        /**
         * Generates a salt using a Key Derivation Function (KDF).
         * @param input - The input string to derive salt.
         * @param rounds - Number of iterations for KDF (default: 100000).
         * @param algorithm - The algorithm to use for KDF (default: 'sha256').
         * @returns Generated salt.
         * @throws Error if input is empty, rounds are invalid, or algorithm is unsupported.
         */
        static generateSaltFromKDF(input: string, rounds?: number, algorithm?: string): string;
    }

    export = SaltyHash;
}
