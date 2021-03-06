import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";

export default class EditDetailsGoogle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_firstName: "",
      user_lastName: "",
      user_email: "",
      user_course: "",
      user_yearOfStudy: "matriculatingSoon", // default option
      user_username: "",
      user_googleAccount: false,
      isButtonDisabled: false,
      buttonVariant: "primary",
      regStatus: "Confirm details",
      errorMessage: null
    };
  }

  componentDidMount = () => {
    axios
      .get("/api/users/view", { withCredentials: true })
      .then((res) => {
        const user = res.data.content
        return this.setState({
          user_firstName: user.firstName,
          user_lastName: user.lastName,
          user_email: user.email,
          user_course: user.course === "notSelected" ? "" : user.course,
          user_yearOfStudy: user.yearOfStudy === "notSelected" ? "matriculatingSoon" : user.yearOfStudy,
          user_username: user.username,
          user_googleAccount: user.googleId ? true : false,
        })
      })
      .catch((err) => console.log(err));
  };

  onChangeFirstName = (e) => {
    this.setState({
      user_firstName: e.target.value,
    });
  }

  onChangeLastName = (e) => {
    this.setState({
      user_lastName: e.target.value,
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      user_email: e.target.value,
    });
  }

  onChangeCourse = (e) => {
    this.setState({
      user_course: e.target.value,
    });
  }

  onChangeYearOfStudy = (e) => {
    this.setState({
      user_yearOfStudy: e.target.value,
    });
  }

  onChangeUsername = (e) => {
    this.setState({
      user_username: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.user_firstName,
      lastName: this.state.user_lastName,
      email: this.state.user_email,
      course: this.state.user_course,
      yearOfStudy: this.state.user_yearOfStudy,
      username: this.state.user_username,
    };

    this.setState({
      isButtonDisabled: true,
      buttonVariant: "dark",
      regStatus: "Submitting details...",
    });

    axios
      .patch("/api/users/edit", newUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ redirectTo: "/" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: err.response.data.msg,
          isButtonDisabled: false,
          buttonVariant: "primary",
          regStatus: "Confirm details",
        })
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div style={{ marginTop: 10 }}>
          <div>
            <h3>Edit user details</h3>
          </div>
          <form onSubmit={this.onSubmit}>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={this.state.user_firstName}
                  onChange={this.onChangeFirstName}
                  disabled={this.state.user_googleAccount}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={this.state.user_lastName}
                  onChange={this.onChangeLastName}
                  disabled={this.state.user_googleAccount}
                />
              </Col>
            </Form.Row>
            <br></br>
            <Form.Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  value={this.state.user_email}
                  onChange={this.onChangeEmail}
                  disabled={this.state.user_googleAccount}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Course of Study"
                  className="form-control"
                  value={this.state.user_course}
                  onChange={this.onChangeCourse}
                  required
                />
              </Col>
            </Form.Row>
            <br></br>
            <div className="form-group">
              <label>Year of Study: </label>
              <select
                required
                className="form-control"
                value={this.state.user_yearOfStudy}
                onChange={this.onChangeYearOfStudy}
              >
                <option value="matriculatingSoon">Matriculating Soon</option>
                <option value="undergrad">Undergrad</option>
                <option value="masters">Masters</option>
                <option value="doctorate">Doctorate</option>
                <option value="others">Others</option>
              </select>
            </div>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  value={this.state.user_username}
                  onChange={this.onChangeUsername}
                  disabled={this.state.user_googleAccount}
                />
              </Col>
            </Form.Row>
            <br></br>
            <div className="form-group">
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={this.state.isButtonDisabled}
                variant={this.state.buttonVariant}
              >
                {this.state.regStatus}
              </Button>
              <p>{this.state.errorMessage}</p>
            </div>
          </form>
        </div>
      );
    }
  }
}