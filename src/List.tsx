import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { getStoriesArray } from "./aux/helpers";
import Story from "./Story";

interface Props {
  topstories: Array<any>;
}

const List = ({ topstories }: Props) => {
  interface Story {
    id: number;
    title: string;
    url: string;
    text: string;
    score: number;
    by: string;
    time: number;
  }

  const [storiesArray, setStoriesArray] = useState([]);
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
    const sortMode = sortBy === "time" ? sortByTime : sortByScore
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
              onClick={() => sortStoriesArray("time")}
            >
              Sort by Time
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => sortStoriesArray("score")}
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
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default List;
