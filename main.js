let items = []

function addItem() {
    const itemName = document.querySelector("#item").value

    if (itemName === "") {
        alert("Digite um item para adicionar")
        return
    }


    const item = {
        name: itemName,
        checked: false
    }
} 