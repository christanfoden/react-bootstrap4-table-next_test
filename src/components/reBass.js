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
      visable: true,
      activeItem: "testPage"
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
      case "testPage":
        return (
          <Container>
            <Heading>Test Page</Heading>
            {/* <Flex flexWrap="wrap"> */}
            <Row>
              <Col lg="6">
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
              </Col>
              <Col lg="6">
                {/* <Flex flexWrap="wrap"> */}
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
                {/* </Flex> */}
              </Col>
            </Row>
            {/* </Flex> */}
          </Container>
        );
      // break;
      case "reviews":
        return <h1>Reviews</h1>;
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
          <Button
            onClick={this.handleButtonClick}
            style={{ marginLeft: 15, marginTop: 15 }}
          >
            <Icon name="bars" />
          </Button>

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
                as="a"
                tag="/test"
                name="testPage"
                active={activeItem === "testPage"}
                content="Test Page"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="reviews"
                active={activeItem === "reviews"}
                content="Reviews"
                onClick={this.handleItemClick}
              />

              <Menu.Item
                name="upcomingEvents"
                active={activeItem === "upcomingEvents"}
                content="Upcoming Events"
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
