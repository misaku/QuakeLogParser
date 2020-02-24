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
|GET| /games | - | - | - | lista todos objetos |
|GET| /games?players= | - | players: `joão,josé` | - | Filtra por players |
|GET| /games/:key | KeyGame | - | - | Seleciona jogo especifico |
| - | /doc | - | - | - | Documentação swagger da aplicação |

## Estrutura do projeto
A estrutura do projeto foi pensada para trabalhar com modularização de componentes.

Cada módulo tem sua responsabilidade sua rota e sua regra de negócio. Os arquivos de configuração de padronização do projeto ficam fora da pasta `src` e o core da aplicação ficam na pasta `App`
```
QuakeLogParser/
├── src/
│   ├── App/
│   │   │── Modules/
│   │   │   └── Game/
│   │   │       │── __tests__/
│   │   │       │   │── Game.spec.js
│   │   │       │   └── GameDAO.spec.js
│   │   │       │── GameBusiness.js
│   │   │       │── GameController.js
│   │   │       │── GameDAO.js
│   │   │       │── GameRoutes.js
│   │   │       └── GameSchema.js
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


