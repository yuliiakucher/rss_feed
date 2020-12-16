import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {setAuth} from "../redux/store";

const Header = ({isAuth, setAuth}) => {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('isAuth')
        setAuth(false)
        history.push('/login')
    }

    const handleClick = () => {
        history.push('/home')
    }

    return (
        <Navbar bg="dark" expand="lg" className="justify-content-between">
            <Navbar.Brand style={{color: 'white'}} onClick={handleClick}>RSS Feed</Navbar.Brand>
            <Nav>
                {isAuth &&
                <Nav.Link style={{color: 'white'}} onClick={handleLogout}>Log Out</Nav.Link>}
            </Nav>
        </Navbar>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
    }
}


export default connect(mapStateToProps, {setAuth})(Header);
