const Ques = require("../models/Ques");

function findCombination(arr, x) {
  const result = [];

  function backtrack(index, currentSum, currentCombination) {
    if (currentSum === x) {
      result.push([...currentCombination]);
      return;
    }

    for (let i = index; i < arr.length; i++) {
      const { marks } = arr[i];

      if (currentSum + marks <= x) {
        currentCombination.push(arr[i]);
        backtrack(i + 1, currentSum + marks, currentCombination);
        currentCombination.pop();
      }
    }
  }

  backtrack(0, 0, []);
  if (result.length) {
    let randomIndex = Math.floor(Math.random() * result.length);
    return result[randomIndex];
  }
  return result;
}

exports.getEasy = async (req, res, next) => {
  try {
    const { per , selectedSub} = req.query;
    let allEasy = await Ques.findAll("easy",selectedSub);
    allEasy = findCombination(allEasy, parseInt(per));

    if (allEasy.length === 0 && parseInt(per) !== 0) {
      throw new Error();
    }

    res.status(200).json({ data: allEasy });
  } catch (err) {
    res.status(500).json({ message: "cannot fetch easy questions" });
  }
};

exports.getMedium = async (req, res, next) => {
  try {
    const { per, selectedSub } = req.query;
    let allMedium = await Ques.findAll("medium",selectedSub);
    allMedium = findCombination(allMedium, parseInt(per));

    if (allMedium.length === 0 && parseInt(per) !== 0) {
      throw new Error();
    }

    res.status(200).json({ data: allMedium });
  } catch (err) {
    res.status(500).json({ message: "cannot fetch medium questions" });
  }
};

exports.getHard = async (req, res, next) => {
  try {
    const { per, selectedSub } = req.query;
    let allHard = await Ques.findAll("hard",selectedSub);
    allHard = findCombination(allHard, parseInt(per));

    if (allHard.length === 0 && parseInt(per) !== 0) {
      throw new Error();
    }

    res.status(200).json({ data: allHard });
  } catch (err) {
    res.status(500).json({ message: "cannot fetch hard questions" });
  }
};

exports.addToBank = async (req, res, next) => {
  try {
    const { question_text, subject, topic, difficulty, marks } = req.body;
    const newQues = new Ques(question_text, subject, topic, difficulty, marks);
    console.log(newQues);
    newQues.save();
    res.status(201).json({ message: "Question Added to the bank" });
  } catch (err) {
    res.status(500).json({ message: "Not able to add question to the bank" });
  }
};
