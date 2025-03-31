# PetVet - Sistema de Gerenciamento de Pets e Agendamentos

## 🗕️ Visão Geral

**PetVet** é uma aplicação web moderna e responsiva desenvolvida em **Angular 19** com **Angular Material**, projetada para auxiliar tutores no gerenciamento de **pets** e **agendamentos de serviços veterinários**.

O sistema permite cadastrar pets, exibir detalhes com imagens, realizar agendamentos manuais ou automáticos, aplicar filtros avançados e muito mais.

---

## ✨ Funcionalidades Principais

### 🐾 Gerenciamento de Pets

- Cadastro de pets com informações como nome, espécie, idade, tutor e imagem.
- Edição e exclusão com confirmação.
- Exibição responsiva dos pets em cards.
- Modal de detalhes com imagem obtida via API.
- Integração com backend RESTful (Java).

### ⌚ Agendamento de Cuidados

- Tela para agendamento manual de serviços: vacinação, consulta, banho, etc.
- Edição e exclusão de agendamentos.
- Integração com backend RESTful (Java).
- Feedback visual com snackbar.

### 🔍 Listagem de Agendamentos

- Listagem de todos os agendamentos (manuais e automáticos).
- Filtros avançados por pet, tipo de serviço e data.
- Diferença visual com tags e estilos distintos.

### 🧭 Interface Moderna e Responsiva

- Layout com `mat-sidenav` e responsividade.
- Utilização moderna de `inject()` e Angular Control Flow (`@if`, `@for`).
- Ícones dinâmicos e animações visuais minimalistas.

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── pet/
│   │   │   ├── pet-form/
│   │   │   ├── pet-list/
│   │   │   └── pet-card/
│   │   ├── appointment/
│   │   │   ├── appointment-form/
│   │   │   ├── appointment-list/
│   │   │   └── appointment-card/
│   │   └── common/
│   │       └── confirm-dialog/
│   │       └── home/
│   ├── models/
│   │   ├── pet/
│   │   └── appointment/
│   ├── services/
│   │   ├── pet/
│   │   ├── appointment/
│   │   └── common/            ← Serviço de feedback visual (snack-bar)
│   └── app.component.ts / html / css
```

---

## ⚙️ Tecnologias Utilizadas

- **Angular 19+** (standalone components, `inject`, Angular Control Flow)
- **TypeScript**
- **Angular Material**
- **CSS** moderno
- **Java RESTful**

---

## 🚀 Como Executar o Projeto

```bash
git clone git@git.gft.com:knou/desafio-angular.git
cd FrontEnd_Angular
npm install
ng serve
```

Acesse em: [http://localhost:4200](http://localhost:4200)

## 🛠️ Futuras Melhorias

- Autenticação e login com JWT
- Dashboard com estatísticas
- Notificações por email
- Validações mais robustas
- Upload de imagem do pet

---

## ✉️ Contato

Desenvolvido por Kelvin Rodrigues para GFT Start. Para dúvidas ou sugestões, entre em contato.

---

> Projeto construído como solução completa de gerenciamento de pets e cuidados veterinários. Desenvolvido com foco em boas práticas modernas de Angular 19+.
