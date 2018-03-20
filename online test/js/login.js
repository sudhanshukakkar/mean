window.addEventListener("load",bindEvents);

function bindEvents(){
    document.querySelector("#loginBtn").addEventListener("click",login);
}

function login(){
    const loginData = "json/login.json";
    fetch(loginData).then(
        data=>data.json().then(
            dt=>{           
                loginVerifier(dt);
             }).catch(
                 err=>console.log("invalid json"))).catch(
                     err=>console.log(err));

}

function loginVerifier(obj){
    var id = document.querySelector("#id").value;
    var pass = document.querySelector("#pass").value;
    var flag = 0;
    for(let i = 0; i<obj.login.length; i++){
        if(id == obj.login[i].id && pass == obj.login[i].pass){
            flag = 1;
            break;
        }
    }    
    if(flag == 1)
        afterLogin();   
    else
        document.querySelector("#loginReport").innerText = "Login failed!" 
}

function afterLogin(){
    // console.log("login successsful");
    document.querySelector("#loginScr").classList.remove("disBlock");
    document.querySelector("#loginScr").classList.add("disNone");    
    document.querySelector("#testScr").classList.remove("disNone");
    document.querySelector("#testScr").classList.add("disBlock");
}