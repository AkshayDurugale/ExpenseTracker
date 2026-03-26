import { render, screen } from "@testing-library/react";
import App from "./Pages/App";

test("renders app", () => {
  render(<App />);
  // Add a basic test that the app renders without crashing
  expect(document.body).toBeInTheDocument();
});
