var obj = {};
var j = -1;
var responses = [];

function test(value){
    const url = "json/" + value + ".json";
    fetch(url).then(
        data=>data.json().then(
            dt=>{           
                    loadQuestions(dt);
             }).catch(
                 err=>console.log("invalid json"))).catch(
                     err=>console.log(err));
}

function loadQuestions(dt){
    
    // document.querySelector("#nextPrevious").innerHTML = "";
    // document.querySelector("#finishTest").innerHTML = "";

    obj = dt;    
    
    for(let i=0; i<obj.questions.length; i++){
        responses[i] = 'unattempted';
    }

    var nextPrevious = document.querySelector("#nextPrevious");
    var nextBtn = document.createElement("button");
    nextBtn.addEventListener("click", function(){
       changeQuestion(obj,"+");
    });
    nextBtn.innerText = "Next";
    nextBtn.id = "nextBtn";
    
    var preBtn = document.createElement("button");
    preBtn.addEventListener("click", function(){
       changeQuestion(obj,"-");
    });
    preBtn.innerText = "Previous";
    preBtn.id = "preBtn";
    
    var finishTest = document.querySelector("#finishTest");
    var finishBtn = document.createElement("button");
    finishBtn.innerText = "FINISH TEST";
    finishBtn.addEventListener("click", function(){
        testReport();
     });
    
    nextPrevious.appendChild(nextBtn);
    nextPrevious.appendChild(preBtn);
    finishTest.appendChild(finishBtn);
    changeQuestion(obj,"+");
}

function changeQuestion(obj,sign){
    j = eval(j + sign + 1);

    var progressBar = document.querySelector("#progressBar");
    progressBarLoad(progressBar);
  
    var tbody = document.querySelector("#questionsBody");    
    tbody.innerHTML = "";
    var ques = obj.questions[j];                   
    var q = document.createElement("p");
    q.innerText = ques.q;
    tbody.appendChild(q);
    // var options = [];
    // for(let opt in ques.opt){
    //     options.push(opt);
    // }

    var options = {};
    options = ques.opt;
    // console.log(options1,typeof(options1));
 
    for(let key in options){
        var div = document.createElement("div");
        var radioOption = document.createElement("input");
        var span = document.createElement("span");
        radioOption.value = key;
        radioOption.style = "border : 2px solid red";
        radioOption.type = "radio";
        radioOption.name = ques.q;
        radioOption.id = ques.q + "_" + j;
        if(radioOption.value == responses[j])
            radioOption.checked = true;

        span.innerText = options[key];
        
        div.appendChild(radioOption);
        div.appendChild(span);        
        tbody.appendChild(div);

        radioOption.onclick = function(){
            getAnswer(key,j);
            progressBarLoad(progressBar);
            // console.log("clicked",this.value);
        };
        
    }

    if(j == obj.questions.length - 1){
        document.querySelector("#nextBtn").disabled = true;
        document.querySelector("#preBtn").disabled = false;
    }
        
    else if(j == 0){
        document.querySelector("#nextBtn").disabled = false;
        document.querySelector("#preBtn").disabled = true;
    }

    else{
        document.querySelector("#nextBtn").disabled = false;
        document.querySelector("#preBtn").disabled = false;
    }    
}

function progressBarLoad(progressBar){
    progressBar.innerHTML = ""
    var table = document.createElement('table');
    var tr = table.insertRow();
    for(let i=0; i<obj.questions.length; i++){
        var td = tr.insertCell(i);
        td.innerText = `Q${i+1}`;
        if(responses[i] == 'unattempted')
            td.className = "red";  
        else    
            td.className = "yellow";      
    }

    
    progressBar.appendChild(table);
}

function getAnswer(ans,j){
    responses[j] = ans;
    console.log(responses);
}

function testReport(){
    document.querySelector("#testScr").classList.add("disNone");

    var tbody = document.querySelector("#testReport>tbody");

    var th = tbody.insertRow();
    
    th.insertCell(0).innerText = "QUESTION";
    th.insertCell(1).innerText = "ATTEMPTED/UNATTEMPTED";
    th.insertCell(2).innerText = "CHOSEN OPTION";
    th.insertCell(3).innerText = "CORRECT OPTION";
    th.insertCell(4).innerText = "TICK";
    th.insertCell(5).innerText = "SCORE";

    for(let i=0; i<obj.questions.length; i++){
        var tr = tbody.insertRow();
        tr.insertCell(0).innerText = `Q${i+1}`;
        
        if(responses[i] == 'unattempted')
            tr.insertCell(1).innerText = "UNATTEMPTED";
        else
            tr.insertCell(1).innerText = "ATTEMPTED";
        
        tr.insertCell(2).innerText = responses[i];
        tr.insertCell(3).innerText = obj.questions[i].ans;

        if(responses[i] == obj.questions[i].ans){
            tr.insertCell(4).innerText = "V";
            tr.insertCell(5).innerText = "+5";
        }
        else if(responses[i] == 'unattempted'){
            tr.insertCell(4).innerText = "0";
            tr.insertCell(5).innerText = "+0";
        }
        else{
            tr.insertCell(4).innerText = "X";
            tr.insertCell(5).innerText = "-5";
        }
        

    }

    
    

}

