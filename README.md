# Quake log parser
## Desafio
[Ver o texto](DOC/DESAFIO.md)
## Dependencia
projeto feito com padões ES9
- node >= `12.3.1`
## Instalação
npm:
`npm install`
ou
yarn:
`yarn`
## Rotas

| TYPE | PATH | ARGS | QUERY | PARAMS | DESCRIÇÃO |
|------|------|------|-------|--------|-----------|
|GET| / | - | - | - | lista todos objetos |
|GET| /?players= | - | players: `joão,josé` | - | Filtra por players |
|GET| /:key | KeyGame | - | - | Seleciona jogo especifico |
| - | /doc | - | - | - | Documentação swagger da aplicação |

## Estrutura do projeto
A estrutura do projeto foi pensada para trabalhar com modularização de componentes.

Cada módulo tem sua responsabilidade sua rota e sua regra de negócio. Os arquivos de configuração de padronização do projeto ficam fora da pasta `src` e o core da aplicação ficam na pasta `App`
```
QuakeLogParser/
├── src/
│   ├── App/
│   │   │── Modules/
│   │   │   └── Main/
│   │   │       │── __tests__/
│   │   │       │   │── Main.spec.js
│   │   │       │   └── MainDAO.spec.js
│   │   │       │── MainBusiness.js
│   │   │       │── MainController.js
│   │   │       │── MainDAO.js
│   │   │       │── MainRoutes.js
│   │   │       └── MainSchema.js
│   │   │── Utils/
│   │   │   └── ParserLog/
│   │   │       │── __tests__/
│   │   │       │   └── ParserLog.spec.js
│   │   │       └── index.js
│   │   └── index.js
│   ├── data/
│   │   └── game.log
│   └── index.js
├── DOC/
│   └── DESAFIO.md
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── babel.config.js
├── index.js
├── jest.config.js
├── nodemon.json
├── package.json
├── README.md
└── yarn.lock
```


