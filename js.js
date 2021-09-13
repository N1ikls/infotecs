"use strict";
async function JSON() {
  let url =
    "https://raw.githubusercontent.com/N1ikls/infotecs/master/json.json";
  let response = await fetch(url);
  let json = await response.json();
  json = json.JSON; // читаем ответ в формате JSON
  console.log(json); // проверяем получили ли ответ

  let count = 10; // количество страниц выведенных
  let table = document.querySelector("#table");
  let items = [];
  let pag = document.querySelector("#pagination");

  for (let i = 1; i <= Math.ceil(json.length / count); i++) {
    // формула с учетом сколько нужно номеров (пагинации) для count
    let li = document.createElement("li"); // например 50/10 = 5 - номеров для 10 страниц
    li.innerHTML = i;
    pag.appendChild(li);
    items.push(li);
  }

  let s = document.querySelector("#sort");
  for (let i = 1; i <= 4; i++) {
    // просто выведем лист чтобы по нажатию сортировали
    let li = document.createElement("p");
    li.innerHTML = `Sort  ${i} column`;
    s.appendChild(li);
  }

  showPage(items[0]); // Чтобы отображалось хотябы 1 (пагинация )

  let active; // стиль чтобы знать на каком номере мы остановились
  for (let item of items) {
    item.addEventListener("click", function () {
      // функция клика по номеру (чтобы узнавать на какой номер мы нажали)
      if (active) {
        active.classList.remove("active");
      }
      active = this;
      this.classList.add("active");
      showPage(this);
    });
  }

  let t = document.querySelector("#table");
  let trs = document.querySelectorAll("#table tr");
  let button = document.querySelectorAll("#sort p");
  let btn = document.querySelector(".btn");
  let click = 0;
  btn.addEventListener("click", function () {
    // фунцкия закрытия открытия таблицы
    table.innerHTML = " ";
    click++;
    if (click == 2) {
      showPage(items[0]);
      click = 0;
    }
  });
  for (let i in button) {
    // сортировка по кнопкам
    button[i].addEventListener("click", () => {
      let sorted = [...trs].sort((a, b) => {
        if (a.children[i].innerHTML >= b.children[i].innerHTML) {
          return 1;
        } else {
          return -1;
        }
      });
      t.innerHTML = " ";
      for (let tr of sorted) {
        // добавляем на экран
        t.appendChild(tr);
      }
    });
  }
  function showPage(item) {
    // вывод таблицы
    // функция пагинации
    let pag = +item.innerHTML; // какой номер мы кликнули
    let notes = [];
    //let start = (pag - 1) * count;
    //let end = start + count;   пытался сделать так. Но почему то не хочет рабоать прорешал на листке все сходится :(
    //notes = json.splice(start,end)

    for (let i in json) {
      notes.push(json[i]);
    }
    if (pag == 1) {
      // проверка пагинации
      notes = notes.slice(0, 10);
    }
    if (pag == 2) {
      notes = notes.slice(10, 20);
    }
    if (pag == 3) {
      notes = notes.slice(20, 30);
    }
    if (pag == 4) {
      notes = notes.slice(30, 40);
    }
    if (pag == 5) {
      notes = notes.slice(40, 50);
    }

    table.innerHTML = "";

    for (let note in notes) {
      // выводим таблицу привязанные к пагинации
      let tr = document.createElement("tr");
      table.appendChild(tr);
      let td;

      td = document.createElement("td");
      td.innerHTML = notes[note].name.firstName;
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = notes[note].name.lastName;
      tr.appendChild(td);

      td = document.createElement("td");

      let k = 0;
      let q = 0;
      for (let i in notes[note].about) {
        // цикл позвояляет (после нахождения второго предложения ставим многоточие)
        k++;

        if (notes[note].about[i] == ".") {
          q++;
        }
        if (q == 2) {
          td.innerHTML = notes[note].about.slice(0, k) + "..";
          q = 0;
          break;
        }
      }

      tr.appendChild(td);

      td = document.createElement("td");
      td.className += `color_${note}`;
      td.innerHTML = " ";
      tr.appendChild(td);
    }
    for (let note in notes) {
      // чтобы поменять цвета в блоке
      let square = document.querySelector(`.color_${note}`);
      square.style.backgroundColor = `${notes[note].eyeColor}`;
      square.style.width = `70px`;
      square.style.borderRadius = "25px 25px 25px 25px";
    }
  }
}
JSON(); // запуск функции
