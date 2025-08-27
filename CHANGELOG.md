# Changelog

## [1.0.0] - 2025-08-26

### Added
- Estrutura inicial do projeto com arquitetura modular e DDD.
- Endpoint GET `/api/products/:id` para detalhes do produto.
- Endpoint GET `/api/products` para listagem de produtos.
- Endpoint POST `/api/products` para criação de produtos.
- Persistência de dados em arquivos JSON simulando banco de dados.
- Repositório e entidade para produtos.
- Repositório e entidade para variantes de produto.
- Repositório e entidade para imagens de produto.
- Repositório e entidade para categorias de produto.
- Repositório e entidade para categorização de produto.
- Repositório e entidade para fornecedores.
- Upload de imagens para Cloudflare R2 utilizando a SDK do AWS S3.
- Implementação de repositórios in-memory para testes unitários.
- Testes unitários para repositórios e use cases de produtos e fornecedores.
- Validação de parâmetros e query com Zod.
- DTOs para formatação da resposta.
- Documentação Swagger disponível em `/api/docs`.
- Integração com cache Redis e provider de cache.
- Mock de provider de cache para testes.
- Upload de imagens simulado via provider.
- Configuração de ambiente com Docker Compose para Redis.
- Configuração de ambiente com variáveis `.env`.

### Changed
- Organização dos arquivos de dados para pasta centralizada.
- Separação dos testes unitários por repositório, use case e mocks.

### Fixed
- Validação de query param `includeInactive` para aceitar valores corretos.
- Correção de tipagem dos métodos dos repositórios.
- Ajuste dos testes para uso dos
