import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import moment from "moment";
import { cleanText } from "./aux/helpers";

interface Props {
  title: string;
  url: string | undefined;
  text: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

const Story = ({ title, url, text, score, by, time, descendants }: Props) => {
  const cleanedText = cleanText(text);
  return (
    <Card bg="light" className="mb-2">
      <Card.Body className="m-1 p-1">
        <Card.Link
          href={url}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noreferrer"
        >
          {title}
          <br />
          {url}
        </Card.Link>
        <ListGroup as="ul" horizontal="sm" className="list-group-flush">
          <ListGroupItem as="li">
            <Card.Text>
              Score: {score} By: {by} on {moment(time * 1000).format("llll")} {descendants > 0 ? `|| Comments: ${descendants}` : ''}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
        <Card.Text>
          {cleanedText}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Story;
