import React, { Component } from "react";
import {
  Card,
  Box,
  Subhead,
  Small,
  Heading,
  Input,
  Label,
  Text,
  Divider
} from "rebass";
import Axios from "axios";
import { Icon, Menu, Sidebar, Segment, Button } from "semantic-ui-react";
import { Col, Row, Container } from "reactstrap";

class Rebass extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      Id: "",
      visible: false,
      activeItem: "formPage"
    };
  }

  componentDidMount() {
    fetch(
      "https://courses.theleangrouponlinetraining.com/mpsowners/customers.ashx"
    )
      .then(response => response.json())
      .then(users => {
        this.setState({ users: users });
      });
  }

  componentWillReceiveProps(nextProps) {
    const updateActiveItem =
      nextProps.activeItem && nextProps.activeItem !== this.state.activeItem;

    if (updateActiveItem) {
      this.setState({ activeItem: nextProps.activeItem });
    }
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSidebarHide = () => this.setState({ visible: false });

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.setState({ visible: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { FirstName, LastName, EmailAddress, Id } = this.state;
    Axios.post(
      "https://courses.theleangrouponlinetraining.com/mpsowners/customers.ashx/2",
      { FirstName, LastName, EmailAddress, Id }
    ).then(res => alert(JSON.stringify(res.data)));
    this.setState({
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      Id: ""
    });
  };

  renderPages = () => {
    const { activeItem, users } = this.state;
    switch (activeItem) {
      case "formPage":
        return (
          <Container fluid>
            <Heading>Form</Heading>
            <Card my={20}>
              <Box p={2}>
                <form onSubmit={this.handleSubmit}>
                  <Label>Id</Label>
                  <Input
                    type="text"
                    placeholder="Enter Id"
                    name="Id"
                    value={this.state.Id}
                    onChange={this.handleChange}
                  />
                  <Divider />
                  <Label>FirstName</Label>
                  <Input
                    type="text"
                    placeholder="Enter FirstName"
                    name="FirstName"
                    value={this.state.FirstName}
                    onChange={this.handleChange}
                  />
                  <Divider />
                  <Label>LastName</Label>
                  <Input
                    type="text"
                    placeholder="Enter LastName"
                    name="LastName"
                    value={this.state.LastName}
                    onChange={this.handleChange}
                  />
                  <Divider />
                  <Label>LastName</Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    name="EmailAddress"
                    value={this.state.EmailAddress}
                    onChange={this.handleChange}
                  />
                  <Divider />
                  <Button>Submit</Button>
                </form>
              </Box>
            </Card>
          </Container>
        );
        break;
      case "usersPage":
        return (
          <Container fluid>
            <Heading>Users</Heading>
            {users.map((user, idx) => (
              <Box my={20} key={idx}>
                <Card>
                  <Box p={2}>
                    <Subhead>{user.FirstName}</Subhead>
                    <Small>userId: {user.Id}</Small>
                    <Text>lastName: {user.LastName}</Text>{" "}
                    <Text>email: {user.EmailAddress}</Text>
                  </Box>
                </Card>
              </Box>
            ))}
          </Container>
        );
      // break;
      case "upcomingEvents":
        return <h1>upcomingEvents</h1>;
      // break;
      default:
        return <h1>default</h1>;
    }
  };

  render() {
    const { visible, activeItem } = this.state;
    return (
      <div>
        <div>
          <Row>
            <Col sm="2">
              <Button
                onClick={this.handleButtonClick}
                style={{ marginLeft: 15, marginTop: 15 }}
              >
                <Icon name="bars" />
              </Button>
            </Col>
            <Col sm="10">
              <h1 style={{ margin: 15 }}>Cosnetics/Offkey Test</h1>
            </Col>
          </Row>

          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              icon="labeled"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width="thin"
              activeItem={this.state.activeItem}
            >
              <Menu.Item
                name="formPage"
                active={activeItem === "formPage"}
                content="Form"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="usersPage"
                active={activeItem === "usersPage"}
                content="Users"
                onClick={this.handleItemClick}
              />
            </Sidebar>

            <Sidebar.Pusher>
              <Segment style={{ minHeight: "100vh" }}>
                {this.renderPages(activeItem)}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default Rebass;
