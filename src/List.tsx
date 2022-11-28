import { getStoriesArray } from "./aux/helpers";
import { useState, useEffect } from "react";
import Story from "./Story";
import { Button } from "react-bootstrap";

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

  const [storiesArray, setStoriesArray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getStoriesArray(topstories).then((apiStoriesData: any) => {
      setStoriesArray(apiStoriesData);
      setIsLoading(false);
    });
  }, [topstories]);

  const fetchMoreStories = () => {
    setIsLoading(true);
    getStoriesArray(topstories).then((apiStoriesData: any) => {
      setStoriesArray([...storiesArray, apiStoriesData]);
      setIsLoading(false);
    });
  };

  const sortByTime = (a: Story, b: Story) => {
    return b.time - a.time;
  };

  const sortByScore = (a: Story, b: Story) => {
    return b.score - a.score;
  };

  const sortedByTimeStoriesArray = () => {
    storiesArray.sort(sortByTime);
    setStoriesArray([...storiesArray]);
  };

  const sortedByScoreStoriesArray = () => {
    storiesArray.sort(sortByScore);
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
              variant="outline-primary"
              className="mr-2"
              onClick={fetchMoreStories}
            >
              Fetch more stories
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={sortedByTimeStoriesArray}
            >
              Sort by Time
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={sortedByScoreStoriesArray}
            >
              Sort by Score
            </Button>
          </div>
          {storiesArray.map((story: Story) => {
            return (
              <Story
                key={story.id}
                id={story.id}
                title={story.title}
                url={story.url}
                text={story.text}
                score={story.score}
                by={story.by}
                time={story.time}
              />
            );
          })}
          {!isLoading && storiesArray.length === 0 && <p>No stories found.</p>}
        </>
      )}
    </>
  );
};

export default List;
