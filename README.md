
# E-commerce

Projeto de e-commerce criando durante o programa LevelUp da Alura.

## The Twelve-Factor App

| Factor | Description | Status |
|--------|-------------|--------|
| 1. Codebase | One codebase tracked in revision control, many deploys | OK |
| 2. Dependencies | Explicitly declare and isolate dependencies | OK |
| 3. Config | Store config in the environment | OK |
| 4. Backing services | Treat backing services as attached resources | OK |
| 5. Build, release, run | Strictly separate build and run stages | OK |
| 6. Processes | Execute the app as one or more stateless processes | OK |
| 7. Port binding | Export services via port binding | OK |
| 8. Concurrency | Scale out via the process model | OK |
| 9. Disposability | Maximize robustness with fast startup and graceful shutdown | OK |
| 10. Dev/prod parity | Keep development, staging, and production as similar as possible | OK |
| 11. Logs | Treat logs as event streams | OK |
| 12. Admin processes | Run admin/management tasks as one-off processes | TODO |

### Codebase

Este fator é contemplatado pois utilizados o Git para versionar o projeto. Contamos com o código base em um repositório do GitHub.

### Dependencies

Este fator é contemplado pois mantemos nossas dependências isoladas e declaradas explícitamente por meio dos arquivos 'package.json' e 'package-lock.json'.

### Config

Fator contemplado, pois todas os dados de configurações, como o de conexões com os bancos de dados não estão explícitos no código.

### Backing services

É utilizado serviços de apoio como Redis e os BD's.

### Build, release, run

Fator contemplado pois o Docker garante o build, release e execute da aplicação de forma consistente.

### Processes

Fator contemplado pois os processos não armazenam estados.

### Port binding

Este fator é contemplado, pois temos vinculações de portas explícitas, exportando o HTTP como um serviço.

### Concurrency

O fator é contemplado pois seguimos o fator de processos e por podermos escalar o projeto.

### Disposability

O fator é contemplado pois o Docker facilita o processo.

### Dev/prod parity

o fator é contemplado pois o projeto é conteinerizado e orquestrado pelo Docker. Logo, o ambiente de desenvolvimento e produção são semelhantes.

### Logs

O fator é contemplado pois os logs são enviados para a saída padrão, o console.

### Admin processes

Fator não contemplado.

## Microservices Patterns

| Patterns | Status |
|--------------|-----------|
| 1. Serviços de domínio | OK |
| 2. Serviços de negócio | OK |
| 3. API Gateway | OK |
| 4. Agregador de processos | OK |
| 5. Edge service | OK |
| 6. Single database vs Bancos diferentes | OK |
| 7. Eventos assíncronos‌ | OK |
| 8. Agregação de logs | TODO |
| 9. Agregação de métricas | TODO |

### Serviços de domínio

O projeto utiliza serviços de domínio.

### Serviços de negócio

O projeto utiliza serviços de negócio, em que há interação entre domínios.

### API Gateway

Implementado.

### Agregador de processos

O agregador de processos é utilizado em algumas requisições.

### Edge service

Não há necessidade neste projeto.

### Single database vs Bancos diferentes

Há a utilização de BD's diferentes, cada um responsável pelo seu respectivo serviço.

### Eventos assíncronos‌

Há a utilização de eventos assíncronos.

### Agregação de logs

Não implementado.

### Agregação de métricas

Não implementado.
