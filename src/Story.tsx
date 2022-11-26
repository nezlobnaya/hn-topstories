import moment from 'moment';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

interface Props {
    id: number;
    title: string;
    url: string | undefined;
    text: string | undefined;
    score: number;
    by: string;
    time: number;
}

const Story = ({ id, title, url, text, score, by, time }: Props) => {

    return (
        <Card 
            bg="light"
            className="mb-2"
        >
            <Card.Body className='m-1 p-1'>
                <Card.Link href={url} style={{ textDecoration: 'none'}} target="_blank" rel="noreferrer">{title}</Card.Link>
            <ListGroup as='ul' horizontal='sm' className="list-group-flush">
                {/* commented out, for dev purposes only */}
                {/* <ListGroupItem as="li">ID: {id}</ListGroupItem> */}
                <ListGroupItem as="li"><Card.Text>Score: {score} By: {by} on { moment(time * 1000).format('llll') }</Card.Text></ListGroupItem>
            </ListGroup>
            <Card.Text>{text?.replace(/[/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, '')}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Story

