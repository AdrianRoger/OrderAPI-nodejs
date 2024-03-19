const appContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicação</title>
</head>
<body>
    <h1>Autenticado!</h1>
    <p>Seja bem-vindo à aplicação <span id="username"></span>!</p>
    <input type="button" id="exit" value="Sair" />
</body>
<script>
    document.addEventListener("DOMContentLoaded", async function(){
        const response = await fetch('/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if(data.error){
            alert(data.error);
            document.cookie = "";
            window.location.href = '/'
        } else{
            document.getElementById('username').innerText = data.name;
        }
        const exitButton = document.querySelector('#exit');
        exitButton.onclick = async function(){
            const response = await fetch('/api/login/exit', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const resp = await response.json();
            alert(resp.message);
            window.location.href = '/';
        }
    });
</script>
</html>
`;

function appPage(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(appContent);
}

module.exports = appPage;