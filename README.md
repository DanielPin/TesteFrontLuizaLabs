<h3>Projeto criado para o teste de front-end da luizaLabs</h3>

##
Pré-requisitos
  - Docker

##  
<b>Passos para executar o projeto:</b>

Acessar a pasta raiz do projeto via terminal;

Executar o comando abaixo:

   Terminal Linux
   
    cp .env.example .env
    
   Terminal windows(cmd)
   
    copy .env.example .env
      
O comando irá criar uma copia do .env.example com o nome de .env
dentro você deve colocar suas chaves de acesso a API da Marvel

Após, execute o comando abaixo:

    docker-compose up

URL da aplicação

    http://localhost:3000/
