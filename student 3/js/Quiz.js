//selecting all required elements
const start_btn = document.querySelector(".start_btn");//get element id can use also
const info_box = document.querySelector(".info_box");//queryselector get acces from classes and ids
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .rest");
const quiz_box = document.querySelector(".quiz_box");
const option_list =document.querySelector(".option_list");
const timeCount=quiz_box.querySelector(".timer .time_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{//when start btn clicked execute info_box
    info_box.classList.add("activeInfo"); //show info box
}//classlist give acces for add activeInfo class


// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}//classlist give acces for rempve activeInfo class


// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(10); //calling startTimer function
}
let que_count=0;
let que_numb=1;//bottom quec score
let counter; //time sec 
let timeValue=10;
let userScore=0;

const next_btn=quiz_box.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const restart_quiz=result_box.querySelector(".buttons .rest");
const quit_quiz=result_box.querySelector(".buttons .quit");

restart_quiz.onclick =() =>{
    quiz_box.classList.add("activeQuiz");//show the quiz box
    result_box.classList.remove("activeResult");//hide result box
    que_count=0;
    que_numb=1;//bottom quec score
    timeValue=10;
    userScore=0;
    showQuestions(que_count);
    queCounter(que_numb);//bottom quec score
    clearInterval(counter);
    startTimer(timeValue);//all quec want time 10s
    next_btn.style.display="none";
}

quit_quiz.onclick =()=>{
    window.location.reload();
}

// if next_btn clicked
next_btn.onclick = ()=>{
    if(que_count<questions.length-1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);//bottom quec score
        clearInterval(counter);
        startTimer(timeValue);//all quec want time 10s
        next_btn.style.display="none";//when answer the question nxtbtn display
    }else{
        console.log("Quections Completed.");
        showResultBox();
        
    }
   
   
}


//getting question and option from array
function showQuestions(index){
    const que_text=document.querySelector(".quec");
    let que_tag='<span>'+questions[index].numb + ". "+ questions[index].question +'</span>';
    let option_tag='<div class="option"><span>'+questions[index].Options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].Options[1]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].Options[2]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].Options[3]+'</span></div>';
    que_text.innerHTML=que_tag;   //adding new span tag inside que_tag
    option_list.innerHTML=option_tag;

    const option=option_list.querySelectorAll(".option");//answer check right or wrong
    for (let i= 0; i <option.length; i++) {
        option[i].setAttribute("onclick","optionselected(this)");    
    }
}
function optionselected(answer){ 
    clearInterval(counter);
    let userAns=answer.textContent;
    let correctAns=questions[que_count].answer;
    let allOptions=option_list.children.length;//one time answer select
    if(userAns==correctAns){
        userScore+=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is incorrect");

        //if answer is incorrect automatically go for correct one
        for (let i = 0; i <allOptions; i++) {
            if(option_list.children[i].textContent==correctAns){
                option_list.children[i].setAttribute("class","option correct");
            }
            
        }
    }
    //once user selected disabeld
    for (let i = 0; i <allOptions; i++) {
        option_list.children[i].classList.add("disabled")
        
    }
    next_btn.style.display="block";//nxt button display
}
function showResultBox(){
    info_box.classList.remove("activeInfo"); //show info box
    quiz_box.classList.remove("activeQuiz"); //hidequiz box
    result_box.classList.add("activeResult"); //show info box
    const scoreText=result_box.querySelector(".score_text");
    if(userScore>7){
        let scoreTag='<span>Congratulations!!, You got <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;//input massage into resultbox
    }
    else if(userScore>4){
        let scoreTag='<span>Good !!, You got  <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
    else{
        let scoreTag='<span>Sorry !!, You got only <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }

}




function startTimer(time){
    counter= setInterval(timer,1000);
    function timer(){
        timeCount.textContent= time;
        time--;
    
        if(time < 0){
            clearInterval(counter); //clear counter
            timeCount.textContent = "0";

            let correctAns=questions[que_count].answer;
            let allOptions=option_list.children.length;

            for (let i = 0; i <allOptions; i++) {
                if(option_list.children[i].textContent==correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                }
                
            }
            for (let i = 0; i <allOptions; i++) {
                option_list.children[i].classList.add("disabled")
                
            }
            next_btn.style.display="block";//when time is gone show next button
        }
    }
}



//bottom ques counter
function queCounter(index){
    const ques_counter=document.querySelector(".total_quec"); 
    let totalQuescount_tag= '<span>'+index+'<p></p>of<p>'+questions.length +'</p></span>';
    ques_counter.innerHTML=totalQuescount_tag;
}