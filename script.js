const courses = [
  {
    id: "1",
    title: "DSA in C++",
    description: "Learn Data Structures and Algorithms using C++ by Apna College.",
    videoUrl: "https://www.youtube.com/embed/t6zLJOCVqD0"
  },
  {
    id: "2",
    title: "JavaScript Full Course",
    description: "Complete JavaScript tutorial for beginners from Apna College.",
    videoUrl: "https://www.youtube.com/embed/VlPiVmYuoqw"
  },
  {
    id: "3",
    title: "HTML & CSS Crash Course",
    description: "Build websites from scratch using HTML & CSS. Beginner course by Apna College.",
    videoUrl: "https://www.youtube.com/embed/Rek0NWPCNOc"
  }
];


const mainContent = document.getElementById("main-content");

function getProgress(id) {
  const stored = JSON.parse(localStorage.getItem("progress") || "{}");
  return stored[id] || 0;
}

function setProgress(id, value) {
  const stored = JSON.parse(localStorage.getItem("progress") || "{}");
  stored[id] = value;
  localStorage.setItem("progress", JSON.stringify(stored));
}

function renderIntroPage() {
  document.title = "Welcome";
  mainContent.innerHTML = `
    <section class="intro-page">
      <h2>Welcome to E-Learning</h2>
      <p>Browse professional courses and track your progress. Learn anywhere, anytime.</p>
      <button class="btn-get-started" id="get-started">Get Started</button>
    </section>
  `;
  document.getElementById("get-started").addEventListener("click", () => {
    window.location.hash = "#home";
  });
}

function renderCourseList() {
  document.title = "Courses";
  mainContent.innerHTML = `
    <h2>Available Courses</h2>
    <ul class="course-list">
      ${courses.map(c => {
        const progress = getProgress(c.id);
        return `
          <li>
            <a href="#course-${c.id}" class="course-title">${c.title}</a>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress-text">${progress}% completed</div>
          </li>
        `;
      }).join('')}
    </ul>
  `;
}

function renderCourseDetail(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return renderCourseList();

  const progress = getProgress(id);
  document.title = course.title;
  mainContent.innerHTML = `
    <h2>${course.title}</h2>
    <p>${course.description}</p>

    <div class="video-container">
      <iframe src="${course.videoUrl}" allowfullscreen></iframe>
    </div>

    <label for="progress-slider">Your Progress: <span id="progress-value">${progress}</span>%</label>
    <input type="range" id="progress-slider" value="${progress}" min="0" max="100" step="1" />

    <a href="#home" class="back-link">← Back to Courses</a>
  `;

  const slider = document.getElementById("progress-slider");
  const progressValue = document.getElementById("progress-value");

  slider.addEventListener("input", () => {
    const value = slider.value;
    setProgress(id, value);
    progressValue.textContent = value;
  });
}

function handleRouting() {
  const hash = window.location.hash;

  if (!hash || hash === "#intro") {
    renderIntroPage();
  } else if (hash === "#home") {
    renderCourseList();
  } else if (hash.startsWith("#course-")) {
    renderCourseDetail(hash.split("-")[1]);
  } else {
    renderIntroPage();
  }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);

// === Theme Switcher ===
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

themeBtn.addEventListener("click", toggleTheme);

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});
