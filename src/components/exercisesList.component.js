import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Octicon, { Pencil, Trashcan } from "@primer/octicons-react";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>
        <button className="btn btn-primary btn-xs mr-1">
          <Octicon icon={Pencil}></Octicon>
        </button>
      </Link>
      <button
        className="btn btn-danger btn-xs ml-1"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        <Octicon icon={Trashcan}></Octicon>
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then(response => {
        this.setState({
          exercises: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/delete/" + id)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
