const API_BASE = "https://crudcrud.com/api/def6234311e34c23a319520381eaa46f/clientes";

// Seletores
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaClientes = document.getElementById("listaClientes");

// Carregar clientes ao abrir a página
window.onload = listarClientes;

// --- Cadastrar Cliente ---
btnCadastrar.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoCliente = { nome, email };

  try {
    const resposta = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar cliente!");
    }

    nomeInput.value = "";
    emailInput.value = "";

    listarClientes();
  } catch (erro) {
    console.error(erro);
  }
});

// --- Listar Clientes ---
async function listarClientes() {
  listaClientes.innerHTML = "";

  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${cliente.nome}</strong> — ${cliente.email}
        <button class="btnExcluir" data-id="${cliente._id}">Excluir</button>
      `;
      listaClientes.appendChild(li);
    });

    adicionarEventosExcluir();
  } catch (erro) {
    console.error("Erro ao listar clientes:", erro);
  }
}

// --- Excluir Cliente ---
function adicionarEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".btnExcluir");

  botoesExcluir.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");

      try {
        const resposta = await fetch(`${API_BASE}/${id}`, {
          method: "DELETE",
        });

        if (!resposta.ok) {
          throw new Error("Erro ao excluir!");
        }

        listarClientes();
      } catch (erro) {
        console.error(erro);
      }
    });
  });
}
