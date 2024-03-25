document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obter os valores dos campos
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        // Verificar se os campos estão preenchidos
        if (email && password && confirmPassword) {
            // Verificar se as senhas coincidem
            if (password !== confirmPassword) {
                Toastify({
                    text: 'As senhas não coincidem.',
                    backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                    duration: 3000
                }).showToast();
                return;
            }

            // Criar um objeto com os dados do usuário
            const userData = {
                email: email,
                password: password
            };

            // Converter o objeto para uma string JSON
            const userDataJSON = JSON.stringify(userData);

            // Armazenar os dados do usuário no localStorage
            try {
                localStorage.setItem('userData', userDataJSON);
                Toastify({
                    text: 'Registro concluído com sucesso! Acesse o login clicando na Logo "NexBank"',
                    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                    duration: 5000, // Aumentei a duração para 5 segundos
                }).showToast();

                window.location.href = '../../../index.html';

            } catch (error) {
                console.error('Erro ao salvar os dados no localStorage:', error);
                Toastify({
                    text: 'Erro ao salvar os dados do usuário. Por favor, tente novamente mais tarde.',
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
