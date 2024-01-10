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
            try {
                const item = JSON.parse(localStorage.getItem(key))
                const inp = document.createElement('input');
                const lab = document.createElement('label');
                const br = document.createElement('br');
                const cancel = document.createElement('span');
                const div = document.createElement('div');
                inp.classList.add("list_item");
                inp.type = "checkbox";
                lab.innerText = item[0];
                lab.classList.add("listItem")
                cancel.classList.add("cancelbut");
                cancel.innerHTML = '  &times;   ';
                div.id = 'div-' + item[0] + '-' + key;
                cancel.id = 'cancel-' + item[0] + '-' + key;
                div.classList.add("item-div");
                //console.log(item.checked)
                inp.checked = item[1] !== 0;
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
            } catch (e) {
                console.error("Error during reading value:", e);
            }
        }
    });
}

function doneButtonClickHandler() {
    let listItem = document.getElementById("inputText").value;
    console.log(listItem === '')
    if (listItem !== '') {
        const value = [listItem, 0]
        localStorage.setItem(Date.now().toString() + '-index', JSON.stringify(value))
        fetchItems()
    }
}

function deleter(key) {
    localStorage.removeItem(key)
    fetchItems()
}

function changer(key) {
    const value = JSON.parse(localStorage.getItem(key))
    let checked = 1 - value[1]
    const new_value = [value[0], checked]
    localStorage.setItem(key, JSON.stringify(new_value))
    fetchItems()
}