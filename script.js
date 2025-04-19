document.addEventListener('DOMContentLoaded', () => {
  // 🔥 Configuração do Firebase
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "aceleratec-41568.firebaseapp.com",
    projectId: "aceleratec-41568",
    storageBucket: "aceleratec-41568.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

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
      await firestore.collection('projetos').add({
        nomeEquipe,
        turmaEquipe,
        integrantes,
        professorAuxiliar,
        nomeProjeto,
        descricaoProjeto,
        linkCanva,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp() // Alterado para 'dataCriacao'
      });

      // Mostrar modal de sucesso
      mostrarModal();
      form.reset();

    } catch (error) {
      console.error("❌ Erro ao enviar projeto:", error);
      alert("Erro ao enviar projeto. Veja o console para mais detalhes.");
    }
  });

  // Função para mostrar o modal
  function mostrarModal() {
    document.getElementById('modalSucesso').classList.remove('hidden');
  }

  // Função para fechar o modal
  function fecharModal() {
    document.getElementById('modalSucesso').classList.add('hidden');
  }

  // Função para obter os projetos do Firestore
  function obterProjetos() {
    firestore.collection('projetos').orderBy('dataCriacao', 'desc').get() 
      .then(snapshot => {
        const projetosContainer = document.getElementById('projetosContainer');
        projetosContainer.innerHTML = ''; // Limpa o conteúdo antes de exibir os novos projetos

        snapshot.forEach(doc => {
          const projeto = doc.data();
          console.log("Projeto:", projeto);  // Log para verificar o conteúdo do projeto
          const projetoElemento = document.createElement('div');
          projetoElemento.classList.add('projeto');
          projetoElemento.innerHTML = `
            <h3>${projeto.nomeProjeto}</h3>
            <p><strong>Equipe:</strong> ${projeto.nomeEquipe}</p>
            <p><strong>Turma:</strong> ${projeto.turmaEquipe}</p>
            <p><strong>Integrantes:</strong> ${(Array.isArray(projeto.integrantes) ? projeto.integrantes.join(', ') : 'Nenhum integrante informado')}</p>
            <p><strong>Descrição:</strong> ${projeto.descricaoProjeto}</p>
            <p><strong>Link do Canva:</strong> <a href="${projeto.linkCanva}" target="_blank">Visualizar</a></p>
            <p><strong>Inscrito em:</strong> ${projeto.dataCriacao ? new Date(projeto.dataCriacao.seconds * 1000).toLocaleDateString() : 'Data não disponível'}</p>
          `;
          projetosContainer.appendChild(projetoElemento);
        });
      }).catch(error => {
        console.error("Erro ao obter projetos:", error);
      });
  }
});
