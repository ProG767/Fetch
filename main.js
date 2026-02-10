// selection des boutons dans le DOM
const name = document.querySelector("#name");
const mail = document.querySelector("#mail");
const form = document.querySelector("form");
const output = document.querySelector("#output");
const addGit = document.querySelector("#gitBtn")


//ajoute d'évènement boutton suppression
output.addEventListener("click",(e)=>{
const btn = e.target.closest(".btn-danger");
if(!btn) return;

btn.closest(".card").remove();
});


//class gestion des contacts
class Contact{
constructor(rname,rmail){
this.rname=rname;
this.rmail=rmail;
}
}


// class des messages réutilisable 
class Interface {
static mesSage(message,className) {
const div = document.createElement("div");
div.appendChild(document.createTextNode(message));
div.className = className;
const container = document.querySelector(".container");
container.appendChild(div);
container.insertBefore(div,form)
setTimeout(()=>{
div.remove()
},3000 )
}

static adCont(contact){
const ul = document.createElement("ul");
ul.className="list-group";
const listCont = [contact.rname,contact.rmail];
listCont.forEach((item)=>{
const li = document.createElement("li");
li.className = "list-group-item";
li.appendChild(document.createTextNode(item));
ul.appendChild(li);
const list = document.querySelector("#list");

});

//création du bouton supprimer de ul
const liBtn = document.createElement("li");
liBtn.className = "list-group-item";
const a = document.createElement("a");
a.appendChild(document.createTextNode("X"));
a.className="btn-danger"
a.href = "#";

liBtn.appendChild(a);
ul.appendChild(liBtn);

list.appendChild(ul);
}


static supCont(btn){
const ul = btn.closest("ul");
if(ul) ul.remove(); 
}

};


//ajoute d'évènement boutton suppression
form.addEventListener("submit", (e)=>{
e.preventDefault();

    if(name.value === ""||mail.value === ""){
    Interface.mesSage("veuillez remplir les champs","btn-g");

console.log("no");
} else {

const contact = new Contact (name.value,mail.value);
Interface.adCont(contact);
console.log(" yes");
}
});

//ajoute selection et évènement boutton suppression
document.querySelector("#list").addEventListener("click",(e)=> {
    if (!e.target.classList.contains("btn-danger")) return;

e.preventDefault();
Interface.supCont(e.target);
});


const getApi1 = document.querySelector("#getApi1");

getApi1.addEventListener("click",()=>{
let html = "";

fetch("https://jsonplaceholder.typicode.com/users")
.then((res)=> res.json())
.then((data)=>{
    data.forEach(item =>{
    html += `
    <ul class ="card">
        <li>${item.name}</li>
        <li>${item.email}</li>
        <button class="btn-danger">X</button>
    </ul>

`

});

output.className = "grid-1";
output.innerHTML = html;
console.log(data);

});

});


const getApi2 = document.querySelector("#getApi2");

getApi2.addEventListener("click",()=> {
fetch ("https://api.github.com/users")
.then ((res)=>res.json())
.then ((data)=>{
html = ""

data.forEach((item)=>{
html+= `
<ul class ="card">
<li>Nom : ${item.login}</li>
<img src="${item.avatar_url}" width = 100>
<li> lien du profil : <br> 
<a href=https://github.com/${item.login}>; 
https//github.com/${item.login}
</a>
</li>
<button class = "btn-danger btn2">SUP</button>
</ul>
`
} )

output.innerHTML = html;
console.log(data);
});

});
 

addGit.addEventListener("click", (e)=> {
    if (name.value === "" || mail.value === ""){
        Interface.mesSage ("merci de remplir tout les champs svp", "btn-g"); 
    } else {

        fetch("https://api.github.com/users",{
            method: 'POST',
            body: JSON.stringify({
                title: name.value,
                body: mail.value,
            }),
            headers: {
                'content-type' : 'application/json; charset=UTF-!',
            },
        })

    .then((response) => response.json())
    .then((json)=> console.log(json)); 

}
});
