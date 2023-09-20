import React, { useState, useEffect } from "react";

let id = 0;
const getId = () => ++id;

let teamMembers = [
  {
    id: getId(),
    fname: "Alice",
    lname: "Smith",
    bio: "Passionate about front-end development and user experience.",
  },
  {
    id: getId(),
    fname: "Bob",
    lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design.",
  },
];

export default function App() {
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ fname: "", lname: "", bio: "" });

  useEffect(() => {}, [editing]);

  const onChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const edit = (id, evt) => {
    evt.preventDefault();
    const memberToEdit = members.find((mem) => mem.id === id);
    setFormData({
      fname: memberToEdit.fname,
      lname: memberToEdit.lname,
      bio: memberToEdit.bio,
    });
    setEditing(id);
  };

  const submitNewMember = (evt) => {
    evt.preventDefault();
    const newMember = {
      id: getId(),
      fname: formData.fname,
      lname: formData.lname,
      bio: formData.bio,
    };
    setMembers([...members, newMember]);
    setFormData({ fname: "", lname: "", bio: "" });
  };

  const editExistingMember = (evt) => {
    evt.preventDefault();
    const updatedMember = {
      id: editing,
      fname: formData.fname,
      lname: formData.lname,
      bio: formData.bio,
    };
    const updatedMembers = members.map((mem) =>
      mem.id === editing ? updatedMember : mem
    );
    setMembers(updatedMembers);
    setEditing(null);
    setFormData({ fname: "", lname: "", bio: "" });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (editing) {
      editExistingMember(evt);
    } else {
      submitNewMember(evt);
    }
  };

  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map((mem) => (
            <div key={mem.id} className="member">
              <div>
                <h4>
                  {mem.fname} {mem.lname}
                </h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={(evt) => edit(mem.id, evt)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? "Edit" : "Add"} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Type First Name"
              value={formData.fname}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              id="lname"
              name="lname"
              type="text"
              placeholder="Type Last Name"
              value={formData.lname}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Type Bio"
              value={formData.bio}
              onChange={onChange}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
