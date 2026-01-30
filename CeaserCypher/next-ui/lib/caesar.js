export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const charToNum = Object.fromEntries(
  alphabet.map((char, index) => [char, index + 1])
);
export const numToChar = Object.fromEntries(
  alphabet.map((char, index) => [index + 1, char])
);

export function encrypt(message, shift) {
  return message
    .toUpperCase()
    .split('')
    .map((char) => {
      if (charToNum[char]) {
        const num = charToNum[char];
        const shifted = ((num - 1 + shift) % 26) + 1;
        return numToChar[shifted];
      }
      return char;
    })
    .join('');
}

export function decrypt(message, shift) {
  return message
    .toUpperCase()
    .split('')
    .map((char) => {
      if (charToNum[char]) {
        const num = charToNum[char];
        const shifted = ((num - 1 - shift + 26) % 26) + 1;
        return numToChar[shifted];
      }
      return char;
    })
    .join('');
}
