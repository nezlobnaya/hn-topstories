import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Story from "./Story";
import { getStoriesArray } from "./aux/helpers";

interface TopStory {
  id: number;
}

interface Props {
  topstories: Array<TopStory>;
}

interface Story {
  id: number;
  title: string;
  url: string;
  text: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

enum SortMode {
  Time = "time",
  Score = "score",
}

const List = ({ topstories }: Props) => {
  const [storiesArray, setStoriesArray] = useState([] as Array<Story>);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getStoriesArray(topstories)
      .then((apiStoriesData: any) => {
        setStoriesArray(apiStoriesData);
        setIsLoading(false);
      });
  }, [topstories]);

  const sortByTime = (a: Story, b: Story) => {
    return b.time - a.time;
  };

  const sortByScore = (a: Story, b: Story) => {
    return b.score - a.score;
  };

  const sortStoriesArray = (sortBy: string) => {
    const sortMode = sortBy === SortMode.Time ? sortByTime : sortByScore
    storiesArray.sort(sortMode);
    setStoriesArray([...storiesArray]);
  };

  return (
    <>
      {isLoading ? (
        <p>Stories loading...</p>
      ) : (
        <>
          <div className="mb-2">
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => sortStoriesArray(SortMode.Time)}
            >
              Sort by Time
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => sortStoriesArray(SortMode.Score)}
            >
              Sort by Score
            </Button>
          </div>
          {storiesArray?.map((story: Story) => {
            return (
              <Story
                key={story.id}
                title={story.title}
                url={story.url}
                text={story.text}
                score={story.score}
                by={story.by}
                time={story.time}
                descendants={story.descendants}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default List;
