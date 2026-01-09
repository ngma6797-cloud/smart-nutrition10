let storiesData = {};
let words = [];
let wordIndex = 0;

fetch("stories.json")
  .then(res => res.json())
  .then(data => {
    storiesData = data;
    loadStories();
  })
  .catch(() => {
    document.body.innerHTML = "<h2>⚠️ حدث خطأ في تحميل القصص</h2>";
  });

document.getElementById("enterBtn").onclick = () => {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("nameBox").classList.remove("hidden");
};

document.getElementById("nameBtn").onclick = () => {
  const name = document.getElementById("username").value;
  if (!name) return;

  const msg = new SpeechSynthesisUtterance("أهلا وسهلا بك يا " + name);
  msg.lang = "ar-SA";
  speechSynthesis.speak(msg);

  document.getElementById("nameBox").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
};

function loadStories() {
  const list = document.getElementById("storiesList");
  for (let key in storiesData) {
    const btn = document.createElement("button");
    btn.textContent = storiesData[key].title;
    btn.onclick = () => openStory(key);
    list.appendChild(btn);
  }
}

function openStory(key) {
  const story = storiesData[key];
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("storyBox").classList.remove("hidden");

  document.getElementById("storyTitle").textContent = story.title;

  words = story.text.split(" ");
  document.getElementById("storyText").innerHTML =
    words.map(w => `<span>${w}</span>`).join(" ");
}

document.getElementById("readBtn").onclick = () => {
  const spans = document.querySelectorAll("#storyText span");
  wordIndex = 0;

  const utter = new SpeechSynthesisUtterance(words.join(" "));
  utter.lang = "ar-SA";

  utter.onboundary = (e) => {
    if (e.name === "word") {
      spans.forEach(s => s.classList.remove("active"));
      if (spans[wordIndex]) spans[wordIndex].classList.add("active");
      wordIndex++;
    }
  };

  speechSynthesis.speak(utter);
};

document.getElementById("settings").onclick = () => {
  document.getElementById("settingsBox").classList.toggle("hidden");
};

document.getElementById("textColor").oninput = (e) => {
  document.body.style.color = e.target.value;
};

document.getElementById("bgColor").oninput = (e) => {
  document.body.style.background = e.target.value;
};

function closeSite() {
  window.close();
}
