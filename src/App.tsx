import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { getTopStoriesIdsArray } from "./aux/helpers";
import List from "./List";

function App() {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    getTopStoriesIdsArray()
      .then((apiIdsData) => {
        setTopStories(apiIdsData);
      });
  }, []);

  return (
    <Container className="my-4">
      <h1>Top Stories</h1>
      {topStories.length === 0 ? <p>No stories found.</p> : <List topstories={topStories} />}
    </Container>
  );

}

export default App;
