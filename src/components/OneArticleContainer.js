import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {setFeeds} from "../redux/store";
import {Container, Spinner} from "react-bootstrap";
import OneArticle from "./OneArticle";
import {withRouter} from "react-router-dom";

const OneArticleContainer = ({setFeeds, articles,isLoading, match}) => {

    const article_id = match.params.articleId

    useEffect(() => {
        setFeeds()
    })

    return (
        <Container>
            {isLoading || article_id === 'home'
            ? <Spinner animation="border" variant="info"/>
            : <OneArticle articles={articles} article_id={article_id}/>
            }

        </Container>
    );
};

let mapStateToProps = (state) => {
    return {
        articles: state.articles,
        isLoading: state.isLoading
    }
}

export default withRouter(connect(mapStateToProps, {setFeeds})(OneArticleContainer));
