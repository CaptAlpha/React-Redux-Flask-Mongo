import React, { useEffect } from 'react';
import {Navbar, Table, Form, Container, Col, Button, ButtonGroup, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { loadUsers } from './redux/actions';


function Home() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => Array.from(state.data));
    useEffect(() => {
        dispatch(loadUsers());
    },[])

  return (
      <>
    <Navbar bg="dark" variant="dark" className="justify-content-center" >
    <Navbar.Brand href="#home">React+Flask</Navbar.Brand>
    </Navbar>
    <h1>Home</h1>
    <Container>
    <Row>
        <Col md={4}>Form</Col>
        <Col md={8}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Action</th>

                    </tr>
                </thead>
                {users && users.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.address}</td>
                            <td>
                                <ButtonGroup>
                                    <Button variant="primary">Edit</Button>
                                    <Button variant="danger">Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>

                    </tbody>
                ))}
            </Table>
        </Col>

    </Row>
    </Container>
    </>
    );
}

export default Home;
