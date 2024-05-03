// Elementleri Seçme

const githubFrom = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

evenListeners();

function evenListeners() {
    githubFrom.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
    let username = nameInput.value.trim();

    if (username === "") {
        alert("Lütfen geçerli bir kullanıcı adı girin.");
    }
    else {

        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    //Hata Mesajı - Yanlış Kullanıcı İsmi
                    ui.showError("Kullanıcı Bulunamadı.");
                }
                else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);

                    ui.showUserInfo(response.user); // userlar burada gönderildi
                    ui.showRepoInfo(response.repo); //repolar buraya gönderildi
                }
            })
            .catch(err => ui.showError(err));
    }

    ui.clearInput(); // Input temizleme
    e.preventDefault();
}

function clearAllSearched() {
    // Tüm arananları temizle

    if (confirm("Emin misiniz?")) {
        Storage.clearAllSearchedUsersFromStorage(); //storagedan temizleme
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched() {
    // Arananları storagedan al ve Uİ'a ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => { // resulta sürekli olarak li'ler eklenecek
        result += `
        <li class="list-group-item">${user}</li>
        `;

    });

    lastUsers.innerHTML = result;
}