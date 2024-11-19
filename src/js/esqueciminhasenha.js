document.getElementById('formAlterarSenha').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirma_senha = document.getElementById('confirma_senha').value;

    if(senha !== confirma_senha) {
        alert("As senhas não coincidem.")
        return
    }

    fetch('/usuarios/alterar-senha', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Senha alterada com sucesso!");
            window.location.href = '/src/pages/forms/login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao alterar a senha:', error);
        alert('Erro ao alterar a senha. Tente novamente.');
    });
});