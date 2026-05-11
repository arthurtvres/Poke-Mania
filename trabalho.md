Atividade Final - Integração Front React + Back Java + BD
Data de conclusão 29 de maio de 2026 às 23:59
Instruções
Nesta atividade final, vocês deverão ampliar o projeto desenvolvido na "Atividade 06 – React, TypeScript e Bootstrap", transformando-o em uma aplicação web completa, com front-end em React com TypeScript integrado a um back-end em Java, utilizando banco de dados relacional (PostgreSQL).
O principal foco da avaliação será o back-end, incluindo a organização da aplicação Java, a comunicação com o banco de dados, a implementação das operações de CRUD, a configuração de CORS e a integração funcional com o front-end.
Vocês poderão reaproveitar o front-end desenvolvido na Atividade 06, desde que ele seja adaptado para consumir dados reais vindos do back-end.
O tema deverá seguir a proposta da Atividade 06, mantendo um domínio próprio, como:

Sistema de biblioteca, controle de estoque, clínica veterinária, catálogo de filmes, animes, tarefas, produtos, clientes, entre outros.



Não serão aceitos trabalhos com temas idênticos na mesma turma.



Os nomes das classes, tabelas, interfaces, variáveis e componentes devem refletir o domínio escolhido.
Exemplo: Produto, Cliente, Filme, Livro, Tarefa, Animal.

Requisitos do Front-end
O front-end deverá ser desenvolvido com React + Vite + TypeScript, utilizando Bootstrap.

Deve conter:

Componentização da interface;
Organização em pastas;
Uso de interfaces TypeScript;
Tela de listagem;
Formulário de cadastro;
Funcionalidade de edição;
Funcionalidade de exclusão;
Dashboard ou área com contadores/resumos;
Layout responsivo;
Integração real com o back-end;
Rodapé com nome dos integrantes, data e disciplina.
O front-end não deve funcionar apenas com arrays fixos. Os dados principais devem vir do back-end.



Requisitos do Back-end
O back-end deverá ser desenvolvido em Java, usando uma das opções:

Opção A: JSP/Servlets + Hibernate
Opção B: JSP/Servlets + JDBC/ConnectionFactory

O back-end deverá possuir:

Classe de modelo/entidade;
Camada de acesso a dados;
Operações de CRUD;
Integração com banco de dados;
Retorno de dados para o front-end;
Tratamento básico de erros;
Organização adequada de pacotes/classes;
Configuração de CORS.
Banco de Dados
A aplicação deverá utilizar banco relacional, preferencialmente o PostgreSQL;

O banco deverá conter pelo menos uma tabela principal relacionada ao tema escolhido.

A tabela deverá possuir:

Campo id;
Pelo menos 3 atributos relevantes;
Tipos de dados adequados;
Chave primária;
Dados persistidos corretamente.
Operações Obrigatórias
A aplicação deverá permitir:

Cadastrar um novo registro;
Listar registros;
Carregar um registro para edição;
Atualizar um registro;
Excluir um registro;
Atualizar a interface após cada operação.
Exemplo: em um sistema de filmes, deve ser possível cadastrar, listar, editar, marcar status e excluir filmes.

Integração Front-end + Back-end
O React deverá se comunicar com o Java usando fetch ou axios.

Exemplo:

fetch("http://localhost:8080/seu-projeto/filmes")
ou:

axios.get("http://localhost:8080/seu-projeto/filmes")
A aplicação deverá demonstrar que os dados exibidos no React vêm do banco de dados por meio do back-end Java.



CORS
O back-end deverá ter configuração de CORS para permitir a comunicação com o front-end React.

O aluno deverá explicar no vídeo por que o CORS foi necessário e como foi configurado.



GitHub
A entrega será feita exclusivamente por link do GitHub.

O repositório deverá conter:

Código do front-end;
Código do back-end;
Script SQL ou instruções para criar o banco;
Arquivo README.md;
Arquivo .gitignore;
Histórico de commits.
Não devem ser enviados:

node_modules;
Arquivos .env com senhas reais;
Pastas de build desnecessárias;
Arquivos temporários da IDE.
README Obrigatório
O README.md deverá conter:

Nome dos integrantes;
Tema escolhido;
Descrição da aplicação;
Tecnologias utilizadas;
Como criar o banco de dados;
Como rodar o back-end;
Como rodar o front-end;
Explicação breve da arquitetura;
Prints da aplicação funcionando;
Link do vídeo explicativo.
Vídeo Explicativo
O grupo deverá gravar um vídeo de aproximadamente 3 a 5 minutos, explicando:

Tema da aplicação;
Como o front-end foi adaptado;
Como o back-end foi organizado;
Como o banco foi criado;
Como o CRUD funciona;
Como o React se comunica com o Java;
Como o CORS foi configurado;
Demonstração da aplicação funcionando.
Projetos sem vídeo ou sem link do GitHub sofrerão penalização de 50% na nota final.

Critérios de Avaliação
Back-end Java - 40%
Organização, uso de Hibernate ou ConnectionFactory/DAO, CRUD, conexão com banco, tratamento básico de erros e funcionamento da persistência.

Banco de Dados - 20%
Tabela correta, chave primária, atributos coerentes, tipos adequados, dados persistidos e script/instruções no README.

Integração Front-end + Back-end - 20%
Consumo dos dados no React, cadastro, listagem, edição, exclusão, atualização da tela e CORS.

Front-end React + TypeScript - 10%
Componentização, TypeScript, interfaces, Bootstrap, responsividade e clareza visual.

GitHub, README e Vídeo - 10%
Organização do repositório, commits, .gitignore, README completo e vídeo explicativo.



Entrega
A entrega deverá conter:

Link do repositório no GitHub;
Link do vídeo explicativo;
Nome completo dos integrantes;
Tema escolhido;
Breve descrição do que foi implementado;
Demonstração do back-end utilizando Postman;
Documentação ou demonstração dos endpoints utilizando Swagger, quando implementado.
O trabalho poderá ser feito individualmente ou em grupos de até 3 pessoas.

A entrega deve ser realizada dentro do prazo definido no Teams.