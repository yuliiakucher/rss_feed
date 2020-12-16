import React from "react";
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {addFeed, deleteFeed, setFeeds} from "../redux/store";
import {Redirect, useHistory} from 'react-router-dom'
import {ErrorMessage, Formik} from "formik";
import * as yup from "yup";

const HomePage = ({feeds, setFeeds, addFeed, deleteFeed}) => {

    const history = useHistory()

    const handleClick = (name) => {
        name = name.toLowerCase()
        history.push(`/articles/${name}`)
    }

    const handleDelete = (feed_id) => {
        deleteFeed(feed_id)
    }

    const initialValues = {
        name: '',
        url: ''
    }

    const onSubmit = values => {
        console.log(values)
        addFeed(values)
        localStorage.setItem(values.name.toLowerCase(), values.url)
        const new_feeds = localStorage.getItem('feeds').split(',')
        new_feeds.push(values.name)
        setFeeds(new_feeds)
        localStorage.setItem('feeds', new_feeds.join(','))
    }


    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        url: yup.string()
            .matches(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
                'Url is not valid').required('Url is required')
    })

    return (
        <>
            {!localStorage.getItem('isAuth')
                ? <Redirect to='/login'/>
                : <Container>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}>
                        {({
                              handleChange, handleBlur,
                              touched, errors, handleSubmit, isValid
                          }) => {
                            return (
                                <Form>
                                    <h4>Add new feed</h4>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className='w-50'
                                            name='name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.name && !errors.name}
                                        />
                                        <ErrorMessage name='name' component={Form.Text}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control
                                            className='w-50'
                                            name='url'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type='url'
                                            isValid={touched.url && !errors.url}/>
                                        {touched.url && errors.url ?
                                            <Form.Text>{errors.url} </Form.Text> : null}
                                    </Form.Group>
                                    <Button onClick={handleSubmit} disabled={!isValid}>Add</Button>
                                </Form>
                            )
                        }}
                    </Formik>
                    <hr/>
                    <ListGroup>
                        {feeds && feeds.map((feed, index) => (
                            <div className='d-flex flex-row m-2'>
                                <ListGroup.Item
                                    className='w-50'
                                    action
                                    key={index}
                                    onClick={() => handleClick(feed)}>
                                    {feed}
                                </ListGroup.Item>
                                <Button onClick={() => handleDelete(index)}>x</Button>
                            </div>
                        ))}
                    </ListGroup>
                </Container>
            }
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        feeds: state.feeds,
    }
}

export default connect(mapStateToProps, {setFeeds, addFeed, deleteFeed})(HomePage)
