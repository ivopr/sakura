/* eslint-disable @typescript-eslint/no-explicit-any */
export function ParseBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}
