# Luc's Inventory APP

Bem vindo a o Luc's Inventory APP, aqui você vai encontrar uma simples aplicação de gerenciamento de inventário.

## 📚 Especificações das aplicações

1. **Back-End** 
    - Nestjs
    - Sequelize
2. **Front-End**
    - Angular
3. **Banco de Dados**
    - MySQL

## 🖥️ Iniciar o Projeto com Docker
Para iniciar o projeto usando Docker, siga as instruções abaixo:

### Pré-requisitos
Certifique-se de que você tenha o Docker e o Docker Compose instalados em sua máquina.

### Passos para Iniciar o Projeto
1. **Clone o projeto e certifique-se que está no diretório correto.**

    Abra o terminal e vá para o diretório onde o projeto foi clonado.

2. **Iniciar os Contêineres**

    Execute o comando a seguir para construir e iniciar os contêineres definidos no docker-compose.yml:

    ```bash
    docker-compose up --build
    ```

    > ⚠️ Certifique-se que não há outras aplicações rodando nas portas **4200**, **3000** e **3306**. Se tiver você pode alterar as portas no docker-compose.yml 

3. **Verificar se os contêineres foram iniciados.**
    
    Após a execução do comando, o Docker Compose começará a construir e iniciar os contêineres. Você pode verificar se os contêineres estão em execução com o comando:
    ```bash
    docker-compose ps
    ```
4. **Acessar a Aplicação**

    Com os passos anteriores concluídos, a aplicação já está rodando. Por padrão para acessar as aplicações em execução você pode utilizar esses endereços:

    1. **Back-End**
        
        Se você gostaria de consumir diretamente a aplicação **back-end**, você pode utilizar o endereço:
        ```bash
        http://localhost:3000
        ```
    2. **Front-End**
        
        Já se você quiser acessar a aplicação front-end, você pode acessá-la através do endereço:
        ```bash
        http://localhost:4200
        ```


## 📦 Funcionalidades

### Produto:

- **Descrição:** Gerencia produtos com apenas um dado obrigatório: o nome do produto.
- **Funcionalidades:**
    - Cadastro de novos produtos
    - Edição de produtos existentes
    - Exclusão de produtos
    - Visualização de todos os produtos cadastrados
    - Filtro de produtos conforme desejado

### Lote:

- **Descrição:** Gerencia lotes de produtos, com informações de data de validade e quantidade de produtos.
- **Informações Armazenadas:**
    - Código do lote
    - Quantidade de produtos disponíveis
    - Data de validade do produto relacionado
    - Produto associado ao lote
- **Funcionalidades:**
    - Cadastro de novos lotes
    - Edição de lotes existentes
    - Exclusão de lotes
    - Visualização de todos os lotes cadastrados
