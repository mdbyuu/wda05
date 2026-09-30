let namaAplikasi = "Dashboard Shell";
let jumlahPengguna = 128;

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

console.log(namaAplikasi, "- Total pengguna:", jumlahPengguna);
console.log(formatRupiah(421000));

const statUsers = document.querySelector("#stat-users");
const statTransactions = document.querySelector("#stat-transactions");
const statAverage = document.querySelector("#stat-average");

console.log(statUsers, statTransactions, statAverage);

function tampilkanData() {
  statUsers.textContent = jumlahPengguna;
  statTransactions.textContent = 54;
  statAverage.textContent = formatRupiah(421000);
}

tampilkanData();

const btnRefresh = document.querySelector("#btn-refresh");

btnRefresh.addEventListener("click", () => {
  jumlahPengguna = Math.floor(Math.random() * 500);
  tampilkanData();
});

const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector("#sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (event) => {
    navLinks.forEach((l) => l.classList.remove("active"));
    event.currentTarget.classList.add("active");
  });
});

const btnTheme = document.querySelector("#btn-theme");

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const visitorNameInput = document.querySelector("#visitor-name");
const greetingOutput = document.querySelector("#greeting-output");

// UNSAFE — innerHTML will execute any tag/script inside the input
document.querySelector("#btn-greet-unsafe").addEventListener("click", () => {
  greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!";
});

// SAFE — textContent treats the input as plain text
document.querySelector("#btn-greet-safe").addEventListener("click", () => {
  greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!";
});

const commentBox = document.querySelector("#comment-box"); 
const commentInput = document.querySelector("#comment-input"); 
  
document.querySelector("#btn-comment").addEventListener("click", () => { 
  commentBox.textContent += "<p>" + commentInput.value + "</p>"; 
});