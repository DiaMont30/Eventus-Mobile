# 🎉 Eventus

> Aplicativo mobile para gerenciamento de eventos, com autenticação de administradores e CRUD completo de eventos.

![Expo](https://img.shields.io/badge/Expo-54-blue?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

---

## 📖 Sobre o Projeto

O **Eventus** é um aplicativo mobile desenvolvido com **Expo e React Native** que permite a administradores gerenciarem seus eventos de forma simples e intuitiva.

Com ele, é possível:

- 🧑‍💻 Criar uma conta e realizar login como administrador.
- 📅 Listar eventos cadastrados com paginação e atualização por *pull-to-refresh*.
- ➕ Cadastrar novos eventos (nome, data, localização e imagem).
- ✏️ Editar e 🗑️ excluir eventos existentes.
- 🌙 Alternar entre tema claro e escuro.

O projeto consome uma **API REST** (Spring Boot) e foi construído pensando em componentes reutilizáveis, tipagem forte com TypeScript e uma experiência de usuário agradável.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia          | Versão    | Finalidade                              |
| ------------------- | --------- | --------------------------------------- |
| Expo                | ~54.0.35  | Framework e ferramentas de desenvolvimento |
| React Native        | 0.81.5    | Interface mobile                        |
| React               | 19.1.0    | Biblioteca de UI                        |
| TypeScript          | ~5.9.2    | Tipagem estática                        |
| React Navigation     | v7        | Navegação entre telas                   |
| React Hook Form     | ^7.85.0   | Validação e gerenciamento de formulários|
| Axios               | ^1.19.0   | Requisições HTTP à API                  |
| Async Storage       | 2.2.0     | Persistência do token de autenticação   |

---

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)
- **Expo Go** no seu dispositivo físico, ou um **emulador** (Android/iOS)

> 💡 O **backend** (API) deve estar rodando e acessível a partir do mesmo IP da sua máquina. O código-fonte dele está disponível em [Eventus Back-End](https://github.com/DiaMont30/Eventus-Back-End).

Verifique a URL base em `src/services/api.ts`:

```ts
const BASE_URL = 'http://192.168.1.5:8080';
```

Ajuste esse endereço para o IP/host da sua API, se necessário.

---

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

```bash
git clone https://github.com/DiaMont30/Eventus-Mobile.git
```

2. **Acesse a pasta do projeto**

```bash
cd eventus-mobile
```

3. **Instale as dependências**

```bash
npm install
```

4. **Inicie o projeto**

```bash
npx expo start
```

5. **Abra no seu dispositivo ou emulador**

- Escaneie o QR Code com o aplicativo **Expo Go**;
- Ou pressione `a` para abrir no **Android Emulator**, `i` para o **iOS Simulator** e `w` para o navegador.

### Comandos úteis

| Comando                  | Descrição                        |
| ------------------------ | -------------------------------- |
| `npm start`              | Inicia o servidor do Expo        |
| `npm run android`        | Inicia e abre no Android         |
| `npm run ios`            | Inicia e abre no iOS             |
| `npm run web`            | Inicia e abre no navegador       |

---

## 📲 Como Usar

1. **Crie sua conta**: toque em "Criar conta" e preencha nome, e-mail e senha.
2. **Faça login**: entre com suas credenciais para acessar a área administrativa.
3. **Gerencie seus eventos**:
   - Toque em **“+ Evento”** para cadastrar um novo evento;
   - Use os botões de edição e exclusão em cada card de evento;
   - Arraste a lista para baixo para atualizar os dados.
4. **Personalize**: alterne entre tema claro e escuro pelo ícone na tela inicial.

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir com o projeto:

1. Faça um **fork** do repositório.
2. Crie uma branch para sua feature:

```bash
git checkout -b feat/minha-melhoria
```

3. Faça suas alterações e **commit** com mensagens claras:

```bash
git commit -m "feat: descreva a melhoria"
```

4. Envie para o seu repositório:

```bash
git push origin feat/minha-melhoria
```

5. Abra um **Pull Request** explicando as mudanças realizadas.

> Antes de contribuir, siga o estilo de código já existente no projeto (componentes reutilizáveis, nomes em PT-BR e TypeScript tipado).

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

Feito com ❤️ usando Expo e React Native.
