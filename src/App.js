import { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import API from "./utils/API.js";
import Jumbo from "./components/Jumbo.js";
import "./App.css";

class App extends Component {
  state = {
    search: "",
    ogEmployees: [],
    employees: [],
  };
  componentDidMount() {
    API.getUsers()
      .then((res) => {
        console.log(res.data);
        this.setState({
          ogEmployees: res.data.results,
          employees: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    const filteredPeople = this.state.ogEmployees.filter(
      (employee) =>
        employee.name.first.toLowerCase().startsWith(value.toLowerCase()) ||
        employee.name.last.toLowerCase().startsWith(value.toLowerCase())
    );

    // Updating the input's state
    this.setState({
      [name]: value,
      employees: filteredPeople,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <Jumbo />
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for a person"
              onChange={this.handleInputChange}
              name="search"
              value={this.state.search}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{employee.name.first}</td>
                <td>{employee.name.last}</td>
                <td>{employee.login.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
