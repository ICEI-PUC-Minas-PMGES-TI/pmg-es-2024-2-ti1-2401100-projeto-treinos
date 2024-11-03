document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="personal"]').forEach((elem) => {
        elem.addEventListener("change", function(event) {
            const uploadContainer = document.getElementById('upload-container');
            if (event.target.value === "sim") {
                uploadContainer.style.display = "block";
                document.getElementById('verification-file').required = true;
            } else {
                uploadContainer.style.display = "none";
                document.getElementById('verification-file').required = false;
            }
        });
    });

    const form = document.getElementById('cadastro-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const personal = document.querySelector('input[name="personal"]:checked').value;
        const verificationFile = document.getElementById('verification-file').files[0];

        if (!username || !email || !password || !personal || (personal === "sim" && !verificationFile)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const userInfo = {
            username: username,
            email: email,
            password: password,
            personal: personal,
            verificationFile: verificationFile ? verificationFile.name : null
        };

        const userInfoJSON = JSON.stringify(userInfo);

        console.log('Saving user info:', userInfoJSON);

        localStorage.setItem('userInfo', userInfoJSON);
        alert('Cadastro realizado com sucesso!');

        window.location.href = 'index.html';
    });
});
