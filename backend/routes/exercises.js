const router = require("express").Router();
let Exercise = require("../models/exercises.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const muscles = req.body.muscles;
  const explanation = req.body.explanation;

  const newExercise = new Exercise({
    username,
    id,
    title,
    description,
    muscles,
    explanation,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      console.log("exercise: ", exercise);
      exercise.username = req.body.username;
      exercise.id = req.body.id;
      exercise.title = req.body.title;
      exercise.description = req.body.description;
      exercise.muscles = req.body.muscles;
      exercise.explanation = req.body.explanation;

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
