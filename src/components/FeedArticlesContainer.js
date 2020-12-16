import React, {useEffect} from 'react';
import {Container, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {getFeed} from "../redux/store";
import {withRouter} from "react-router-dom";
import FeedArticles from "./FeedArticles";

const FeedArticlesContainer = ({isLoading, match, articles, getFeed, title}) => {

    useEffect(() => {
        getFeed(localStorage.getItem(match.params.name))
    }, [])

    return (
        <Container>
            {isLoading
                ? <Spinner animation="border" variant="info"/>
                : <FeedArticles articles={articles} title={title}/>
            }
        </Container>
    );
};

let mapStateToProps = (state) => {
    return {
        articles: state.articles,
        title: state.title,
        isLoading: state.isLoading
    }
}

export default withRouter(connect(mapStateToProps, {getFeed})(FeedArticlesContainer));




