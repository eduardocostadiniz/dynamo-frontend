
# Dynamo FrontEnd Manager

Apenas um gerenciador de dados e tabelas para imagens docker do DynamoDB.

##### Motivação
Ao trabalhar com o DynamoDB local utilizando imagens do docker, as vezes você precisa criar algumas tabelas, inserir, atualizar ou apagar registros manualmente, utilizando alguma ferramenta de linha de comando (no meu caso era o boto3 - python) para fazer essas operações. Juntando isso mais a vontade de aprender novas features do ReactJS, iniciei esse projeto, que tem como objetivo ser um front-end para gerenciar tabelas e dados do DynamoDB na imagem docker local.

##### Configuração
Por se tratar de uma ferramenta web (que roda no navegador) iremos precisar do NodeJS (versão que utilizei v12.18.3) e também do Yarn (versão que utilizei 1.22.15) para executar os scripts do projeto.

O projeto precisa de algumas variáveis locais para se conectar à imagem do DynamoDB (a imagem precisa estar iniciada), são elas:
- **REACT_APP_AWS_DYNAMO_DB_URL:** URL de conexão Dynamo
- **REACT_APP_AWS_ACCESS_KEY_ID:** Chave ID
- **REACT_APP_AWS_SECRET_ACCESS_KEY:** Chave SECRET
- **REACT_APP_AWS_REGION:** Região da AWS 

> Obs.: Você precisa fornecer essa informações, pois a funcionalidade utiliza elas para fazer uma conexão entre a aplicação e o Dynamo. Essas informações podem ser fictícias, pois o objetivo e tratar em ambiente local.

Crie um arquivo ```.env``` na raiz do projeto, para que o script de start consiga carregá-las para o projeto.
Edite o ```.env``` com as informações (exemplo) abaixo:
```properties
REACT_APP_AWS_DYNAMO_DB_URL="http://0.0.0.0:8000"
REACT_APP_AWS_ACCESS_KEY_ID="fake_key_id"
REACT_APP_AWS_SECRET_ACCESS_KEY="fake_secret_key"
REACT_APP_AWS_REGION="us-east-1"
```

>Obs.: Algumas imagens do Dynamo podem trabalhar por padrão com dados apenas leitura ou até mesmo com o compartilhamento de tabelas. Isso pode modificar a forma de gerenciar os dados e/ou visualizar as tabelas.

Instale as dependências:
```sh
yarn
```
Execute o projeto:
```sh
yarn start
```

##### Possíveis problemas de CORS
Durante a comunicação da aplicação com o Dynamo, você pode ter alguns problemas de CORS (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS) devido o aws-sdk rodar na porta 3000 (padrão) e o Dynamo na porta 8000 (padrão). Se você encontrar algum problema desse tipo, há duas soluções possíveis: 
1 - Instalar algum plugin no seu navegador, para que ele consiga burlar esse processo de segurança local.
2 - Modificar a imagem docker do DynamoDB, para habilitar o CORS (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.UsageNotes.html).

Enquanto utilizava o sistema, apenas erros eram classificados como problemas de CORS e as operações que dão sucesso são feitas corretamente. :-/
Instalei um plugin no navegador e tudo funcionou corretamente.

Espero que essa ferramenta ajude! 