import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import CircleIcon from "@mui/icons-material/Circle";
import { Link, useNavigate } from "react-router-dom";

const UserTable = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const users = [
    {
      id: 1,
      name: "Michael Holtz",
      dateCreated: "04/10/2013",
      role: "Admin",
      status: "Active",
      image:
        "https://www.shutterstock.com/image-photo/glad-handsome-creative-young-male-260nw-767474563.jpg",
    },
    {
      id: 2,
      name: "Paula Wilson",
      dateCreated: "05/08/2014",
      role: "Publisher",
      status: "Active",
      image:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      dateCreated: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
      image:
        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
    },
    {
      id: 4,
      name: "Mary Saveley",
      dateCreated: "06/09/2016",
      role: "Reviewer",
      status: "Active",
      image:
        "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
    },
    {
      id: 5,
      name: "Martin Sommer",
      dateCreated: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
      image:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
  ];

  return (
    <div className="container mt-5 rounded">
      <Row className="justify-content-center rounded">
        <Col md={10}>
          <Table bordered className="shadow-lg">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center ">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="rounded-4"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.dateCreated}</td>
                  <td>{user.role}</td>
                  <td>
                    <Col className="d-flex align-items-center">
                      <div className={`dot mx-1 `}>
                        <CircleIcon
                          className={
                            user.status === "Active"
                              ? "text-success"
                              : user.status === "Suspended"
                              ? "text-warning"
                              : "text-secondary"
                          }
                          style={{
                            width: "10px",
                            height: "10px",
                          }}
                        />
                      </div>
                      <div>{user.status}</div>
                    </Col>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      className="mr-2 mx-1 text-primary"
                    >
                      <SettingsIcon />
                    </Button>
                    <Button variant="link" size="sm" className="text-danger">
                      <CancelIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UserTable;
