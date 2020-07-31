const studentsTable = document.querySelector('#stu-table');
const form = document.querySelector("#add-students-form");
// create element & render
function renderStudents(doc){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', doc.id);
    td1.textContent = doc.data().name;
    td2.textContent = doc.data().age;
    td3.textContent = doc.data().gender;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    // delete //刪除按鈕
    let cross = document.createElement('div');
    cross.textContent = 'x';
    tr.appendChild(cross);
    cross.addEventListener('click', (test) => {
        test.stopPropagation();  //取消 重新整理頁面//這行不用懂為什麼
        let id = test.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('ClassA').doc(id).delete();//刪除DB資料
    });
    //

    studentsTable.appendChild(tr);
}

// getting data 
db.collection('ClassA').get().then(data => {
    data.docs.forEach(doc => {
        renderStudents(doc);//把 Array裡的每一個doc 渲染(render)成你要的表格
    });
});
// 

// add data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('ClassA').add({
        name: form.name.value,
        gender: form.gender.value,
        age: form.age.value
    });
    form.name.value = '';
    form.gender.value = '';
    form.age.value = '';
});
//