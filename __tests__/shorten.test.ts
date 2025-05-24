import { shortenURL } from "../src/utils/functions/shorten";

describe("shortenURL", () => {
  it("debería acortar una URL correctamente", () => {
    const input = "https://www.google.com";
    const result = shortenURL(input, "http://localhost:3000");

    expect(result).toBe("http://localhost:3000/https://www");
  });

  it("debería lanzar error si la URL es vacía", () => {
    expect(() => shortenURL("")).toThrow("URL vacía");
  });

  it("usa el baseURL por defecto si no se proporciona", () => {
    const input = "abcde";
    const result = shortenURL(input);
    expect(result.startsWith("http://localhost:3000/")).toBe(true);
  });
});
