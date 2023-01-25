import moment from "moment";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { cleanText } from "./aux/helpers";

interface Props {
  id: number;
  title: string;
  url: string | undefined;
  text: string;
  score: number;
  by: string;
  time: number;
}

const Story = ({ id, title, url, text, score, by, time }: Props) => {

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
        </Card.Link>
        <ListGroup as="ul" horizontal="sm" className="list-group-flush">
          {/* commented out, for dev purposes only */}
          {/* <ListGroupItem as="li">ID: {id}</ListGroupItem> */}
          <ListGroupItem as="li">
            <Card.Text>
              Score: {score} By: {by} on {moment(time * 1000).format("llll")}
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
