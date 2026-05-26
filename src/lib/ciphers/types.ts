export interface Cipher {
  id: string;
  encrypt(text: string, key?: any): string;
  decrypt(text: string, key?: any): string;
}
