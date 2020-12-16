import React, {useEffect} from "react";
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import FeedArticlesContainer from "./components/FeedArticlesContainer";
import {setAuth, setFeeds} from "./redux/store";
import {connect} from "react-redux";
import Header from "./components/Header";
import OneArticleContainer from "./components/OneArticleContainer";

function App({setFeeds, setAuth}) {


    useEffect(() => {
        !!localStorage.getItem('isAuth') && setAuth(true)
        if (!localStorage.getItem('feeds')) {
            localStorage.setItem('feeds', 'Reddit,NASA Breaking news,Mobile World Live')
        }
        setFeeds([
            ...localStorage.getItem('feeds').split(',').map((item) => item)
        ])
        localStorage.setItem('Reddit'.toLowerCase(), 'https://www.reddit.com/.rss')
        localStorage.setItem('NASA Breaking news'.toLowerCase(), 'https://www.nasa.gov/rss/dyn/breaking_news.rss')
        localStorage.setItem('Mobile World Live'.toLowerCase(), 'https://www.mobileworldlive.com/latest-stories/feed')
    }, [])

    return (
        <BrowserRouter>
            <Header/>
            <Route  path='/login' render={() => <Login/>}/>
            <Route  path='/home' render={() => <HomePage/>}/>
            <Route  path='/articles/:name' render={() => <FeedArticlesContainer/>}/>
            <Route exact path='/:articleId' render={() => <OneArticleContainer/>}/>
        </BrowserRouter>
    )
}

export default connect(null, {setFeeds, setAuth})(App);
