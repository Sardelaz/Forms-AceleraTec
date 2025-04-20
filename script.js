// script.js
import { db, serverTimestamp } from './firestorage.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('projetoForm');
  const modalSucesso = document.getElementById('modalSucesso');

  // Função para mostrar o modal de sucesso
  function mostrarModal() {
    if (modalSucesso) {
      modalSucesso.style.display = "block";
    } else {
      console.error("Elemento modalSucesso não encontrado no DOM.");
    }
  }

  // Função para fechar o modal
  window.fecharModal = function() {
    if (modalSucesso) {
      modalSucesso.style.display = "none";
    } else {
      console.error("Elemento modalSucesso não encontrado no DOM.");
    }
  }

  // Fechar o modal se o usuário clicar fora dele
  window.onclick = function(event) {
    if (modalSucesso && event.target == modalSucesso) {
      modalSucesso.style.display = "none";
    }
  }

  // Envio de dados do formulário para o Firestore
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeEquipe = document.getElementById('nomeEquipe')?.value;
    const turmaEquipe = document.getElementById('curso')?.value;
    const integrantesInputs = document.querySelectorAll('.integrante-input');
    const integrantes = Array.from(integrantesInputs)
      .map(input => input.value.trim())
      .filter(value => value !== "");
    const professorAuxiliar = document.getElementById('professorAuxiliar')?.value;
    const nomeProjeto = document.getElementById('nomeProjeto')?.value;
    const descricaoProjeto = document.getElementById('descricaoProjeto')?.value;
    const linkCanva = document.getElementById('linkCanva')?.value;

    // Validação do link do Canva
    if (linkCanva && !linkCanva.startsWith('http')) {
      alert("Por favor, insira um link válido do Canva.");
      return;
    }

    try {
      const dataToSend = {
        nomeEquipe: nomeEquipe,
        turmaEquipe: turmaEquipe,
        integrantes: integrantes,
        professorAuxiliar: professorAuxiliar,
        nomeProjeto: nomeProjeto,
        descricaoProjeto: descricaoProjeto,
        linkCanva: linkCanva || null,
        dataCriacao: serverTimestamp()
      };

      console.log("Dados a serem enviados:", dataToSend); // Adicionado log para verificar os dados

      await addDoc(collection(db, 'projetos'), dataToSend);

      mostrarModal();
      form.reset();

    } catch (error) {
      console.error("❌ Erro ao enviar projeto:", error);
      alert("Erro ao enviar projeto. Veja o console para mais detalhes.");
    }
  });
});