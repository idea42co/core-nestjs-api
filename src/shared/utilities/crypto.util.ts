import * as crypto from "crypto";

export class CryptoUtil {
  static getHash(value: string): string {
    return crypto.createHash("sha256").update(value).digest("hex");
  }
}
