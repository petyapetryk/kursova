// Функція для побудови елемента та розміщення його в DOM
function buildElementToPage(id, elem) {                               
    const element = document.createElement('div')
    element.classList.add('element')
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-data">
    <img src="img/${elem.pictname}" class="element-img">
    <div class="element-name">${elem.name}</div>
    <p class="element-text">Кількість портів Gigabit Ethernet: <span class="element-portsGE">${elem.portsGE}</span></p> 
    <p class="element-text">Кількість портів SFP: <span class="element-portsSFP">${elem.portsSFP}</span></p> 
    <p class="element-text">Можливість монтажу в стійку: <span class="element-montage">${elem.montage}</span></p> 
    <p class="element-text">Тип: <span class="element-type">${elem.type}</span></p> 
</div>
<div class="element-footer">
    <button class="blue-button" onclick="modifyModalToEdit(${id})">Редагувати</button><span> </span>
    <button class="red-button" onclick="removeElementFromStorage(${id})">Видалити</button>
</div>

    <p></p>
    `)
    document.getElementsByClassName("displayzone")[0].appendChild(element)
}

// Зміна параметрів модалки для СТВОРЕННЯ нового елементу
function modifyModalToCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Створити новий комутатор"
    document.getElementById("submitbtn").setAttribute("onclick", `addElementToLocalStorage()`)
    document.getElementById("submitbtn").innerText = "Створити"
    document.getElementById("img-prev-section").setAttribute("style", "display: none")
    document.getElementById("label-select-img").innerText = "Вибрати зображення:"
    //  Вікриваємо модалку
    modal.open()
}

// Зміна параметрів модалки для РЕДАГУВАННЯ поточного елементу
function modifyModalToEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Редагувати комутатор"
    document.getElementById("submitbtn").innerText = "Оновити"
    document.getElementById("submitbtn").setAttribute("onclick", `editElementInLocalStorage(${id})`)
    //  Вибираємо елемент по ID з LS і парсимо в об'єкт
    let edElem = JSON.parse(localStorage.getItem(id))
    //  Встановлюємо значення полів форми
    document.getElementById("name").value = edElem.name;   
    document.getElementById("portsGE").value = edElem.portsGE;   
    document.getElementById("portsSFP").value = edElem.portsSFP;  
    document.getElementById("montage").value = edElem.montage;  
    document.getElementById("type").value = edElem.type; 
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.pictname}`)
    document.getElementById("label-select-img").innerText = "Ви можете вибрати інше зображення:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
    // document.getElementById("imgfile").value = edElem.pictname; 
    //  Вікриваємо модалку
    modal.open()
}

//  Відображення в модалці зменшеної картинки
function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`)
    document.getElementById("label-select-img").innerText = "You can choose another image file:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
}

//Слухаємо, чи змінилося значення поля input type="file" (чи вибралася інша картинка)
document.getElementById("imgfile").addEventListener("change", showPrewImg)



function validNameAndportsGE(){
    let valid = true;
    let showMsg = '';
    let formName = document.getElementById("name").value.trim();
    let formportsGE = document.getElementById("portsGE").value.trim();
    let formportsSFP = document.getElementById("portsSFP").value.trim();
    if (!formName) {
        showMsg = ' Поле назви комутатора порожнє! '
        valid = false;
    }  
    if (!formportsGE) {
        showMsg = showMsg + ' Поле кількості портів Gigabit Ethernet порожнє!'
        valid = false;
    } 
 
    if (!formportsSFP) {
        showMsg = showMsg + ' Поле кількості портів SFP порожнє!'
        valid = false;
    } 
    if (valid) {return valid} else {alert (showMsg)}
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("Помилка ! Зображення не вибрано")
        return false} ;
}

// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (validNameAndportsGE() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        // Будуємо новий елемент
        const newElement = {};
        newElement.name =  document.getElementById("name").value;   
        newElement.portsGE = document.getElementById("portsGE").value;   
        newElement.portsSFP = document.getElementById("portsSFP").value;  
        newElement.montage = document.getElementById("montage").value; 
        newElement.type = document.getElementById("type").value; 
        newElement.pictname = filename;   
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement)
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
// Редагування параметрів елемента та розміщення його в LS
function editElementInLocalStorage(id) {
    if (validNameAndportsGE()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.name =  document.getElementById("name").value;   
        edElem.portsGE = document.getElementById("portsGE").value;   
        edElem.portsSFP = document.getElementById("portsSFP").value;   
        edElem.montage = document.getElementById("montage").value;  
        edElem.type = document.getElementById("type").value;  
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
            edElem.pictname = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000) //Перезавантажуємо вікно
    }
   
}

// Видалення параметрів елемента з LS
function removeElementFromStorage(id){
    if (confirm("Ви впевнені, що хочете видалити??")) {
        localStorage.removeItem(id)
        location.reload();          //Перезавантажуємо вікно
    }

} 

let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}
    

