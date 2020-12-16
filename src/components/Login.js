import React from "react";
import {useHistory} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {ErrorMessage, Formik} from "formik";
import * as yup from 'yup'
import {connect} from "react-redux";
import {setAuth} from "../redux/store";
import {LoginAPI} from "../api/api";

const Login = ({setAuth}) => {

    let history = useHistory()

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = values => {
        console.log(values)
        localStorage.setItem('isAuth', 'true')
        LoginAPI.signIn(values)
        setAuth(true)
        history.push("/home")
    }


    const validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string()
            .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, 'Password is not valid')
            .required('Password is required')
    })


    return (
        <Container className='d-flex align-items-center justify-content-center'>
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
                            <h2 className='text-center m-4'>Sign in</h2>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    className='w-100'
                                    name='username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.username && !errors.username}
                                />
                                <ErrorMessage name='username' component={Form.Text}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type='password'
                                    isValid={touched.password && !errors.password}/>
                                {touched.password && errors.password ?
                                    <Form.Text>{errors.password} </Form.Text> : null}
                            </Form.Group>
                            <Button className='w-100' onClick={handleSubmit} disabled={!isValid}>Submit</Button>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
    )
}

export default connect(null,{setAuth})(Login)
