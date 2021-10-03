# Aplicativo para rastreio de Url's

Este é um aplicativo contruido com React para cadastro e rastreamento de Url's. 

## Instalação

### Clonando e instalando dependências

Clone o repositório

    git clone https://github.com/Breno098/cred-pago-urls.git

Navegue até a pasta do projeto:

    cd .\cred-pago-urls

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
- [BootStrap](https://getbootstrap.com/) - O BootStrap oferece diversos templates, componentes e estilizações css de forma rápida e prática. Por ser um dos framework css mais populares no mundo, a manutenção e suporte são de fácil acesso.
- [Sweetalert2](https://sweetalert2.github.io/) - SweetAlert disponibiliza caixas pop-up's responsivais e personalizaveis.
    
### Pastas

- `app/Http/Controllers` - Contém controladores
- `app/Http/Controllers/Auth` - Contém controladores de autenticação
- `app/Console/Commands` - Contém comandos artisans
- `app/Models` - Contém modelos/entidades
- `app/Services` - Contém serviços
- `config` - Contém arquivos de configuração
- `database/migrations` - Contém migrações de banco de dados
- `database/seeds` - Contém o semeador de banco de dados
- `routes/view` - Contém paginas web construidas com html e blade
- `routes/js/components` - Contém componentes React
- `routes/js/pages` - Contém páginas construídas com React
- `routes/js/reducers` - Contém reducers utilizados
- `routes/js/routes` - Contém todos as rotas do SPA
- `routes/js/store` - Contém arquivo de store
- `routes` - Contém rotas definidas no arquivo web.php

### Variáveis de ambiente

- `.env` - As variáveis ​​de ambiente podem ser definidas neste arquivo

### API para uso local e testes

Execute o servidor de desenvolvimento laravel:

    php artisan serve

A API agora pode ser acessada em:

    http://localhost:8000/api

### Crons

Execute as tarefas agendadas através do comando: 

    php artisan schedule:work