var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");

var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var currentIndex = 0;

var productList = [];
if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}

function addProduct() {
  if (
    validationName() &&
    validationPrice() &&
    validationCategory() &&
    validationDescription()
  ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/iphone-13.jpg",
    };
    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayData();
    console.log(productList);
    clearForm();
    clearValidation();

  }
}
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
  productImageInput.value = null;
}

function createHtmlCols(i) {
  var regex = new RegExp(searchInput.value, "gi");
  return `
  <div class="col-md-3">
          <div class="card rounded-4 shadow-lg pt-2 h-100">
            <img
              class="card-img-top"
              src="${productList[i].image}"
              alt="${productList[i].name}"
            />
            <div class="card-body">
              <span class="border border-1 index p-1 rounded-2 px-2">index ${i}</span>
              <h3 class="card-title text-start pt-3">${productList[
                i
              ].name.replace(
                regex,
                (match) => `<span class="bg">${match}</span>`
              )}</h3>
              <p class="card-text mb-0"><span class="fw-bold d-inline-block ">Category : </span> ${
                productList[i].category
              }</p>
              <p class="card-text mb-0"><span class="fw-bold d-inline-block ">Price :</span> ${
                productList[i].price
              } $</p>
              <p class="card-text "><span class="fw-bold d-inline-block">Description :</span> ${
                productList[i].description
              }</p>
            <div class="card-footer text-center">
              <button onclick="setUpdateInfo(${i})" type="button" class="btn btn-2 button me-2">
              <i class="fa-solid fa-trash"></i> Update
              </button>
              <button onclick="deleteItem(${i})" type="button" class="btn btn-2 button ms-2">
              <i class="fa-regular fa-pen-to-square"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
`;
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += createHtmlCols(i);
  }
  document.getElementById("rowData").innerHTML = cartona;
}
function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function searchData() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += createHtmlCols(i);
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function setUpdateInfo(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescInput.value = productList[index].description;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/iphone-13.jpg",
  };
  productList.splice(currentIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearForm();
}

function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
  var msgName = document.getElementById("msgName");
  if (regex.test(productNameInput.value)) {
    productNameInput.classList.remove("is-invalid");
    productNameInput.classList.add("is-valid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    msgName.classList.remove("d-none");
    return false;
  }
}

function validationPrice() {
  var regex = /^\d{1,10}(\.\d(1,2))?$/;
  var msgPrice = document.getElementById("msgPrice");
  if (regex.test(productPriceInput.value)) {
    productPriceInput.classList.remove("is-invalid");
    productPriceInput.classList.add("is-valid");
    msgPrice.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    msgPrice.classList.remove("d-none");
    return false;
  }
}

function validationCategory() {
  var regex = /^(tv|mobile|screens|electronic)$/i;
  var msgCategory = document.getElementById("msgCategory");
  if (regex.test(productCategoryInput.value)) {
    productCategoryInput.classList.remove("is-invalid");
    productCategoryInput.classList.add("is-valid");
    msgCategory.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    msgCategory.classList.remove("d-none");
    return false;
  }
}

function validationDescription() {
  var regex = /^.{3,}$/m; //multiline
  var msgDescription = document.getElementById("msgDescription");
  if (regex.test(productDescInput.value)) {
    productDescInput.classList.remove("is-invalid");
    productDescInput.classList.add("is-valid");
    msgDescription.classList.add("d-none");
    return true;
  } else {
    productDescInput.classList.add("is-invalid");
    msgDescription.classList.remove("d-none");
    return false;
  }
}

function validationImage() {
  var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg|webp)$/; 
  var msgImage = document.getElementById("msgImage");
  if (regex.test(productImageInput.value)) {
    productImageInput.classList.remove("is-invalid");
    productImageInput.classList.add("is-valid");
    msgImage.classList.add("d-none");
    return true;
  } else {
    productImageInput.classList.add("is-invalid");
    msgImage.classList.remove("d-none");
    return false;
  }
}

function clearValidation(){
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}

