import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import * as Parser from 'rss-parser';
import {FeedAPI} from "../api/api";

const SET_FEEDS = 'SET_FEEDS'
const SET_ARTICLES = 'SET_ARTICLES'
const SET_LOADING = 'SET_LOADING'
const SET_AUTH = 'SET_AUTH'



const parser = new Parser()

const initialState = {
    isLoading: true,
    articles: [],
    title: '',
    feeds: [],
    isAuth: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEEDS: {
            return {
                ...state,
                feeds: action.feeds
            }
        }
        case SET_ARTICLES: {
            return {
                ...state,
                articles: action.articles,
                title: action.title
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.payload
            }
        }
        default:
            return state
    }
}

export const setFeeds = (feeds) => ({type: SET_FEEDS, feeds})
const setArticles = (articles, title) => ({type: SET_ARTICLES, articles, title})
const setLoading = (payload) => ({type: SET_LOADING, payload})
export const setAuth = (payload) => ({type: SET_AUTH, payload})

export const getFeed = (url) => {
    return dispatch => {
        dispatch(setLoading(true))
        parser.parseURL(`https://cors-anywhere.herokuapp.com/${url}`)
            .then(response => {
                console.log(response)
                dispatch(setArticles(response.items, response.title))
                dispatch(setLoading(false))
            })
    }
}

export const addFeed = (data) => {
    return () => {
        FeedAPI.addFeed(data)
            .then(response => {
                console.log(response)
            })
    }
}

export const deleteFeed = (feed_id) => {
    return () => {
        FeedAPI.deleteFeed(feed_id)
            .then(response => {
                console.log(response)
            })
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
