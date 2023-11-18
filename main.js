// DOM -> Document Object Model
// console.dir(document);
// console.log(document.URL);
// console.log(document.body);
let users = JSON.parse(localStorage.getItem("users")) || [];

const usersContainer = document.getElementById("usersContainer");
const nameInput = document.getElementById("nameInput");
const surnameInput = document.getElementById("surnameInput");
const ageInput = document.getElementById("ageInput");
const addUserForm = document.getElementById("addUserForm");

const showData = () => {
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    let data = `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.surname}</td><td>${user.age}</td><td><button onclick="deleteUser(${user.id})" class="btn btn-danger">&times; </button></td</tr>`;

    usersContainer.innerHTML += data;
  });
};
showData();

addUserForm.onsubmit = (e) => {
  e.preventDefault();
  let nameInputValue = nameInput.value;
  let surnameInputValue = surnameInput.value;
  let ageInputValue = ageInput.value;
  users.push({
    id: users.length + 1,
    name: nameInputValue,
    surname: surnameInputValue,
    age: ageInputValue,
  });
  addUserForm.reset();
  showData();
  localStorage.setItem("users", JSON.stringify(users));
};
const deleteUser = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Silmek isteyirsenmi?",
      text: "Silsen geri qaytara bilmeyeceksen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sil getsin!",
      cancelButtonText: "Yox brat elim deydi!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Silindi!",
          "Istifadecini sildin getdi...",
          "success"
        );
        users.filter((user, index) => user.id != id || users.splice(index, 1));
        showData();
        localStorage.setItem("users", JSON.stringify(users));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "O zaman silinmedi",
          "User yerinde qalib",
          "error"
        );
      }
    });
};


deleteAllUsers.onclick = () => {
    localStorage.clear();
    showData();
}

