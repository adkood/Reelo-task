import react, { useState } from "react";
import axios from "axios";
import { Question } from "./Question";

function App() {
  const [questext, setQuestext] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [diff, setDiff] = useState("");
  const [mark, setMark] = useState(0);

  const [tot, setTot] = useState(0);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [selectedSub, setSelectedSub] = useState("");

  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  const [litmus, setLitmus] = useState(false);

  let arrAll = [];

  const addHandler = async (e) => {
    e.preventDefault();
    try {
      if (questext && subject && topic && diff && mark) {
        const url = "http://localhost:3000/api/add-ques";
        await axios.post(url, {
          question_text: questext,
          subject: subject,
          topic: topic,
          difficulty: diff,
          marks: parseInt(mark),
        });
        console.log("question added");
      } else {
        alert("fill all the values!");
      }
    } catch (error) {
      console.error("Cannot add this question", error);
    }
  };

  const generateHandler = async () => {
    console.log(selectedSub);
    try {
      const sum = parseInt(easy) + parseInt(medium) + parseInt(hard);
      console.log("Sum of percentages:", sum);

      if (
        (selectedSub === "Geography" || selectedSub === "Maths") &&
        parseInt(easy) >= 0 &&
        parseInt(medium) >= 0 &&
        parseInt(hard) >= 0 &&
        sum === 100
      ) {
        console.log("Calculating marks...");

        const easyMark = (parseInt(easy) / 100) * parseInt(tot);
        const mediumMark = (parseInt(medium) / 100) * parseInt(tot);
        const hardMark = (parseInt(hard) / 100) * parseInt(tot);

        const url1 = `http://localhost:3000/api/get-easy?per=${easyMark}&selectedSub=${selectedSub}`;
        const url2 = `http://localhost:3000/api/get-medium?per=${mediumMark}&selectedSub=${selectedSub}`;
        const url3 = `http://localhost:3000/api/get-hard?per=${hardMark}&selectedSub=${selectedSub}`;

        const [fetch1, fetch2, fetch3] = await Promise.all([
          axios.get(url1),
          axios.get(url2),
          axios.get(url3),
        ]);
        setArr1(fetch1.data.data);
        setArr2(fetch2.data.data);
        setArr3(fetch3.data.data);

        setLitmus(true);
      } else {
        alert("Enter valid inputs to generate question paper!");
      }
    } catch (err) {
      alert("question bank is not strong enough for this configuration !");
      console.error("Error:", err);
    }
  };

  arrAll = [...arr1, ...arr2, ...arr3];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontFamily: "monospace",
        fontSize: "1rem",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "99%",
          borderRight: "1px solid grey",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <input
            name="tot"
            onChange={(e) => {
              setTot(e.target.value);
            }}
            placeholder="total marks"
            style={{ width: "15%", fontFamily: "monospace", height: "25px" }}
          ></input>
          <input
            name="easy"
            onChange={(e) => {
              setEasy(e.target.value);
            }}
            placeholder="easy %"
            style={{ width: "15%", fontFamily: "monospace", height: "25px" }}
          ></input>
          <input
            name="medium"
            onChange={(e) => {
              setMedium(e.target.value);
            }}
            placeholder="medium %"
            style={{ width: "15%", fontFamily: "monospace", height: "25px" }}
          ></input>
          <input
            name="hard"
            onChange={(e) => {
              setHard(e.target.value);
            }}
            placeholder="hard %"
            style={{ width: "15%", fontFamily: "monospace", height: "25px" }}
          ></input>

          <select
            id="sublist"
            name="sublist"
            style={{ width: "15%", fontFamily: "monospace", height: "30px" }}
            onChange={(e) => {
              setSelectedSub(e.target.value);
            }}
          >
            <option>Select the Subject</option>
            <option value="Geography">Geography</option>
            <option value="Maths">Maths</option>
          </select>
          <button
            onClick={generateHandler}
            style={{
              margin: "11px",
              width: "11%",
              fontFamily: "monospace",
              height: "30px",
            }}
          >
            generate...
          </button>
        </div>
        <div
          style={{
            width: "100%",
            height: "90%",
            overflow: "auto",
          }}
        >
          {litmus && (
            <div
              style={{
                width: "100%",
                height: "20%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "3rem", fontWeight: "bold", padding: "5px" }}
              >
                Question Paper 2023
              </span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  padding: "5px",
                }}
              >
                Subject: Geography, Total Marks: {tot}
              </span>
            </div>
          )}
          {litmus &&
            arrAll &&
            arrAll.map((ele) => {
              return <Question key={ele.id} props={ele} />;
            })}
        </div>
      </div>
      <div
        style={{
          width: "25%",
          height: "99%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
            add to Question bank{" "}
          </h2>
        </div>
        <div
          style={{
            width: "100%",
            height: "90%",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              fontFamily: "monospace",
            }}
          >
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              name="question"
              onKeyUp={(e) => {
                setQuestext(e.target.value);
              }}
              style={{ fontFamily: "monospace", height: "25px" }}
            ></input>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              name="subject"
              onKeyUp={(e) => {
                setSubject(e.target.value);
              }}
              style={{ fontFamily: "monospace", height: "25px" }}
            ></input>
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              name="topic"
              onKeyUp={(e) => {
                setTopic(e.target.value);
              }}
              style={{ fontFamily: "monospace", height: "25px" }}
            ></input>
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              type="text"
              name="difficulty"
              onKeyUp={(e) => {
                setDiff(e.target.value);
              }}
              style={{ fontFamily: "monospace", height: "25px" }}
            ></input>
            <label htmlFor="marks">Marks:</label>
            <input
              type="number"
              name="marks"
              onChange={(e) => {
                setMark(e.target.value);
              }}
              style={{ fontFamily: "monospace", height: "25px" }}
            ></input>
            <button
              onClick={addHandler}
              style={{
                marginTop: "10px",
                fontFamily: "monospace",
                height: "30px",
              }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
