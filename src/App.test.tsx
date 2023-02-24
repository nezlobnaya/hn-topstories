import { act, render, screen } from "@testing-library/react";
import App from "./App";
import { getTopStoriesIdsArray } from "./aux/helpers";
import { describe } from "vitest";


describe("App", () => {
  it("renders the correct content", () => {
    render(<App />);

    expect(screen.getByText("Top Stories")).toBeInTheDocument();
    expect(screen.getByText("Stories loading...")).toBeInTheDocument();
  });
});

jest.mock("./aux/helpers", () => ({
  getTopStoriesIdsArray: jest.fn(() => Promise.resolve([1, 2, 3]))
}));

test("fetches and sets top stories on mount", async () => {
    await act(async () => {
        render(<App />);
    });

    expect(getTopStoriesIdsArray).toHaveBeenCalled();
    const container = screen.getByText("Top Stories");
    expect(container).toBeInTheDocument();
    jest.clearAllMocks();
});
