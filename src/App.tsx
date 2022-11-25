import { useEffect, useState } from "react";
import List from "./List";
import { getTopStoriesIdsArray } from "./aux/helpers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {

  const [topStories, setTopStories] = useState([]);
 
  useEffect(() => {
    getTopStoriesIdsArray().then((apiIdsData) => {
        setTopStories(apiIdsData);
    }
)}, [])

  return (
    <Container className="my-4">
      <h1>Top Stories</h1>
        <List topstories={topStories}/>
    </Container>
  )
}

export default App
