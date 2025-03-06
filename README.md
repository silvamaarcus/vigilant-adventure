# Radio Browser

Uma aplicação que permite aos usuários reviverem os tempos das rádios antigas, oferecendo funcionalidades de busca, reprodução e gerenciamento de estações de rádio favoritas.

## Tecnologias Utilizadas

Para o desenvolvimento deste projeto, foram utilizadas tecnologias modernas que garantem desempenho, escalabilidade e uma excelente experiência do usuário:

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) – escolhido por sua tipagem estática e melhoria na manutenção do código.
- **Framework:** [React](https://react.dev/) – utilizado para criar uma interface interativa e dinâmica.
- **Ferramentas e Bibliotecas:**
  - [Vite](https://vitejs.dev/) (ferramenta de build) – ferramenta de build rápida para otimizar o desenvolvimento.
  - [Tailwind CSS 4.0](https://tailwindcss.com/) (estilização) – framework de estilização que permite um design responsivo e consistente.
  - [Zustand](https://github.com/pmndrs/zustand) (gerenciamento de estado) – gerenciamento de estado simples e eficiente.
  - [React Modal](https://www.npmjs.com/package/react-modal) (componente de modal) – utilizado para criar modais acessíveis e customizáveis.
  - [Lucide Icons](https://lucide.dev/) (ícones) – coleção de ícones modernos para melhorar a interface do usuário.
  - [Docker](https://www.docker.com/) (containerização) – utilizado para containerizar a aplicação e facilitar a distribuição e execução do projeto.

Essas tecnologias foram escolhidas para garantir um desenvolvimento eficiente, seguindo as melhores práticas do mercado e proporcionando uma aplicação leve, rápida e responsiva.

## Funcionalidades

- **Adicionar Rádio à Lista:** Permite que o usuário adicione estações de rádio à sua lista pessoal.
- **Visualizar Lista de Rádios:** Exibe as estações de rádio que o usuário adicionou à sua lista.
- **Remover Rádio da Lista:** Possibilita a remoção de estações de rádio da lista pessoal.
- **Editar Informações da Rádio:** Permite a edição dos detalhes de uma estação de rádio selecionada.
- **Reproduzir e Parar Rádio:** Funcionalidade de reproduzir (play) e parar (stop) a transmissão de uma estação de rádio.
- **Pesquisar Rádios:** Busca por estações de rádio com base no nome, país ou idioma, com paginação de 10 rádios por vez.
- **Persistência de Dados:** As informações das rádios são salvas localmente para que, ao retornar à aplicação, o usuário encontre suas estações previamente adicionadas.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (gerenciadores de pacotes)
- [Docker](https://www.docker.com/) (para execução em container, opcional)

## Instalação e Uso

1. **Clone o repositório:**

```bash
   git clone https://github.com/seu-usuario/radio-browser.git
   cd radio-browser
```

2. **Instale as dependências:**

```bash
npm install
```

Ou se preferir, use o Yarn:

```bash
yarn install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173

4. **Build para produção:**

```bash
npm run build
```

Ou se preferir, use o Yarn:

```bash
yarn build
```

5. **Executando com Docker (opcional):**

Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```bash
VITE_API_URL=https://de1.api.radio-browser.info/json/stations/search
```
Após criar o arquivo, execute o seguinte comando para iniciar o container:

```bash
docker-compose up --build
```

A aplicação estará disponível em http://localhost:3000.

## Arquivo .gitignore

Certifique-se de que o arquivo `.gitignore` inclua as seguintes entradas para evitar o versionamento de arquivos desnecessários:

```bash
node_modules/
dist/
.env
.vscode/
.DS_Store
```

## Responsividade e Design

O projeto foi desenvolvido utilizando as versões mais recentes das tecnologias mencionadas e segue um design responsivo, garantindo uma experiência consistente em dispositivos móveis, tablets e desktops. O desenvolvimento foi baseado em um wireframe fornecido, com adaptações realizadas para alcançar um design pixel perfect.

## Imagens

**Desktop**
![Image](https://github.com/user-attachments/assets/992f44de-8f86-4d14-bfb5-a0641732a50f)
![Image](https://github.com/user-attachments/assets/ca0041be-b759-4118-9e28-60555a8332ff)

**Mobile**
![Image](https://github.com/user-attachments/assets/4b043652-c440-4da5-b3ab-7f6281a5a22a)
![Image](https://github.com/user-attachments/assets/5baa4954-948c-4f94-888f-8d5b9803e1d2)

## Links

- [Repositório no GitHub](https://github.com/silvamaarcus/vigilant-adventure)
- [Deploy na Vercel](https://vigilant-adventure-nu.vercel.app/)

## Observações

Este projeto foi desenvolvido como parte de um desafio proposto pela Coodesh. Veja meu repositório no GitHub para obter mais informações.

> This is a challenge by [Coodesh](https://coodesh.com/)

## Conclusão

Gostaria de expressar minha sincera gratidão à plataforma Coodesh pela incrível oportunidade de participar deste projeto tão enriquecedor. A experiência foi extremamente valiosa para mim, e estou muito feliz por ter tido a chance de contribuir e aprender com todos os envolvidos. Espero que este projeto possa ser útil para a comunidade e que possa servir como um exemplo de como a tecnologia pode ser usada para resolver problemas reais.
