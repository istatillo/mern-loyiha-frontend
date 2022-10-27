import { useEffect, useState } from "react";
import {Axios} from "./config";

function App() {
  const [users, setUsers] = useState([]);
  const [modalV, setModalV] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const show = () => setModalV(true);
  const hide = () => setModalV(false);

  const getUser = async () => {
    const { data } = await Axios.get("/users");
    setUsers(data);
  };

  const createUser = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const age = e.target[1].value;

    Axios
      .post("/users", { name, age })
      .then(() => {
        getUser();
      })
      .finally(() => {
        hide();
      });
  };

  const editUser = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const age = e.target[1].value;

    Axios
      .put("/users", { name, age, id: currentUser._id })
      .then(() => {
        getUser();
      })
      .finally(() => {
        hide();
      });
  };

  const deleteUser = (id) => {
    Axios.delete("/users/" + id).then(() => {
      getUser();
    });
  };

  useEffect(() => {
    getUser();
  }, [users]);

  return (
    <div className="container mt-3">
      {modalV ? (
        <div className="row">
          <div className="col-6">
            <h2>Add User</h2>
            <form onSubmit={createUser}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Age"
                />
              </div>
              <div className="mb-3 btn-group">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
                <button onClick={hide} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="col-6">
            <h2>Edit User</h2>
            <form onSubmit={editUser}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  defaultValue={currentUser.name}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Age"
                  defaultValue={currentUser.age}
                />
              </div>
              <div className="mb-3 btn-group">
                <button type="submit" className="btn btn-primary">
                  Edit
                </button>
                <button onClick={hide} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="row">
        <div className="col-6">
          <h1>Users</h1>
        </div>
        <div className="col-6 text-end">
          {modalV ? (
            ""
          ) : (
            <button className="btn btn-success" onClick={show}>
              Add
            </button>
          )}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    show();
                    setCurrentUser(user);
                  }}
                >
                  E
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  D
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
