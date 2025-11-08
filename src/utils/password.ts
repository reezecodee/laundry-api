import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Membuat hash dari password plain text.
 * @param password Password mentah (plain text)
 * @returns Hash yang aman
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Membandingkan password plain text dengan hash.
 * @param password Password mentah (plain text)
 * @param hash Hash dari database
 * @returns boolean (true jika cocok)
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}