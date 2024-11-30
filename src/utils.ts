export async function sleep(s: number) {
  return new Promise<void>((r) => setTimeout(() => r(), s * 1000));
}
