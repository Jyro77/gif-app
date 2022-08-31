import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
    render(<App />);
    const title = screen.getByText(/Última búsqueda/i);
    expect(title).toBeInTheDocument();
});

test("search form could be used", async () => {
    render(<App />);
    const role = await screen.findByRole("textbox");
    const button = await screen.findByRole("button");

    fireEvent.change(role, { target: { value: "Matrix" } });
    fireEvent.click(button);

    const title = await screen.findByText("Matrix");
    expect(title).toBeVisible();
});
