import { render, screen } from "@testing-library/react";
import Story from "./Story";
import { describe, it } from "vitest";


describe("Story", () => {
  it("renders the correct content", () => {
    const story = {
      id: 1,
      title: "Story 1",
      url: "http://example.com/story1",
      text: "Text for story 1",
      score: 100,
      by: "author1",
      time: 1615698967,
    };
    render(<Story {...story} />);

    expect(screen.getByText(story.title)).toBeInTheDocument();
    expect(screen.getByText(`Score: ${story.score} By: ${story.by}`)).toBeInTheDocument();
    expect(screen.getByText(story.text)).toBeInTheDocument();
  });

  it("renders the correct content when url is not provided", () => {
    const story = {
      id: 1,
      title: "Story 1",
      url: undefined,
      text: "Text for story 1",
      score: 100,
      by: "author1",
      time: 1615698967,
    };
    render(<Story {...story} />);

    expect(screen.getByText(story.title)).toBeInTheDocument();
    expect(screen.getByText(`Score: ${story.score} By: ${story.by}`)).toBeInTheDocument();
    expect(screen.getByText(story.text)).toBeInTheDocument();
  });

  it("renders the correct content when text is not provided", () => {
    const story = {
    id: 1,
    title: "Story 1",
    url: "http://example.com/story1",
    text: undefined,
    score: 100,
    by: "author1",
    time: 1615698967,
    };
    render(<Story {...story} />);
    expect(screen.getByText(story.title)).toBeInTheDocument();
    expect(screen.getByText(`Score: ${story.score} By: ${story.by}`)).toBeInTheDocument();
});
});