import React from 'react';
import {connect} from "react-redux";
import {setFeeds} from "../redux/store";
import {withRouter} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

const OneArticle = ({articles, article_id}) => {

    const article = articles.filter(article => article.title === article_id && article)

    console.log(article)

    const {title, content, link} = article[0]

    function createMarkup() {
        return {__html: content};
    }

    return (
        <Container>
            <Card>
                <Card.Img style={{maxWidth: '200px'}} src={article[0].enclosure && article[0].enclosure.url}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={createMarkup()}></Card.Text>
                    <Card.Link href={link}>Read more...</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default connect(null, {setFeeds})(OneArticle);
