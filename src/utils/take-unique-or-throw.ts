export const takeUniqueOrThrow = <T extends object[]>(values: T): T[number] => {
  if (values.length !== 1) {
    throw new Error("Found non unique or inexistent value");
  }
  // biome-ignore lint/style/noNonNullAssertion: We know that the array has a length of 1
  return values[0]!;
};
