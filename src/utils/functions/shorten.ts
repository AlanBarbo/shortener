export function shortenURL(originalUrl: string, baseURL: string = "http://localhost:3000"): string {
  if (!originalUrl) throw new Error("URL vacía");

  const shortened = originalUrl.slice(0, Math.ceil(originalUrl.length / 2));
  return `${baseURL}/${shortened}`;
}
