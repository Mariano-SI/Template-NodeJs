# Changelog

## [1.0.0] - 2025-08-26

### Added
- Estrutura inicial do projeto com arquitetura modular e DDD.
- Endpoint GET `/api/products/:id` para detalhes do produto.
- Persistência de dados em arquivos JSON simulando banco de dados.
- Repositório e entidade para produtos.
- Repositório e entidade para variantes de produto.
- Validação de parâmetros e query com Zod.
- DTOs para formatação da resposta.
- Documentação Swagger disponível em `/api/docs`.

### Changed
- Organização dos arquivos de dados para pasta centralizada.

### Fixed
- Validação de query param `includeInactive` para aceitar
