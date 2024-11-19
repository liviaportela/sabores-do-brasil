document.addEventListener('DOMContentLoaded', function () {
    fetch('/usuario')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Usuário não autenticado');
            }
        })
        .then(data => {
            const usuarioId = data.id;

            const userSection = document.querySelector('.informacoes-conta');
            userSection.innerHTML = `
                <div class="vertical">
                    <p>Nome: ${data.nome}</p>
                    <p>E-mail: ${data.email}</p>
                </div>
                <div class="vertical">
                    <button id="atualizar" onclick="location.href='forms/esqueceuasenha.html'">Atualizar</button>
                    <button id="excluir">Excluir</button>
                </div>
            `;

            fetch(`/receitas/receitas-usuario/${usuarioId}`)
                .then(response => response.json())
                .then(receitas => {
                    const receitasContainer = document.querySelector('.lista-receitas');
                    receitasContainer.innerHTML = '';

                    if (receitas.length > 0) {
                        receitas.forEach(receita => {
                            receitasContainer.innerHTML += `
                                <a class="receita" href="../pages/receita.html" onclick="saveReceitaId(${receita.id})">
                                    <img src="${receita.imagem ? '/uploads/' + receita.imagem : 'https://via.placeholder.com/150'}" 
                                         class="imagemReceita" 
                                         alt="${receita.titulo || 'Imagem da Receita'}">
                                    <span>${receita.titulo || 'Receita Sem Nome'}</span>
                                </a>
                            `;
                        });
                    } else {
                        receitasContainer.innerHTML = '<p>Nenhuma receita encontrada.</p>';
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar receitas:', error);
                    const receitasContainer = document.querySelector('.lista-receitas');
                    receitasContainer.innerHTML = '<p>Erro ao carregar receitas.</p>';
                });

            const deletarUsuarioBtn = document.getElementById('excluir');
            deletarUsuarioBtn.addEventListener('click', function () {
                if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
                    fetch(`/usuarios/${usuarioId}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (response.ok) {
                                alert('Conta excluída com sucesso.');
                                window.location.href = '/';
                            } else {
                                throw new Error('Erro ao deletar o usuário');
                            }
                        })
                        .catch(error => {
                            console.error('Erro:', error);
                            alert('Erro ao deletar o usuário.');
                        });
                }
            });
        })
        .catch(error => {
            console.log(error);
            window.location.href = 'forms/login.html';
        });
});

function saveReceitaId(id) {
    localStorage.setItem('receitaId', id);
}