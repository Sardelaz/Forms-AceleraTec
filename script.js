document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('projetoForm');

  // Envio de dados do formulário para o Firestore
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeEquipe = document.getElementById('nomeEquipe').value;
    const turmaEquipe = document.getElementById('curso').value;
    const integrantes = Array.from(document.querySelectorAll('.integrante-input'))
      .map(input => input.value)
      .filter(value => value.trim() !== "");
    const professorAuxiliar = document.getElementById('professorAuxiliar').value;
    const nomeProjeto = document.getElementById('nomeProjeto').value;
    const descricaoProjeto = document.getElementById('descricaoProjeto').value;
    const linkCanva = document.getElementById('linkCanva').value;

    // Validação do link do Canva
    if (!linkCanva.startsWith('http')) {
      alert("Por favor, insira um link válido do Canva.");
      return;
    }

    try {
      // Envio dos dados para o Firestore
      await firebase.firestore().collection('projetos').add({
        nomeEquipe,
        turmaEquipe,
        integrantes,
        professorAuxiliar,
        nomeProjeto,
        descricaoProjeto,
        linkCanva,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
      });

      mostrarModal();
      form.reset();

    } catch (error) {
      console.error("❌ Erro ao enviar projeto:", error);
      alert("Erro ao enviar projeto. Veja o console para mais detalhes.");
    }
  });

  function mostrarModal() {
    document.getElementById('modalSucesso').classList.remove('hidden');
  }

  window.fecharModal = function() {
    document.getElementById('modalSucesso').classList.add('hidden');
  }

  function obterProjetos() {
    if (window.firestore) {
      window.firestore.collection('projetos').orderBy('dataCriacao', 'desc').get()
        .then(snapshot => {
          const projetosContainer = document.getElementById('projetosContainer');
          if (projetosContainer) {
            projetosContainer.innerHTML = '';
  
            snapshot.forEach(doc => {
              const projeto = doc.data();
              const projetoElemento = document.createElement('div');
              projetoElemento.classList.add('projeto');
              projetoElemento.innerHTML = `
                <h3>${projeto.nomeProjeto}</h3>
                <p><strong>Equipe:</strong> ${projeto.nomeEquipe}</p>
                <p><strong>Turma:</strong> ${projeto.turmaEquipe}</p>
                <p><strong>Integrantes:</strong> ${Array.isArray(projeto.integrantes) ? projeto.integrantes.join(', ') : 'Nenhum integrante informado'}</p>
                <p><strong>Descrição:</strong> ${projeto.descricaoProjeto}</p>
                <p><strong>Link do Canva:</strong> <a href="${projeto.linkCanva}" target="_blank">Visualizar</a></p>
                <p><strong>Inscrito em:</strong> ${projeto.dataCriacao ? new Date(projeto.dataCriacao.seconds * 1000).toLocaleDateString() : 'Data não disponível'}</p>
              `;
              projetosContainer.appendChild(projetoElemento);
            });
          }
        })
        .catch(error => {
          console.error("Erro ao obter projetos:", error);
        });
    } else {
      console.error("Firestore não foi inicializado corretamente.");
    }
  }
  obterProjetos();
});
