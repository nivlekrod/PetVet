## Desafio de Microsserviços

# Sistema de Cadastro e Agenda de Cuidados para Pets 🐾

## 📝 Descrição do Desafio

Desenvolvimento de um sistema com quatro microsserviços que se comunicam via **RabbitMQ** e **Feign Client** para comunicação síncrona. O sistema é composto pelos seguintes microsserviços:

1. **Eureka Server**: Gerencia registro e descoberta de microsserviços
2. **Gateway**:  Organiza o roteamento e o loadbalance.
3. **Cadastro de Pets (Pet Register)**: Responsável pelo gerenciamento completo das entidades **Pets** (CRUD completo);
4. **Agenda de Cuidados (Appointment Scheduling)**: Organiza vacinações, banhos e consultas veterinárias;

A integração entre os microsserviços garante um fluxo eficiente e dinâmico para o gerenciamento dos pets.

## 🏗️⚙️ Estrutura e Funcionalidades do Projeto
### 🔹 Microsserviço 1 - Eureka Server

- **Funcionalidade**: Serviço de descoberta de microsserviços.
- **Registro Dinâmico**: Permite que microsserviços se registrem automaticamente.
- **Consulta de Serviços**: Facilita a descoberta e comunicação entre microsserviços.
- **Alta Disponibilidade**: Mantém uma lista atualizada dos serviços ativos.

### 🔹 Microsserviço 2 - API Gateway

- **Funcionalidade**: Roteamento e gerenciamento de requisições.
- **Balanceamento de Carga**: Distribui requisições entre instâncias dos microsserviços.
- **Segurança**: Pode integrar autenticação e autorização.

### 🔹 Microsserviço 3 - Cadastro de Pets (Pet Register)

Este microsserviço é responsável pelo cadastro de informações dos pets. Ele recebe os seguintes atributos para criar um novo cadastro:

#### Atributos de Cadastro:

- **ID**: Gerado automaticamente pelo sistema.
- **Nome**: Nome do pet.
- **Espécie**: Tipo de animal (exemplo: GATO, CACHORRO).
- **Raça**: Raça do pet.
- **Idade**: Idade do pet em meses.
- **Peso**: Peso do pet em kg.
- **Cor**: Cor do pet.
- **Descrição**: Descrição do comportamento ou características do pet.
- **Tutor**: Nome do tutor responsável pelo pet.
- **Email do Tutor**: Email de contato do tutor.
- **Imagem de Referencia** : Imagem do pet é fornecida por uma API externa (TheCatAPI & TheDogAPI)

Esse microsserviço permite o cadastro completo das informações de um pet, com a integração da API Externa TheCatAPI & TheDogAPI para imagens, se necessário pode ser realizado outra consulta para obter informações adicionas (não incluso).

### 🔹 Microsserviço 4 - Agendamento de Cuidados (Appointment Scheduling)

Este microsserviço é responsável pelo agendamento de cuidados para os pets. Ele recebe os seguintes atributos para criar um novo agendamento:

### Atributos de Agendamento:

- **ID**: Gerado automaticamente pelo sistema.
- **Tipo_Servico**: Tipo de serviço a ser agendado (exemplo: VACINA, BANHO, TOSA, COMPORTAMENTAL).
- **Data_Agendamento**: Data do agendamento do serviço.
- **Dados do Pet**: Recebe/Fornece dados da entidade Pet, por meio de Relacionamento entre Entidades no Banco de Dados e da implementações do Feign Client para consumo de forma síncrona do Serviço Cadastro de Pets (Pet Register).
    - **ID_PET**: Identificador único do pet que está sendo agendado.
    - **Nome_Pet**: Nome do pet que está sendo agendado.
    - **Especie**: Espécie do pet (exemplo: GATO, CACHORRO).
    - **Raça**: Raça do pet.
    - **Idade**: Idade do pet em meses.
    - **Peso**: Peso do pet em kg.
    - **Tutor**: Nome do tutor responsável pelo pet.
    - **Tutor_Email**: Email de contato do tutor.
- **Observaçoes**: Observações adicionais sobre o agendamento ou sobre o pet.

Esse microsserviço permite o cadastro e o gerenciamento de agendamentos de cuidados, garantindo o controle de informações relacionadas aos pets e seus tutores.

## 🔧 Tecnologias Utilizadas

- **JDK21**
- **Spring Boot**
- **RabbitMQ** (mensageria entre microsserviços de forma assíncrona)
- **MySQL**
- **H2** (para testes durante o desenvolvimento)
- **Swagger**
- **Maven**
- **Postman**
- **Feign Client** (para comunicação com outros serviços de forma síncrona)

## 📚 Documentação com Swagger

A documentação da API pode ser acessada em duas portas diferentes:
**Documentação do Microserviço de Cadastro de Pets (Pet Register):**
```
http://localhost:8081/swagger-ui.html
```
**Documentação do Microserviço de Agendamento de Cuidados (Appointment Scheduling):**
```
http://localhost:8082/swagger-ui.html
```

## 📌 Endpoints Disponíveis

### 🔹 Microsserviço 1 - Cadastro de Pets (Pet Register)

- **POST** `/api/pets` - Cadastrar um pet
- **GET** `/api/pets/{id}` - Buscar um pet pelo ID
- **GET** `/api/pets` - Listar todos os pets
- **PUT** `/api/pets/{id}` - Atualizar dados de um pet
- **DELETE** `/api/pets/{id}` - Deletar um pet

### Filtro da raça

- **GET** `/api/pets/filter?breed={raça}` - Buscar Pets cadastrados com base na raça.
- **GET** `/api/pets/filter?species={ESPECIE}` - Buscar Pets cadastrados com base na especie.

- ⚠️ **ESSA FUNCIONALIDADE PODE SER REALIZADA DE FORMA CONJUNTA** 
    - EXEMPLO: `/api/pets/filter?species={ESPECIE}?breed={raça}`

### 🔹 Integração com TheDogAPI e TheCatApi

- **GET** `/api/cadastramento/images?breed={breed_id}` - Buscar imagens com base na raça

## ❌ Tratamento de Erros

- **404** - Recurso não encontrado
- **400** - Erro de Requisição
- **500** - Erro Interno no Servidor
- **503** - API externa indisponível


### 🔹 Microsserviço 2 - Agendamento de Cuidados (Appointment Scheduling)

- **POST** `/api/appointments` - Criar um agendamentos na agenda
- **GET** `/api/appointments?petId={ID_PET}` - Buscar um agendamento de um Pet em específico
- **GET** `/api/appointments/all` - Listar todos agendamentos
- **PUT** `/api/appointments/{id}` - Atualizar um agendamento
- **DELETE** `/api/appointments/{id}` - Excluir um agendamento

## 📋 Configuração

### 🔹 Configurando o Microsserviço de Cadastro de Pets (Pet Register)

Para configurar o microsserviço de cadastro de pets, é necessário ajustar o arquivo `application.properties` com as informações do banco de dados e da API externa para obtenção de imagens. Caso tenha criado uma fila com nome diferente, será necessário muda o `mq.queues`. Substitua os valores conforme suas credenciais:

```application.properties
# Nome da Aplicação
spring.application.name={nome-da-aplicacao}
server.port=8081

# Configuração do Banco de Dados
spring.datasource.url=jdbc:mysql://localhost:3306/{nome-do-banco}?useSSL=false&createDatabaseIfNotExist=true
spring.datasource.username={usuario-do-banco}
spring.datasource.password={senha-do-banco}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Configuração do Swagger (OpenAPI)
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs

# Configuração do RabbitMQ
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username={usuario-rabbitmq}
spring.rabbitmq.password={senha-rabbitmq}

# Nome da fila do RabbitMQ
mq.queues.pet_created={nome-da-fila}

# Chave da API Externa (TheDogAPI/TheCatAPI)
apikey={chave-api}
```

> ⚠️ **Importante**: Substitua `{Chave-Api}` pela chave obtida na [The Dog API](https://thedogapi.com/) ou [The Cat API](https://thecatapi.com/). Utilize credenciais seguras para o banco de dados e evite expor informações sensíveis diretamente no código.


### 🔹 Configurando o Microsserviço de Agendamento de Cuidados (Appointment Scheduling)

Para configurar o microsserviço de agendamento de cuidado, é necessário ajustar o arquivo `application.properties` com as informações do banco de dados e de filas. Caso tenha criado uma fila com nome diferente, será necessário mudar o `mq.queues`. Substitua os valores conforme suas credenciais e configurações locais:

```application.properties
# Nome da Aplicação e Porta do Servidor
spring.application.name={nome-da-aplicacao}
server.port=8082

# Configuração do Swagger (OpenAPI)
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs

# Configuração do Eureka Server
# URL do Eureka para registro do serviço
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
# Geração automática de UUID para o ID da instância do serviço
spring.application.instance_id=${random.uuid}
# Formato do ID da instância no Eureka
eureka.client.instance.instance-id=${spring.application.name}:${spring.application.instance_id}

# Configuração do Banco de Dados MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/{nome-do-banco}?useSSL=false&createDatabaseIfNotExist=true
spring.datasource.username={usuario-do-banco}
spring.datasource.password={senha-do-banco}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl_auto=update

# Configuração do RabbitMQ
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username={usuario-rabbitmq}
spring.rabbitmq.password={senha-rabbitmq}

# Nome da fila do RabbitMQ
mq.queues.pet_created={nome-da-fila}
```


Feito por Kelvin R. para GFT Start


