function saveUserInfo() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const userInfo = {
    username: username,
    password: password
  };

  const userInfoJSON = JSON.stringify(userInfo);

  console.log('Saving user info:', userInfoJSON);

  localStorage.setItem('userInfo', userInfoJSON);
  alert('Informações salvas com sucesso!');
  
  window.location.href = 'home.html'; 
}

function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo.username === username && userInfo.password === password) {
      alert('Bem-vindo vamos começar os treinos?');
      
      window.location.href = 'home.html'; 
    } else {
      alert('Nome de usuário ou senha incorretos.');
    }
  } else {
    alert('Nenhum usuário registrado encontrado.');
  }
}