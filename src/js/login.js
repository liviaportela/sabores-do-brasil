function logar() {
    const nome = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    
    if (!nome || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));
    
    if (usuarioCadastrado && usuarioCadastrado.nome === nome && usuarioCadastrado.senha === senha) {
        alert("Login realizado com sucesso!");
        window.location.href = "/"; 
    } else {
        alert("Nome ou senha incorretos. Tente novamente.");
    }
}