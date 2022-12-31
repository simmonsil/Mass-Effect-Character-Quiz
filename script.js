/* script.js
 *  Author: Isaac Simmons
 *  Date Created: 12-4-2022
 *  Last Revised: 12-31-2022
 *  Description: Script for the mass effect character quiz
*/

/***** Variables *****/
const body = document.querySelector("body");
const introModal = document.querySelector("#intro-modal");
const playBtn = document.querySelector("#play");

// const colorToggle = document.getElementById("color-toggle");

const questions = document.getElementsByClassName("question"),
// questionHeaders = document.getElementsByClassName("question-header"),
// answers = document.getElementsByClassName("answer"),
q1 = document.getElementById("q1"),
q2 = document.getElementById("q2"),
q3 = document.getElementById("q3"),
q4 = document.getElementById("q4"),
q5 = document.getElementById("q5"),
q6 = document.getElementById("q6"),
q7 = document.getElementById("q7"),
q8 = document.getElementById("q8"),
q9 = document.getElementById("q9"),
q10 = document.getElementById("q10"),
q1Answers = document.getElementsByClassName("q1-answers"),
q2Answers = document.getElementsByClassName("q2-answers"),
q3Answers = document.getElementsByClassName("q3-answers"),
q4Answers = document.getElementsByClassName("q4-answers"),
q5Answers = document.getElementsByClassName("q5-answers"),
q6Answers = document.getElementsByClassName("q6-answers"),
q7Answers = document.getElementsByClassName("q7-answers"),
q8Answers = document.getElementsByClassName("q8-answers"),
q9Answers = document.getElementsByClassName("q9-answers"),
q10Answers = document.getElementsByClassName("q10-answers")

const charModal = document.getElementById("char-modal");
const playAgainBtn = document.getElementById("play-again");

let taliScore = 0,
garrusScore = 0,
javikScore = 0, 
liaraScore = 0,
wrexScore = 0,
legionScore = 0,
mirandaScore = 0,
jacobScore = 0;
//TODO: add more characters

/****** event listeners ******/
// colorToggle.addEventListener("change", (e) => {
//     Array.from(answers).forEach((answer) => { 
//         answer.classList.toggle("renegade");
//     })
//     Array.from(questionHeaders).forEach((header) => { 
//         header.classList.toggle("renegade");
//     })
// });

playBtn.addEventListener("click", (e) => {
    introModal.classList.toggle("hidden");
    body.style.overflow = "auto";
});

//add event listeners to each set of answer buttons
answerEvent(q1Answers, q1);
answerEvent(q2Answers, q2);
answerEvent(q3Answers, q3);
answerEvent(q4Answers, q4);
answerEvent(q5Answers, q5);
answerEvent(q6Answers, q6);
answerEvent(q7Answers, q7);
answerEvent(q8Answers, q8);
answerEvent(q9Answers, q9);
answerEvent(q10Answers, q10);

document.addEventListener("click", (e) => {
    if(e.target === playAgainBtn) {
        //unmark the questions as answered
        for(let i = 0; i < questions.length; i++) {
            questions[i].classList.remove("answered");
        }
        //get all the elements that were selected and unselect them.
        (document.querySelectorAll(".selected")).forEach((el) => el.classList.remove("selected"));
        //scroll back to top and close character modal
        window.scrollTo(0, 0);
        charModal.classList.remove("open");
        charModal.classList.add("close");
        body.style.overflow = "auto";
        //reset scores
        taliScore = 0;
        garrusScore = 0;
        javikScore = 0;
        liaraScore = 0;
        wrexScore = 0;
        legionScore = 0;
        mirandaScore = 0;
        jacobScore = 0;
        //TODO: add more characters
    }
});

/***** Functions *****/

//Add event listeners to the answers and check if all q's are answered
function answerEvent(qAnswers, q) {
    for(let i = 0; i < qAnswers.length; i++) {
        qAnswers[i].addEventListener('click', (e) => {
            for(let i = 0; i < qAnswers.length; i++) {
                //clear selected so the user can make a new choice for a question
                qAnswers[i].classList.remove("selected")
            }
            //add selected class to highlight the answer the user chose
            e.target.classList.add("selected");
            //mark that question as answered
            q.classList.add("answered");

            //if all questions are answered show the user what character they got
            if(Array.from(questions).every((question) => {
                return question.classList.contains("answered");
            })) {
                showCharacter();
            }
        });
    }
}

//show the character modal and show the user what character they are
function showCharacter() {
    let selected = document.getElementsByClassName("selected");
    for(let i = 0; i < selected.length; i++) {
        taliScore += Number(selected[i].dataset.tali);
        garrusScore += Number(selected[i].dataset.garrus);
        javikScore += Number(selected[i].dataset.javik);
        liaraScore += Number(selected[i].dataset.liara);
        wrexScore += Number(selected[i].dataset.wrex);
        legionScore += Number(selected[i].dataset.legion);
        mirandaScore += Number(selected[i].dataset.miranda);
        jacobScore += Number(selected[i].dataset.jacob);
        //TODO: add more characters
    }
    let charScores = {taliScore, garrusScore, javikScore, liaraScore, wrexScore, legionScore, mirandaScore, jacobScore }         //TODO: add more characters
        
    const maxVal = Math.max(...Object.values(charScores));
    const key = Object.keys(charScores).find(key => charScores[key] === maxVal);
    const charImg = document.getElementById("char-img");
    const charDesc = document.getElementById("char-desc");

    switch(key) {
        case "taliScore": 
            charImg.setAttribute("src", "images/tali.jpg");
            charImg.setAttribute("alt", "tali");
            charDesc.innerText = "You are Tali'Zorah Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;
        
        case "garrusScore":
            charImg.setAttribute("src", "images/garrus.jpg");
            charImg.setAttribute("alt", "garrus");
            charDesc.innerText = "You are Garrus Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;

        case "javikScore":
            charImg.setAttribute("src", "images/javik.jpg");
            charImg.setAttribute("alt", "javik");
            charDesc.innerText = "You are Javik Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;
        
        case "liaraScore":
            charImg.setAttribute("src", "images/liara.jpg");
            charImg.setAttribute("alt", "liara");
            charDesc.innerText = "You are Liara Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;

        case "wrexScore":
            charImg.setAttribute("src", "images/wrex.jpg");
            charImg.setAttribute("alt", "wrex");
            charDesc.innerText = "You are Wrex Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;

        case "legionScore":
            charImg.setAttribute("src", "images/legion.jpg");
            charImg.setAttribute("alt", "legion");
            charDesc.innerText = "You are Legion Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;
        
        case "mirandaScore":
            charImg.setAttribute("src", "images/miranda.jpg");
            charImg.setAttribute("alt", "miranda");
            charDesc.innerText = "You are Miranda Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;    
        case "jacobScore":
            charImg.setAttribute("src", "images/jacob.jpg");
            charImg.setAttribute("alt", "jacob");
            charDesc.innerText = "You are Jacob Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, impedit. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est. Placeat nihil, harum est quisquam officia, temporibus mollitia nostrum architecto vitae dolores odit dolorem fugit reprehenderit dicta in! Natus, est."
            break;  
        //TODO: add more characters
    }
    console.log(charScores);
    console.log(key, maxVal);
    charModal.classList.remove("close");
    charModal.classList.add("open");
    body.style.overflow = "hidden";
}


