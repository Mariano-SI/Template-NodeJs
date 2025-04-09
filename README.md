# Template Node.js

Um template de API em **Node.js com TypeScript**, organizado e escalável, criado para servir como base sólida para novos projetos. A estrutura segue princípios de Clean Architecture e separação de responsabilidades, facilitando a manutenção e evolução da aplicação.

---

## Principais recursos

- Estrutura modularizada por domínio
- Clean Architecture aplicada
- TypeScript com aliases (`@`)
- ESLint + Prettier já configurados
- Docker e Docker Compose para desenvolvimento isolado
- Suporte a documentação Swagger
- Repositórios com padrão genérico 
- Exemplo completo de módulo (`example`) para referência
- Setup para trabalhar com PostgresSQL já configurado

---

## Estrutura de pastas

```bash
src/
├── common/                    # Código compartilhado por todos os módulos
│   ├── domain/                # Regras gerais da aplicação
│   ├── infrastructure/        # Banco de dados, servidor, middlewares
├── modules/                   # Módulos de domínio (ex: users, products, etc.)
│   └── example/               # Módulo de exemplo completo
│       ├── application/       # Casos de uso, serviços e lógica de orquestração
│       ├── domain/            # Models, entidades e interfaces de repositório
│       └── infrastructure/    # Implementações de repositórios, controllers, etc.
```

---

## Próximos passos e sugestões

O projeto ainda pode evoluir bastante com a adição de novas funcionalidades e boas práticas. Algumas ideias:

- Estrutura para testes unitários e de integração (ex: Jest, Supertest)
- Autenticação com JWT ou OAuth2
- Logger centralizado (Winston, Pino, etc)
- Setup para cache com Redis
- Integração contínua e deploy automatizado

Sinta-se à vontade para sugerir novas funcionalidades, abrir issues ou enviar pull requests. Qualquer contribuição é bem-vinda!
