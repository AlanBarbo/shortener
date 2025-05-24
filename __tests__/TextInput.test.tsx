import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "../src/components/TextInput";

describe("TextInput", () => {
  it("muestra el placeholder correctamente", () => {
    render(
      <TextInput
        id="test"
        name="test"
        value=""
        onChange={() => {}}
        placeholder="Escribe algo"
      />
    );

    expect(screen.getByPlaceholderText("Escribe algo")).toBeInTheDocument();
  });

  it("dispara el evento onChange correctamente", () => {
    const handleChange = jest.fn();

    render(
      <TextInput
        id="test"
        name="test"
        value=""
        onChange={handleChange}
        placeholder="Test"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Test"), {
      target: { value: "nueva entrada" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
