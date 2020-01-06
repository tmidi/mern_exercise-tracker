import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import Navbar from "./components/navbar.component.js";
import ExercisesList from "./components/exercisesList.component.js";
import EditExercise from "./components/edit-exercises.component.js";
import CreateExercise from "./components/create-exercises.component.js";
import CreateUser from "./components/create-user.component.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
