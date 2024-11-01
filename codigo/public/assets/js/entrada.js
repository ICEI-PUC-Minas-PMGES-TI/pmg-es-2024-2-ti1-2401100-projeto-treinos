function saveUserInfo() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const userInfo = {
    username: username,
    password: password
  };

  const userInfoJSON = JSON.stringify(userInfo);

  console.log(userInfoJSON);

  localStorage.setItem('userInfo', userInfoJSON);
  alert('Informações salvas com sucesso!');
}

function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo.username === username && userInfo.password === password) {
      alert('Login bem-sucedido!');
      
      window.location.href = 'untitled-1.html'; 
    } else {
      alert('Nome de usuário ou senha incorretos.');
    }
  } else {
    alert('Nenhum usuário registrado encontrado.');
  }
}