let items = []

// Evento para carregar os itens salvos ao iniciar a página
window.addEventListener("DOMContentLoaded", verifyLocalStorageItems)

function addItem() {
    const itemName = document.querySelector("#item").value.trim()

    if (itemName === "") {
        alert("Digite um item para adicionar")
        return
    }

    const item = {
        id: Date.now(), // ID único
        name: itemName,
        checked: false
    }

    items.push(item)
    document.querySelector("#item").value = ""
    showItemsList()
}

document.querySelector("#item").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem()
    }
})

function showItemsList() {
    const sectionList = document.querySelector(".list")
    sectionList.textContent = "" // Limpa antes de renderizar

    items.sort((a, b) => Number(a.checked) - Number(b.checked)) // Desmarcados primeiro

    items.forEach((item) => {
        const div = document.createElement("div")
        div.className = "item"

        div.innerHTML = `
            <div>
                <input type="checkbox" id="item-${item.id}" ${item.checked ? "checked" : ""} onclick="checkItem(${item.id})">

                <label for="item-${item.id}">${item.name}</label>
            </div>

            <button onclick="removeItem(${item.id})">
                <img src="./assets/trash-icon.svg" alt="trash icon">
            </button>
        `

        sectionList.appendChild(div)
    })

    localStorage.setItem("items", JSON.stringify(items))
}

function removeItem(itemId) {
    const itemIndex = items.findIndex(item => item.id === itemId)
    const divWarning = document.querySelector(".warning")

    if (itemIndex !== -1) {
        items.splice(itemIndex, 1)
    }

    divWarning.classList.remove("hide-warning")

    setTimeout(() => {
        divWarning.classList.add("hide-warning")
    }, 4000)

    showItemsList()
}

function addHideWarningClass() {
    document.querySelector(".warning").classList.add("hide-warning")
}

function checkItem(itemId) {
    const item = items.find(item => item.id === itemId)
    if (item) {
        item.checked = !item.checked
        showItemsList()
    }
}

function verifyLocalStorageItems() {
    const localStorageItems = localStorage.getItem("items")

    if (localStorageItems) {
        items = JSON.parse(localStorageItems)
        showItemsList()
    }
}
