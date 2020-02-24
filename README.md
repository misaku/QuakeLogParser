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
|GET| / | - | - | - | Retorna status do servidor |
|GET| /auth/token | - | - | - | retorna token da aplicação |
|GET| /games | - | - | - | lista todos objetos |
|GET| /games?players= | - | players: `joão,josé` | - | Filtra por players |
|GET| /games/:key | KeyGame | - | - | Seleciona jogo especifico |
| - | /doc | - | - | - | Documentação swagger da aplicação |

## Como testar
### Via swagger
1. Entrar na tora `/doc`
2. Acessar todos os metodos, somente o de Auth e o de Health Funcionará sem autenticação
3. Pegar token e adicionar no campo authorize que está no canto superior direito
4. testar rotas de game
### Via Cliente
Repetir os passos de 2 e 4 no cliente escolgido, no caso passo 3 colocar autenticação no cliente escolhido
## Estrutura do projeto
A estrutura do projeto foi pensada para trabalhar com modularização de componentes.

Cada módulo tem sua responsabilidade sua rota e sua regra de negócio. Os arquivos de configuração de padronização do projeto ficam fora da pasta `src` e o core da aplicação ficam na pasta `App`
```
QuakeLogParser/
├── src/
│   ├── App/
│   │   │── Modules/
│   │   │   │── Auth/
│   │   │   │   │── __tests__/
│   │   │   │   │   └── Auth.spec.js
│   │   │   │   │── AuthBusiness.js
│   │   │   │   │── AuthController.js
│   │   │   │   └── AuthRoutes.js
│   │   │   │── Game/
│   │   │   │   │── __tests__/
│   │   │   │   │   │── Game.spec.js
│   │   │   │   │   └── GameDAO.spec.js
│   │   │   │   │── GameBusiness.js
│   │   │   │   │── GameController.js
│   │   │   │   │── GameDAO.js
│   │   │   │   │── GameRoutes.js
│   │   │   │   └── GameSchema.js
│   │   │   └── Health/
│   │   │       │── __tests__/
│   │   │       │   └── Health.spec.js
│   │   │       │── HealthBusiness.js
│   │   │       │── HealthController.js
│   │   │       └── HealthRoutes.js
│   │   │── Utils/
│   │   │   └── ParserLog/
│   │   │       │── __tests__/
│   │   │       │   └── ParserLog.spec.js
│   │   │       └── index.js
│   │   │── AppConfig.js
│   │   │── index.js
│   │   └── MainApp.js
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


