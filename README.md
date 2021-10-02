# Aplicativo SPA Laravel React para Pacientes

Este é um aplicativo básico com duas telas, sendo uma com uma listagem de pacientes com base em um documento chamado "lista_pacientes.xlsx" que está disponível no diretório "challenge" e uma página onde serão exibidos todos os dados do paciente selecionado, construída usando Laravel e React.

## Instalação

### Clonando e instalando dependências

Clone o repositório

    git clone https://github.com/Breno098/challenger-june2021.git

Navegue até a pasta do projeto:

    cd .\challenger-june2021\project\

Faça a instalação das dependencias PHP com o comando:

    composer install

E para as dependencias JavaScript, utilize

    npm install

### Comandos para execução e construção

Copie o arquivo env de exemplo e faça as alterações de configuração necessárias no arquivo .env

    cp .env.example .env

Gerar uma nova chave de aplicativo

    php artisan key:generate

Execute as migrações do banco de dados (defina a conexão do banco de dados em .env antes de migrar)

    php artisan migrate

Inicie o servidor de desenvolvimento local

    php artisan serve

Construa e execute o projeto com o comando:

    npm run watch 
    // OU
    npm run dev

Agora você pode acessar o servidor em http: // localhost: 8000

## Populando banco de dados

Preencha os dados para tabela de pacientes. Execute o comando:

    php artisan db:seed

## Visão geral do código

### Dependências

- [Redux](https://redux.js.org/) - Com o Redux, há um estado geral na loja e cada componente tem acesso ao estado. Isso elimina a necessidade de passar continuamente o estado de um componente para outro. Ao usar o Redux com React, os estados não precisarão mais ser levantados, portanto, fica mais fácil rastrear qual ação causa qualquer alteração.
- [React Redux](https://react-redux.js.org/) - O React Redux é mantido pela equipe do Redux e atualizado com as APIs mais recentes do Redux e do React .
- [Moment.js](https://momentjs.com/) - Moment.js facilita o desenvolvimento e a manipulação de datas.
- [BootStrap](https://getbootstrap.com/) - O BOotStrap oferece diversos templates, componentes e estilizações css de forma rápida e prática. Por ser um dos framework css mais populares no mundo, a manutenção e suporte são de fácil acesso.
    
### Pastas

- `project/app` - Contém todos os modelos Eloquent
- `app` - Contains all the Eloquent models
- `project/app/Http/Controllers` - Contém todos os controladores da aplicação
- `project/app/Models` - Contém todos os modelos/entidades da aplicação
- `project/config` - Contém todos os arquivos de configuração do aplicativo
- `project/database/migrations` - Contém todas as migrações de banco de dados
- `project/database/seeds` - Contém o semeador de banco de dados
- `project/routes/view` - Contém todas as views da aplicação
- `project/routes/js/components` - Contém componentes React
- `project/routes/js/pages` - Contém páginas construídas com React
- `project/routes/js/reducers` - Contém todos os reducers utilizados
- `project/routes/js/routes` - Contém todos as rotas do SPA
- `project/routes/js/store` - Contém arquivo de store
- `project/routes` - Contém todas as rotas api definidas no arquivo api.php

### Variáveis de ambiente

- `project/.env` - As variáveis ​​de ambiente podem ser definidas neste arquivo

### API para uso local e testes

Execute o servidor de desenvolvimento laravel:

    php artisan serve

A API agora pode ser acessada em:

    http://localhost:8000/api