/* script.js
 *  Author: Isaac Simmons
 *  Date Created: 12-4-2022
 *  Last Revised: 6-24-2023
 *  Description: Script for the mass effect character quiz
*/

import { characterDescriptions } from "./descriptions.js";
/***** Variables *****/
const body = document.querySelector("body");
const introModal = document.querySelector("#intro-modal");
const playBtn = document.querySelector("#play");

const colorToggle = document.getElementById("color-toggle");

const questions = document.getElementsByClassName("question"),
    questionHeaders = document.getElementsByClassName("question-header"),
    answers = document.getElementsByClassName("answer");

const charModal = document.getElementById("char-modal");
const playAgainBtn = document.getElementById("play-again");
const charScores = {
    tali: 0,
    garrus: 0,
    javik: 0,
    liara: 0,
    wrex: 0,
    legion: 0,
    miranda: 0,
    jacob: 0,
    mordin: 0,
    ashley: 0,
    kaidan: 0,
    samara: 0,
    thane: 0,
    zaeed: 0,
    kasumi: 0,
    illusiveMan: 0,
    james: 0,
    grunt: 0,
    jack: 0,
    joker: 0
}


/****** event listeners ******/
colorToggle.addEventListener("change", (e) => {
    if (colorToggle.checked) {
        Array.from(answers).forEach((answer) => {
            answer.classList.add("renegade");
        });

        Array.from(questionHeaders).forEach((header) => {
            header.classList.add("renegade");
        });

        (document.querySelectorAll(".selected")).forEach((el) => {
            el.classList.remove("paragon-selected");
            el.classList.add("renegade-selected");
        });
    }
    else {
        Array.from(answers).forEach((answer) => {
            answer.classList.remove("renegade");
        });

        Array.from(questionHeaders).forEach((header) => {
            header.classList.remove("renegade");
        });

        (document.querySelectorAll(".selected")).forEach((el) => {
            el.classList.remove("renegade-selected");
            el.classList.add("paragon-selected");
        });
    }
});

playBtn.addEventListener("click", (e) => {
    introModal.classList.toggle("hidden");
    body.style.overflow = "auto";
});

//add event listeners to each set of answer buttons
for (let q of Array.from(questions)) {
    let qAnswers = q.getElementsByClassName("answer");
    answerEvent(qAnswers, q)
}

//play again button event listener
document.addEventListener("click", (e) => {
    if (e.target === playAgainBtn) {
        //unmark the questions as answered
        for (let i = 0; i < questions.length; i++) {
            questions[i].classList.remove("answered");
        }

        //get all the elements that were selected and unselect them so the quiz is fresh for the user again
        (document.querySelectorAll(".selected")).forEach((el) => {
            el.classList.remove("selected")
            el.classList.remove("paragon-selected")
            el.classList.remove("renegade-selected")
        });

        //scroll back to top and close character modal
        window.scrollTo(0, 0);
        charModal.classList.remove("open");
        charModal.classList.add("close");
        body.style.overflow = "auto";

        //reset scores
        for (let char in charScores) {
            charScores[char] = 0;
        }
        console.log("")
    }
});

/***** Functions *****/

//Add event listeners to the answers and check if all q's are answered
function answerEvent(qAnswers, q) {
    for (let i = 0; i < qAnswers.length; i++) {
        qAnswers[i].addEventListener('click', (e) => {
            for (let i = 0; i < qAnswers.length; i++) {
                //clear selected so the user can make a new choice for a question
                qAnswers[i].classList.remove("selected")
                qAnswers[i].classList.remove("renegade-selected")
                qAnswers[i].classList.remove("paragon-selected")
            }
            //add selected class to highlight the answer the user chose
            e.target.classList.add("selected");
            if (colorToggle.checked) {
                e.target.classList.add("renegade-selected");
            }
            else {
                e.target.classList.add("paragon-selected");
            }

            //mark that question as answered
            q.classList.add("answered");

            //if all questions are answered show the user what character they got
            if (Array.from(questions).every((question) => {
                return question.classList.contains("answered");
            })) {
                showCharacter();
            }
        });
    }
}

//Add all the character scores up from the selected answers
function tallyScores() {
    let selected = document.getElementsByClassName("selected");
    for (let i = 0; i < selected.length; i++) {
        //get the char scores from the data attributes of the selected questions
        charScores.tali += Number(selected[i].dataset.tali);
        charScores.garrus += Number(selected[i].dataset.garrus);
        charScores.javik += Number(selected[i].dataset.javik);
        charScores.liara += Number(selected[i].dataset.liara);
        charScores.wrex += Number(selected[i].dataset.wrex);
        charScores.legion += Number(selected[i].dataset.legion);
        charScores.miranda += Number(selected[i].dataset.miranda);
        charScores.jacob += Number(selected[i].dataset.jacob);
        charScores.mordin += Number(selected[i].dataset.mordin);
        charScores.ashley += Number(selected[i].dataset.ashley);
        charScores.kaidan += Number(selected[i].dataset.kaidan);
        charScores.samara += Number(selected[i].dataset.samara);
        charScores.thane += Number(selected[i].dataset.thane);
        charScores.zaeed += Number(selected[i].dataset.zaeed);
        charScores.kasumi += Number(selected[i].dataset.kasumi);
        charScores.illusiveMan += Number(selected[i].dataset.illusiveMan);
        charScores.james += Number(selected[i].dataset.james);
        charScores.grunt += Number(selected[i].dataset.grunt);
        charScores.jack += Number(selected[i].dataset.jack);
        charScores.joker += Number(selected[i].dataset.joker);
    }
}

//show the character modal and show the user what character they are
function showCharacter() {
    tallyScores();
    //find max value of the character scores
    const maxVal = Math.max(...Object.values(charScores));
    //return which character that max value belongs to
    const key = Object.keys(charScores).find(key => charScores[key] === maxVal);
    const charImg = document.getElementById("char-img");
    const charDesc = document.getElementById("char-desc");

    //set the image and description based on the key returned.
    charImg.setAttribute("src", `images/${key}.jpg`);
    charImg.setAttribute("alt", key);
    charDesc.innerText = characterDescriptions[key];

    //log the char scores
    console.log("All Character Scores:\n");
    for (let char in charScores) {
        console.log(char + " " + charScores[char]);
    }
    console.log("Winning Character");
    console.log(key, maxVal);
    //show the modal and prevent scrolling
    charModal.classList.remove("close");
    charModal.classList.add("open");
    body.style.overflow = "hidden";
}


