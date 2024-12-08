
//Создать в проекте js файл
//Подключить файл в проект через тег script
//Выполнить упражнения: Написать функции, которые выполняют следующее (вывод в консоль браузера осуществляется через console.log()):

//Сложить два числа
//Вернуть наиболшее из 3х числел
//Вернуть самую длинную строку
//Является ли слова палиндромом?
//Сумма элементов массива
//Отфильтровать массив чисел (оставить в массиве числа больше 10)
//Отфильтровать массив объектов (младше 50 лет) [{ name: "Bob", age: 50}, { name: "Jane", age: 64}, { name: "Jack", age: 25}]
//Склонировать объект { name: "Bob", age: 50, children: [ { name: "Marie", age: 16}, { name: "Jame", age: 12} ] }

//В конец блока работ проектов кнопку "Добавить проект" (выглядеть она может как кнопка в первом блоке "связаться со мной")
//По нажатию на эту кнопку открывается всплывающее окно, в котором мы заполняем название и описание проекта всплывающее окно можно взять здесь
//Нажимаем кнопку "Ок" и всплывающее окно закрывается, а всписке проектов появляется новый, с написанным нами описанием (фотографию можно оставить по умолчанию).
function sum2 (a,b){
 return a+b;   
}
var a = 1;
var b = 8;
var c=300;
console.log("total :",sum2(a,b));
console.log("maximum :", Math.max(a, b, c)); 

const e = "ya ne frontender";
const f = "tatatatatatatatatatatata";
function max_length(str1, str2) {
    if (str1.length >= str2.length){
        console.log(str1)
    } else {
        console.log(str2)
    }
}
max_length(e, f)

const pal = 'аргентинаманитнегра';
function palindrom(t) {
if (t.toString().split("").reverse().join("") == t.toString()) {
  console.log("Это палиндром")
} else {
  console.log("Это не палиндром")
}
}
palindrom(pal)

//modal
const blocksWrapper = document.querySelector('.work__class');
const addProjectBtn = document.querySelector('.work__button');
const addProjectModal = document.querySelector('.modal');
const closeProjectBtn = document.querySelector('.modal__close');
const nameProject = document.getElementById('name');
const descriptionProject = document.getElementById('description');
const linkProject = document.getElementById('link');
const newProjectBtn = document.getElementById('newProject');
addProjectBtn.addEventListener('click', addProject);
closeProjectBtn.addEventListener('click', close);
newProjectBtn.addEventListener('click', addnewProject);
function addProject( ) {
  addProjectModal.classList.add('open');
}
function addnewProject( ) {
  const newElement = document.createElement('div');
  newElement.classList.add('work__block');
  const nameProject = document.getElementById('name').value;
  const descriptionProject = document.getElementById('description').value;
  const linkProject = document.getElementById('link').value;
  newElement.innerHTML = `
      <div class="work__img">
          <img src="${linkProject}" alt="" class="work__picture">
      </div>
      <div class="work__name">
      <h2 class="work__word">
          ${nameProject}
      </h2>
      <p class="work__description">
          ${descriptionProject}
      </p>
      </div>
  `
  blocksWrapper.appendChild(newElement);

  clearInputFields ();
}
function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('link').value = '';
}

function close( ) {
  addProjectModal.classList.remove('open');
}

document.addEventListener("DOMContentLoaded", function() {
  const quotesList = document.querySelector(".quotes__list");
  const authorsDropdown = document.querySelector("#authors-dropdown");
  const randomQuotesButton = document.querySelector("#random-quotes-button");
  let authorsSet = new Set();
  let cachedQuotes = []; // Массив для сохранения загруженных цитат

  // Функция для загрузки 10 цитат одним запросом
  async function fetchBulkQuotes() {
      try {
          const response = await fetch("https://programming-quotesapi.vercel.app/api/bulk");
          if (!response.ok) {
              throw new Error("Ошибка при загрузке цитат");
          }
          const quotes = await response.json();
          return quotes;
      } catch (error) {
          console.error("Ошибка при загрузке цитат:", error);
          return [];
      }
  }

  // Функция для загрузки и отображения 10 случайных цитат
  async function loadRandomQuotes() {
      quotesList.innerHTML = ""; // Очищаем список цитат
      authorsSet.clear();
      authorsDropdown.innerHTML = ""; // Очищаем список авторов
      cachedQuotes = []; // Сбрасываем кэшированные цитаты

      const quotes = await fetchBulkQuotes();
      cachedQuotes = quotes; // Сохраняем цитаты в кэш

      quotes.forEach(quote => {
          const listItem = document.createElement("li");
          listItem.classList.add("quotes__list-item");
          listItem.textContent = `"${quote.quote}" — ${quote.author}`;
          quotesList.appendChild(listItem);

          // Сохраняем автора
          authorsSet.add(quote.author);
      });

      // Обновляем выпадающий список авторов
      authorsSet.forEach(author => {
          const option = document.createElement("option");
          option.value = author;
          option.textContent = author;
          authorsDropdown.appendChild(option);
      });
  }

  // Функция для загрузки и отображения цитат определённого автора
  function loadQuotesByAuthor(author) {
      quotesList.innerHTML = ""; // Очищаем список цитат
      let authorQuotes = cachedQuotes.filter(quote => quote.author === author);

      if (authorQuotes.length === 0) {
          console.warn("Нет цитат для выбранного автора в кэше.");
          return;
      }

      authorQuotes.forEach(quote => {
          const listItem = document.createElement("li");
          listItem.classList.add("quotes__list-item");
          listItem.textContent = `"${quote.quote}" — ${quote.author}`;
          quotesList.appendChild(listItem);
      });
  }

  // Обработчик выбора автора из выпадающего списка
  authorsDropdown.addEventListener("change", function() {
      const selectedAuthor = authorsDropdown.value;
      if (selectedAuthor) {
          loadQuotesByAuthor(selectedAuthor);
      }
  });

  // Обработчик кнопки случайные цитаты
  randomQuotesButton.addEventListener("click", loadRandomQuotes);

  // Загрузка случайных цитат при загрузке страницы
  loadRandomQuotes();
});