// Задання вихідних параметрів (title, [x], content) конфігурації модалки 
const modal = $.modal({
    title: ' options',
    closable: true,
    content: `
      <div class="modal-form">
  <label for="name">Назва комутатора:</label><br>
  <input type="text" id="name" name="name" class="modal-form-field" placeholder="Введіть назву комутатора..."/><br><br>

  <label for="portsGE">Кількість портів Gigabit Ethernet:</label><br>
  <input type="text" id="portsGE" name="portsGE" class="modal-form-field" placeholder="Введіть кількість портів Gigabit Ethernet"/><br><br>

  <label for="portsSFP">Кількість портів SFP:</label><br>
  <input type="text" id="portsSFP" name="portsSFP" placeholder="Введіть кількість портів SFP" class="modal-form-field"><br><br>

  <label for="montage">Тип:</label><br>
  <select class="modal-form-field" name="montage" id="montage">
    <option value="Некерований">Некерований</option>
    <option value="Керований L2">Керований L2</option>
    <option value="Керований L3(L2+)">Керований L3(L2+)</option>
  </select>
  <br><br>

  <label for="type">Можливість монтажу в стійку:</label><br>
  <select class="modal-form-field" name="type" id="type">
    <option value="Так">Так</option>
    <option value="Ні">Ні</option>
  </select>
  <br><br>

  <div id="img-prev-section">
    <img id="imgprev" src="">
  </div>

  <label for="file" id="label-select-img">Select image file:</label><br>
  <input type="file" id="imgfile" name="imgfile"><br><br>

  <button id="submitbtn" class="blue-button" onclick="myFunction()">Click me</button>
</div>

    `,
    width: '500px'
})



