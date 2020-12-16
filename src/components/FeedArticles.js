import React from 'react';
import {Col, Container, ListGroup} from "react-bootstrap";
import {useHistory} from 'react-router-dom'


const FeedArticles = ({articles, title}) => {
    console.log(articles)

    const history = useHistory()

    const handleClick = (title) => {
        history.push(`/${title}`)
    }
    return (
        <Container className='d-flex flex-column  align-items-center'>
            <h4 className='my-4 text-center'>{title}</h4>
            <Col lg={8}>
                {articles.map((article) => (
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={() => handleClick(article.title)}>{article.title}</ListGroup.Item>
                    </ListGroup>
                ))}
            </Col>

        </Container>
    );
};


export default FeedArticles




