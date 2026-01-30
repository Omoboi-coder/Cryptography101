const A_CODE = "A".charCodeAt(0);
const Z_CODE = "Z".charCodeAt(0);
const a_CODE = "a".charCodeAt(0);
const z_CODE = "z".charCodeAt(0);

export function normalizeShift(shift) {
  const safe = Number.isFinite(shift) ? shift : 0;
  return ((safe % 26) + 26) % 26;
}

export function caesarTransform(text, shift, mode = "encrypt", preserveCase = true) {
  const normalized = normalizeShift(shift);
  const dir = mode === "decrypt" ? -1 : 1;
  const offset = dir * normalized;

  return Array.from(text).map((char) => {
    const code = char.charCodeAt(0);

    if (code >= A_CODE && code <= Z_CODE) {
      const next = ((code - A_CODE + offset + 26) % 26) + A_CODE;
      return String.fromCharCode(next);
    }

    if (code >= a_CODE && code <= z_CODE) {
      if (!preserveCase) {
        const upper = ((code - a_CODE + offset + 26) % 26) + A_CODE;
        return String.fromCharCode(upper);
      }

      const next = ((code - a_CODE + offset + 26) % 26) + a_CODE;
      return String.fromCharCode(next);
    }

    return char;
  }).join("");
}
