export const main = async (event: unknown): Promise<void> => {
  await Promise.resolve();

  console.log(JSON.stringify(event));
};
