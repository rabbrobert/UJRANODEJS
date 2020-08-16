//get data from server
function getServerData(url){
    let fetchOptions = {
      method: "GET",
      mode: "cors",  
      cache: "no-cache"
    };
    return fetch (url, fetchOptions).then(
        response=>response.json(),
        err => console.log(ee)
    );
    /* then(
        data => console.log(data)
    ); */
    
}


document.querySelector("#getUsers").addEventListener(
  "click", function(ev){
    ret=getServerData("http://localhost:3000/users");
    ret.then(
        data => fillDataTable(data, "userTable")
    )    
  } , false     
);


function fillDataTable(data, tableId){
    let table = document.querySelector(`#${tableId}`);
    if (!table){
        console.error("Table  id" + `#${tableId}` + " not found" );
    }
    
    
    let tBody = table.querySelector("tbody");
    for (let row of data){
        console.log(row);
        let tr = createAnyElement("tr");
        for (let ind  in row){
            //console.log(row[ind]);
            text=row[ind];
            let td=createAnyElement("td");     
            td.innerHTML=row[ind];
            tr.appendChild(td);   
            
        }
        let grTd = createBtnGroup();
        tr.appendChild(grTd);


        tBody.appendChild(tr);
    }
    
}

function createAnyElement(name,attributes){
    let element = document.createElement(name);
    for (let k in attributes){
        //console.log(k, attrobutes[k]);  
        element.setAttribute(k,attributes[k]);    
    }
    return element;
}

function createBtnGroup(){
    let  group = createAnyElement("div");
    let  infoBtn =  createAnyElement("button",{class:"btn btn-info"});
    let  delBtn =  createAnyElement("button",{class:"btn btn-danger"});
    infoBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    group.appendChild(infoBtn);
    group.appendChild (delBtn);
    let tdB=createAnyElement("td");
    tdB.appendChild(group)
    return group;
}


let createTD = (content, parent ) =>{
    let td = document.createElement("td");
    td.innerHTML = content; // parseInt(content) +  1;
    parent.appendChild(td);
    
};

