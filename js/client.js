
//Keya of users
let keysOfUsers=["id","name","email"];


//get data from server
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };
    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.log(err)
    );
    /* then(
        data => console.log(data)
    ); */

}

function startGetServerData() {
    getServerData("http://localhost:3000/users").then(
        data => fillDataTable(data, "userTable")
    );
}


document.querySelector("#getUsers").addEventListener(
    "click", /*function (ev) {
        ret = getServerData("http://localhost:3000/users");
        ret.then(
            data => fillDataTable(data, "userTable")
        )
    } */ startGetServerData/*, false */
);


function fillDataTable(data, tableId) {
    let table = document.querySelector(`#${tableId}`);
    if (!table) {
        console.error("Table  id" + `#${tableId}` + " not found");
        return;
    }
    
   

    let tBody = table.querySelector("tbody");
    
    ////removeAllChildNodes(tBody);
    /// removeAllChildNodes helyett egyszerubb
    tBody.innerHTML='';

    let emptyRow = newUserRow();
    tBody.appendChild(emptyRow);

    for (let row of data) {
        //console.log(row);
        let tr = createAnyElement("tr");
        for (let ind of keysOfUsers) {
            //console.log(row[ind]);
            text = row[ind];
            let td = createAnyElement("td");
            let input = createAnyElement("input",
                {
                    class: "form-control",
                    value: row[ind],
                    name: ind
    
                });
            if (ind == "id"){
                
                input.setAttribute("readonly",true);
            }
            td.appendChild(input);
            tr.appendChild(td);

        }
        let grTd = createBtnGroup();
        tr.appendChild(grTd);

        tBody.appendChild(tr);
    }

}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    if (/*typeof(attributes) !=== 'undefined' && */ attributes != null ){
        for (let k in attributes) {
            //console.log(k, attrobutes[k]);  
            element.setAttribute(k, attributes[k]);
        }
    }
    return element;
}

function createBtnGroup() {
    let group = createAnyElement("div");
    let infoBtn = createAnyElement("button", { class: "btn btn-info", onclick: "setUser(this)" });
    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delUser(this)" });
    infoBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    group.appendChild(infoBtn);
    group.appendChild(delBtn);
    let tdB = createAnyElement("td");
    tdB.appendChild(group)
    return tdB;
}


let createTD = (content, parent) => {
    let td = document.createElement("td");
    td.innerHTML = content; // parseInt(content) +  1;
    parent.appendChild(td);

};


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function delUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    console.log(tr);
    let data= getRowData(tr);

    //egy megoldas az elso child az id
    //id =tr.children[0].innerHTML;
    //masik megoldas
    //let id = tr.querySelector("td:first-child").innerHTML;
    let id = data.id;

    console.log("id= ", id);
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };
    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        response => response.json(),
        err => console.log(err)
    ).then(
        data => {
            startGetServerData();
        }
    )

}

//Create new user
function newUserRow(){
    let tr = createAnyElement("tr");
    for (let k of keysOfUsers ){
        let td= createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
            });
        //  input.value = '';
        td.appendChild(input);
        tr.appendChild(td);
    }
    let addBtn = createAnyElement("button",{
        class: "btn btn-success",
        onclick: "createUser(this)" 
    } )
    let tdBtn = createAnyElement("td");
    addBtn.innerHTML= '<i class="fa fa-plus-circle" aria-hidden="true"></i>';    
    tdBtn.appendChild(addBtn);
    tr.appendChild(tdBtn);
    return tr;
}

function createUser(btn){
    let tr= btn.parentElement.parentElement;
    data= getRowData(tr);
    //delete data.id;
    //console.log(data);
    var numbers = /^[-+]?[0-9]+$/;
    
    if (!data.id.match(numbers)){
        alert("ID has to be number!");
        return;
    }
    

    let fetchOptions= {
        method: "POST",
        mode:  "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  
    };
    fetch(`http://localhost:3000/users`,fetchOptions ).then(
        resp => resp.json(),
        err  => console.error(err)
    ).then(
        data => startGetServerData()
    );   

}


function getRowData(tr){
    let inputs = tr.querySelectorAll("input.form-control");
    
    let data={};
    for (let i=0; i < inputs.length;i++){
        data[inputs[i].name]=inputs[i].value;  
        //console.log(inputs[i].value) ;
    }
    return data;
}




function setUser(btn){
    let tr= btn.parentElement.parentElement.parentElement;    
    let data= getRowData(tr);
    
    let fetchOptions= {
        method: "PUT",
        mode:  "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  
    };
    fetch(`http://localhost:3000/users/${data.id}`, fetchOptions).then(
        response => response.json(),
        err => console.log(err)
    ).then(
        data => {
            startGetServerData();
        }
    );


}
