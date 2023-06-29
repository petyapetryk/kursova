function getArrayFromStorage() {
    let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage
    // Оголошуємо об'єкт у який будемо збирати дані з LS
    let elm = {}
    // Оголошуємо масив у який будемо об'єкти
    let incomingArr = []
    
    //Вибираємо дані з LS, формуємо об'єкти та передаємо його в масив
    for (let i = 0; i < keyNumbers; i++) {
        let keyName = localStorage.key(i)
        let row = JSON.parse(localStorage.getItem(keyName))
        // buildElementToPage(keyName, row)
        elm = {}                // !!! Очищуємо об'єкт на початку кожної ітерації
        elm.id = keyName;
        elm.name = row.name;
        elm.portsGE = row.portsGE;
        elm.portsSFP = row.portsSFP;
        elm.montage = row.montage;
        elm.type = row.type;
        elm.pictname = row.pictname;
        incomingArr.push(elm)
    }
    return incomingArr
}

function sortElements() {
  let checkBox = document.getElementById("sortcheckbox");
  if (checkBox.checked == true) {
    let sortArr = getArrayFromStorage();

    function byField(field) {
      return (a, b) => {
        const valueA = parseInt(a[field]);
        const valueB = parseInt(b[field]);
        return valueA - valueB;
      };
    }

    sortArr.sort(byField('portsGE'));

    document.getElementsByClassName("displayzone")[0].innerHTML = '';
    for (let n = 0; n < sortArr.length; n++) {
      let tempEl = sortArr[n];
      buildElementToPage(tempEl.id, tempEl);
    }
  } else {
    setTimeout(() => location.reload(), 1000); // Перезавантажуємо вікно
  }
}



function searchElements(){
  //  Очищеємо зону елементів
  document.getElementsByClassName("displayzone")[0].innerHTML = ''
  //  Беремо масив з LS
  let searchtArr = getArrayFromStorage()
  //  Беремо дані з поля пошуку
  let str = document.querySelector("#csearch").value
  //  Приводимо їх до нижнього регістру
  let serchStr = str.toLowerCase();
  //  Створюємо регулярку для тестування (пошуку)
  let  regExp = new RegExp(`${serchStr}`, "gi")
  let isFounded = false
  //  Перевіряємо елементи масиву
  for (let i=0; i<searchtArr.length; i++) {
      let row = searchtArr[i]
      let strN = row.name.toLowerCase();
      let strC = row.portsGE.toLowerCase();
      let strCH = row.portsSFP.toLowerCase();
      let strD = row.montage.toLowerCase();
      let strF = row.type.toLowerCase();
      if (regExp.test(strN) || regExp.test(strC) || regExp.test(strCH)|| regExp.test(strD)|| regExp.test(strF)) {buildElementToPage(row.id, row)
                                                                        isFounded = true}
      }
  if (!isFounded) {document.getElementsByClassName("displayzone")[0].innerHTML = '<h1 style="color:red; width:100%; text-align: center;" >Комутатор не знайдено</h1>'}
   
}

refresh = () => location.reload()

let sortcheckbox = document.getElementById("sortcheckbox");
sortcheckbox.addEventListener('change', sortElements);

searchbtn.addEventListener('click', searchElements)

cancelbtn.addEventListener('click', refresh)
