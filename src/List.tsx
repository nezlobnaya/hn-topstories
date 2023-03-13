import { Button, Pagination } from "react-bootstrap";
import { useCallback, useEffect, useMemo, useState } from "react";

import Story from "./Story";
import { getStoriesArray } from "./aux/helpers";

interface TopStory {
  id: number;
}

interface Props {
  topstories: TopStory[];
}


interface Story {
  id: number;
  title: string;
  url: string;
  text: string;
  score: number;
  by: string;
  time: number;
}

enum SortMode {
  TIME = "time",
  SCORE = "score",
}

const List = ({ topstories }: Props) => {
  const [storiesArray, setStoriesArray] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(20);

  useEffect(() => {
    setIsLoading(true);
    getStoriesArray(topstories)
      .then((apiStoriesData: any) => {
        setStoriesArray(apiStoriesData);
        setIsLoading(false);
      });
  }, [topstories]);

  const sortByTime = useCallback((a: Story, b: Story) => {
    return b.time - a.time;
  }, []);

  const sortByScore = useCallback((a: Story, b: Story) => {
    return b.score - a.score;
  }, []);

  const sortStoriesArray = useCallback((sortBy: SortMode) => {
    const sortMode = sortBy === SortMode.TIME ? sortByTime : sortByScore;
    setStoriesArray((stories) => [...stories.sort(sortMode)]);
  }, []);



  const currentStories = useMemo(() => {
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    return storiesArray.slice(indexOfFirstStory, indexOfLastStory);
  }, [currentPage, storiesArray, storiesPerPage]);


  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
              onClick={() => sortStoriesArray(SortMode.TIME)}
            >
              Sort by Time
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => sortStoriesArray(SortMode.SCORE)}
            >
              Sort by Score
            </Button>
          </div>
          {currentStories.map((story: Story) => {
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
          {storiesArray.length > storiesPerPage && (
            <Pagination>
              {[...Array(Math.ceil(storiesArray.length / storiesPerPage))].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </>
  );
};

export default List;
