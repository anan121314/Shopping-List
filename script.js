var options=[];

function fill_table(data){
    var response = JSON.parse(data);
    var len = response.List.length;


    for(let i=0;i<len;i++){
        options.push(response.List[i].Department);
    }
    var option_set=new Set(options);
    var final_option=Array.from(option_set);


    document.getElementById("demo").style.color="black";
     
    document.getElementById("demo").innerHTML=`

<div class ="selection">
<label for="department" style="margin-top:2px;">Choose a Department:</label>
<select name="department" id="dept">
<option value="All">All</option>
</select>
<button style="font-size:15px;margin-top:3px;" onclick="chooseByDept()">Get List</button>
</div>
        <table id="dynamic_table">
        <tr>
        <td>SL no:</td>
        <td>Name</td>
        <td>Quantity</td>
        <td>Unit</td>
        <td>Department</td>
        <td>Notes</td>
        </tr>
        </table>`;
        var dyntab = document.getElementById("dynamic_table");

        for (let i=0;i<len;i++){
        var newRow =  dyntab.insertRow();
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        var newCell4 = newRow.insertCell(3);
        var newCell5 = newRow.insertCell(4);
        var newCell6 = newRow.insertCell(5);
        

        newCell1.innerHTML=`${i+1}`;
        newCell2.innerHTML=`${response.List[i].name}`;
        newCell3.innerHTML=`${response.List[i].Quantity}`;
        newCell4.innerHTML=`${response.List[i].Unit}`;
        newCell5.innerHTML=`${response.List[i].Department}`;
        newCell6.innerHTML=`${response.List[i].Notes}`;
        }
//logic for select options

for(let i=0;i<final_option.length;i++)
{

document.getElementById('dept').innerHTML+=`<option value="${final_option[i]}">${final_option[i]}</option>`
}

}


function ajax()
{
    return new Promise(function(resolve,reject)
    {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
    if(this.readyState==4 && this.status==200)
        {
           resolve(xhttp.responseText);
        }
    }
    xhttp.open("GET","json_data.json",true);
    xhttp.send();
    });
}
function getdetails()
{
   
    ajax().then(function(x){
    fill_table(x);
    })
}
function chooseByDept(){
    let x=document.getElementById("dept").value;
    let y=document.getElementById("dynamic_table");
   
//write logic
    let tr = y.getElementsByTagName('tr');
    console.log(tr.length);
    if(x=='All'){
getdetails();
    }
    else{
    for(let i=1;i<tr.length;i++){
        let td=tr[i].getElementsByTagName('td')[4];
        if(x==td.innerText){
            tr[i].style.display='';

        }
        else{
            tr[i].style.display='none';
        }
    }

    }
}

