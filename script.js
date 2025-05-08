function gerarSenha() {
    const letrasMaiusculas = document.getElementById("maiusculas").checked;
    const letrasMinusculas = document.getElementById("minusculas").checked;
    const numeros = document.getElementById("numeros").checked;
    const simbolos = document.getElementById("simbolos").checked;
  
    let caracteres = "";
    if (letrasMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (letrasMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
    if (numeros) caracteres += "0123456789";
    if (simbolos) caracteres += "!@#$%^&*()_+{}[]<>?";
  
    if (caracteres === "") {
      alert("Selecione ao menos um tipo de caractere!");
      return;
    }
  
    const tamanho = parseInt(document.getElementById("tamanho").value);
    let senha = "";
  
    for (let i = 0; i < tamanho; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[randomIndex];
    }
  
    const inputSenha = document.getElementById("senha");
    inputSenha.value = senha;
    inputSenha.classList.add("animated");
  
    setTimeout(() => {
      inputSenha.classList.remove("animated");
    }, 300);
  
    verificarForca(senha);
  }
  
  function verificarForca(senha) {
    let forca = 0;
  
    if (senha.length >= 8) forca++;
    if (/[a-z]/.test(senha)) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/[0-9]/.test(senha)) forca++;
    if (/[^a-zA-Z0-9]/.test(senha)) forca++;
  
    let nivel = "";
    let classe = "";
  
    if (forca <= 2) {
      nivel = "Fraca";
      classe = "fraca";
    } else if (forca === 3 || forca === 4) {
      nivel = "Média";
      classe = "media";
    } else {
      nivel = "Forte";
      classe = "forte";
    }
  
    // Atualiza a barra de força
    const barra = document.getElementById("nivelBarra");
    barra.className = "barra " + classe;
    barra.style.width = `${(forca / 5) * 100}%`;
  
    // Atualiza o texto
    const nivelSpan = document.getElementById("nivelTexto");
    nivelSpan.textContent = nivel;
    nivelSpan.className = classe;
  }
  
  function copiarSenha() {
    const input = document.getElementById("senha");
    input.select();
    input.setSelectionRange(0, 99999); // Para dispositivos móveis
    navigator.clipboard.writeText(input.value).then(() => {
      alert("Senha copiada com sucesso!");
    }).catch(() => {
      alert("Erro ao copiar a senha.");
    });
  }