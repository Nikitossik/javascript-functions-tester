const checkBtn = document.querySelector("#check-btn");
const saveBtn = document.querySelector("#save-btn");
let task;

ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript");
editor.setTheme("ace/theme/dawn");
editor.setOptions({
  enableLiveAutocompletion: true,
});


editor.on("change", function () {
  let code = editor.getValue();
  setStorageItem("userCode", code);
});

if (sessionStorage.hasOwnProperty('userCode')) editor.setValue(getStorageItem('userCode'));

function setStorageItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getStorageItem(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function showTask() {
  let task = getStorageItem("currentTask");
  let banner = document.querySelector(".sect__task.task");
  banner.innerHTML = "";
  banner.innerHTML += `<h2 class="task__title">Задание #${task.index}</h2>`;
  banner.innerHTML += `${task.name}`;
  banner.innerHTML += `${task.descr}`;
  if (task.details) banner.innerHTML += `${task.details}`;
}

function checkUserFunc() {
  let task = getStorageItem("currentTask");
  let code = getStorageItem("userCode");

  document.getElementById('mocha').innerHTML = '';

  if (document.querySelector('#user-code-script'))
      document.querySelector('#user-code-script').remove();

  let script = document.createElement("script");
  script.innerHTML = code;
  script.id = "user-code-script";
  document.body.appendChild(script);

  if (document.querySelector('#user-code-test'))
      document.querySelector('#user-code-test').remove();

  let test = document.createElement("script");
  test.src = `assets/js/tests/${task.funcName}-test.js`;
  test.id = "user-code-test";
  document.body.appendChild(test);
}

function saveFile() {
  let task = getStorageItem("currentTask");
  let code = getStorageItem("userCode");
  let file = new Blob([code], { type: "text/plain" });
  saveBtn.href = URL.createObjectURL(file);
  saveBtn.download = task.funcName + ".js";
}

function loadTasks() {
  let request = new XMLHttpRequest();
  request.open("GET", "assets/js/tasks.json", true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      let tasks = JSON.parse(request.responseText),
        index = Math.floor(Math.random() * tasks.length),
        task = tasks[index];
      task.index = index;

      if (!sessionStorage.hasOwnProperty("currentTask"))
        setStorageItem("currentTask", task);

      showTask();
    }
  };
  request.send();
}

loadTasks();

checkBtn.addEventListener("click", checkUserFunc);
saveBtn.addEventListener("click", saveFile);
