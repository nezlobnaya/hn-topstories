import { Card, ListGroup, ListGroupItem } from "react-bootstrap";


interface Props {
  title: string;
  url: string | undefined;
  text: string;
  score: number;
  by: string;
  time: number;
}

const Story = ({ title, url, text, score, by, time }: Props) => {
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
