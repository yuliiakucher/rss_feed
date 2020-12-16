import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const LoginAPI = ({
    signIn(data) {
        return (
            instance.post('users/', {...data})
        )
    }
})


export const FeedAPI = ({
    showFeeds(user_id) {
        return (
            instance.get(`/posts?userId=${user_id}`)
        )
    },
    addFeed(data) {
        return (
            instance.post('posts/', {...data})
        )
    },
    deleteFeed(feed_id) {
        return (
            instance.delete(`posts/${feed_id}`)
        )
    }
})
