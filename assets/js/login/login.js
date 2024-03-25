document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar o envio do formulário

        // Obter os valores dos campos de email e senha
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Verificar se os campos estão preenchidos
        if (email && password) {
            // Obter os dados do usuário armazenados no localStorage
            const userDataJSON = localStorage.getItem('userData');

            if (userDataJSON) {
                // Converter a string JSON para um objeto JavaScript
                const userData = JSON.parse(userDataJSON);

                // Verificar se o email e a senha coincidem com os dados armazenados
                if (email === userData.email && password === userData.password) {
                    // Redirecionar o usuário para a página desejada
                    Toastify({
                        text: 'Login bem-sucedido!',
                        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                        duration: 3000,
                    }).showToast();

                    window.location.href = '/pages/calc.html';

                } else {
                    Toastify({
                        text: 'Email ou senha incorretos.',
                        backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                        duration: 3000
                    }).showToast();
                }
            } else {
                Toastify({
                    text: 'Nenhum usuário registrado.',
                    backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                    duration: 3000
                }).showToast();
            }
        } else {
            Toastify({
                text: 'Por favor, preencha todos os campos.',
                backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                duration: 3000
            }).showToast();
        }
    });
});
