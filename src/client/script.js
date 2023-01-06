const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");

if (document.cookie.includes("session_token=")) {
    loginSection.style.display = "none";
    homeSection.style.display = "block";
}

async function callApi(api, method, data) {
    const result = await fetch("/api" + api, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!result.ok) {
        throw new Error();
    }

    return result.json();
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const errorHandler = document.getElementById("loginFormError");

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    errorHandler.textContent = "";
    callApi("/user/login", "POST", { username, password }).then((data) => {
        loginSection.style.display = "none";
        homeSection.style.display = "block";
    }).catch((e) => {
        errorHandler.textContent = "Error logging in!";
    });
});

document.getElementById("createItemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const errorHandler = document.getElementById("createItemFormError");

    const title = document.getElementById("newItemTitle").value;

    errorHandler.textContent = "";
    callApi("/item", "POST", { title }).then(() => {

    }).catch((e) => {
        errorHandler.textContent = "Error Creating Item!";
    });
});