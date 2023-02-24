import { render, screen } from "@testing-library/react";
import List from "./List";
import { describe } from "vitest";

describe("List", () => {
  it("renders the correct content", () => {

    render(<List topstories={[]} />); // Use the empty array here

    expect(screen.getByText("Stories loading...")).toBeInTheDocument();

    render(<List topstories={[]} />); // Use the empty array here

    expect(screen.getByText("No stories found.")).toBeInTheDocument();

    const topstories = [
      {
        id: 1,
        title: "Story 1",
        url: "http://example.com/story1",
        text: "Text for story 1",
        score: 100,
        by: "author1",
        time: 1615698967,
      },
      {
        id: 2,
        title: "Story 2",
        url: "http://example.com/story2",
        text: "Text for story 2",
        score: 50,
        by: "author2",
        time: 1615698982,
      },
    ];

    render(<List topstories={topstories} />);

    expect(screen.getByText("Story 1")).toBeInTheDocument();
    expect(screen.getByText("Story 2")).toBeInTheDocument();
  });
});
