let dishes = document.querySelector(".dishes");

let api = "https://66967f520312447373c2c840.mockapi.io/malohat";

async function getDishes() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    get(data);
  } catch (error) {
    console.error(error);
  }
}

let editmodal = document.querySelector(".editmodal");
let cityedit = document.querySelector(".cityedit");
let textedit = document.querySelector(".textedit");
let priceedit = document.querySelector(".priceedit");
let btnsedit = document.querySelector(".btnsedit");
let btnclousee = document.querySelector(".btnclousee");

function edituser(user) {
  cityedit.value = user.name;
  textedit.value = user.email;
  priceedit.value = user.price;

  btnsedit.onclick = async () => {
    try {
      await fetch(`${api}/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cityedit.value,
          email: textedit.value,
          price: priceedit.value,
        }),
      });
      editmodal.close();
      getDishes();
    } catch (error) {
      console.error(error);
    }
  };
}

btnclousee.onclick = () => {
  editmodal.close();
};

function get(data) {
  dishes.innerHTML = "";
  data.forEach((element) => {
    let dish = document.createElement("div");
    dish.classList.add("dish");

    let dishimg = document.createElement("div");
    let image = document.createElement("img");
    image.src = element.avatar;

    let dishinfo = document.createElement("div");
    let star = document.createElement("div");
    star.classList.add("star");
    star.innerHTML = `
      <div class="rating">
        <input value="5" name="rate${element.id}" id="star5-${element.id}" type="radio">
        <label title="text" for="star5-${element.id}"></label>
        <input value="4" name="rate${element.id}" id="star4-${element.id}" type="radio">
        <label title="text" for="star4-${element.id}"></label>
        <input value="3" name="rate${element.id}" id="star3-${element.id}" type="radio" checked="">
        <label title="text" for="star3-${element.id}"></label>
        <input value="2" name="rate${element.id}" id="star2-${element.id}" type="radio">
        <label title="text" for="star2-${element.id}"></label>
        <input value="1" name="rate${element.id}" id="star1-${element.id}" type="radio">
        <label title="text" for="star1-${element.id}"></label>
      </div>
    `;

    let name = document.createElement("h1");
    name.innerHTML = element.name;
    name.classList.add("name");

    let info = document.createElement("p");
    info.innerHTML = element.email.slice(0, 60) + "...";
    info.classList.add("info");

    let action = document.createElement("div");
    action.classList.add("action");

    let price = document.createElement("h2");
    price.innerHTML = "$" + element.price;
    price.classList.add("pricee");

    let delbtn = document.createElement("img");
    delbtn.src =
      "https://avatars.mds.yandex.net/i?id=a52d782ca304c55ea546749a5fa9e2895baf21a9-2375004-images-thumbs&n=13";
    delbtn.classList.add("delbtn");
    delbtn.style.width = "25px";
    delbtn.onclick = async () => {
      try {
        await fetch(`${api}/${element.id}`, {
          method: "DELETE",
        });
        getDishes();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    let editbtn = document.createElement("img");
    editbtn.src =
      "https://w7.pngwing.com/pngs/376/940/png-transparent-computer-icons-editing-color-others-angle-trademark-logo.png";
    editbtn.classList.add("editbtn");
    editbtn.style.width = "25px";
    editbtn.style.height = "25px";
    editbtn.onclick = () => {
      editmodal.showModal();
      edituser(element);
    };

    let checkedbtn = document.createElement("input");
    checkedbtn.type = "checkbox";
    checkedbtn.classList.add("checked");

    action.append(price, checkedbtn, delbtn, editbtn);
    dishinfo.append(star, name, info);
    dishimg.append(image);
    dish.append(dishimg, dishinfo, action);
    dishes.appendChild(dish);
  });
}

getDishes();

let btnadd = document.querySelector(".btnadd");
let addmodal = document.querySelector(".addmodal");
let img = document.querySelector(".img");
let city = document.querySelector(".city");
let text = document.querySelector(".text");
let price = document.querySelector(".price");
let btnsave = document.querySelector(".btnsave");
let btnclouse = document.querySelector(".btnclouse");

btnadd.onclick = () => {
  addmodal.showModal();
};

async function postuser(user) {
  try {
    await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    addmodal.close();
    getDishes();
  } catch (error) {
    console.error(error);
  }
}

btnclouse.onclick = () => {
  addmodal.close();
};

btnsave.onclick = () => {
  let newObj = {
    avatar: img.value,
    email: text.value,
    name: city.value,
    price: price.value,
  };
  postuser(newObj);
  img.value = "";
  city.value = "";
  text.value = "";
  price.value = "";
};
//search
let search = document.querySelector(".search")
search.oninput = () => {
  let value = search.value.toLowerCase();
  let newData = data.filter((element) => {
    return element.name.toLocaleLowerCase().includes(value);
  });
  getDishes(newData);
};
