import { render, screen, fireEvent } from "@testing-library/react";
import Formulario from "../src/app/page";

describe("Formulario", () => {
  it("genera URL corta al hacer clic", () => {
    render(<Formulario />);
    const input = screen.getByPlaceholderText("Insert your url");

    fireEvent.change(input, { target: { value: "https://www.google.com" } });
    fireEvent.click(screen.getByText("Generate"));

    expect(
      screen.getByLabelText("Generated URL")
    ).toBeInTheDocument();
  });
});
