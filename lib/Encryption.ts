import crypto from "crypto";

export class EncryptionService {
  #key: Buffer;
  #IVLength = 16; //AES block size in bytes
  constructor(secretKey: string) {
    if (!secretKey || secretKey.length !== 64) {
      throw new Error("Invalid AES key: Must be 256-bit hex string");
    }
    this.#key = Buffer.from(secretKey, "hex");
  }

  encrypt = (text: string): string => {
    const iv = crypto.randomBytes(this.#IVLength);
    const Cipher = crypto.createCipheriv("aes-256-cbc", this.#key, iv);
    const encrypted = Buffer.concat([Cipher.update(text, "utf-8")]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  };

  decrypt = (encryptedText: string): string => {
    //break object like key:value pair into array for direct access
    const [ivHex, encryptedHex] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.#key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString("utf-8");
  };
}
