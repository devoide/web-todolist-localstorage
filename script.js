document.addEventListener("DOMContentLoaded", load_content)

function load_content(){
    fetchItems()
    document.getElementById("done").addEventListener("click", doneButtonClickHandler);
}

function fetchItems() {
    const parentdiv = document.getElementById("list");
    while (parentdiv.firstChild) {
        parentdiv.removeChild(parentdiv.firstChild);
    }
    Object.keys(localStorage).forEach(key => {
        if (key.endsWith('-index')) {
            let item = localStorage.getItem(key)
            const inp = document.createElement('input');
            const lab = document.createElement('label');
            const br = document.createElement('br');
            const cancel = document.createElement('span');
            const div = document.createElement('div');
            inp.classList.add("list_item");
            inp.type = "checkbox";
            lab.innerText = item;
            lab.classList.add("listItem")
            cancel.classList.add("cancelbut");
            cancel.innerHTML = '  &times;   ';
            div.id = 'div-' + item + '-' + key;
            cancel.id = 'cancel-' + item + '-' + key;
            div.classList.add("item-div");
            //console.log(item.checked)
            //inp.checked = item.checked !== 0;
            div.appendChild(inp);
            div.appendChild(lab);
            div.appendChild(cancel);
            div.appendChild(br);
            parentdiv.appendChild(div);
            cancel.addEventListener("click", () => {
                deleter(key);
            });
            inp.addEventListener("change", () => {
                changer(key)
            });
        }
    });
}

function doneButtonClickHandler() {
    let listItem = document.getElementById("inputText").value;
    console.log(listItem === '')
    if (listItem !== '') {
        localStorage.setItem(Date.now().toString() + '-index', listItem)
        fetchItems()
    }
}

function deleter(index) {
    localStorage.removeItem(index)
    fetchItems()
}

function changer(index) {
    console.log("sum")
}