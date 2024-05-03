class Storage {

    static getSearchedUsersFromStorage() {
        //Tüm kullanıcılar alınacak

        let users;
        if (localStorage.getItem("searched") === null) { // searched anahtar kelimesi var mı?
            users = []; //null geliyorsa daha önceden veri yok demek
        }
        else { // eğer anahtar kelime varsa karşılık gelen değer alınıyor ve arraye çevriliyor
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUserToStorage(username) {
        // Kullanıcı ekle, varsa da ekleme
        // yeni kullanıcı eklemek için buradaki arrayi ilk fonksiyonu kullanarak elde etmek

        let users = this.getSearchedUsersFromStorage(); // this yerine Storage da kullanılır ama this zaten orayı gösteriyor

        // usernamein arrayin içinde olup olmadığı sorgulanacak bunun için Indexof kullanılacak -1 sonucu gelirse username users arrayinde yok demek

        if (users.indexOf(username) === -1) {
            users.push(username);
        } // else durumunu kontrole gerek yok farklı bir durum olursa username user içinde bulunursa if sağlanmayacak ve o değer zaten eklenmeyecek 

        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage() {
        //Tüm kullanıcılar silinecek

        localStorage.removeItem("searched");

    }
}