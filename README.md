
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
| 7. Eventos assíncronos‌ | TODO |
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

Não há utilização de eventos assíncronos.

### Agregação de logs

Não implementado.

### Agregação de métricas

Não implementado.

## Aspectos de microsserviços

### Padronização de stacks do serviço

Possuímos alguns padrões nos nossos microsserviços, como o do eslint.
Mas algo que poderia ser implementado, é um template, que possui uma imagem base para os microsserviços, com todos os serviços já instalados.

### Solução para service discovery

Para não lidar diretamente com IPs dos nossos microsserviços, podemos utilizar um DNS, servindo também como um service registry.
Com isso, facilitamos um load balancer, distribuindo as solicitações entre os contêineres e evitando sobrecarga do servidor.

### Aspectos de segurança

A aplicação já utiliza questões de autenticação e autorização através de tokens JWT e ACL, mitigando acessos indevidos.
A criptografia é algo essencial para proteger ainda mais nosso sistema, utilizando criptografia em back-ups e um BD cifrado. Caso fosse necessário realizar métricas, devemos armazenar os dados anonimizados.
Como temos implementado um API Gateway, também acabamos aumentando um pouco da segurança do projeto, facilitando a implementação de um firewall.

### Tecnologias para deploy e build

Podemos adotar uma estratégia de release pipeline, automatizando as entregas.
Devemos ter configurações (de ambientes e da aplicação) parametrizadas.

Utilizaremos o Jenkins em conjunto com o GitHub Actions para fornecer um ambiente contínuo de integração e implantação.

### Lidar com tolerância a falhas em aplicações síncronas

Para lidar com tolerância a falhas podemos utilizar circuit breaker, que já tem uma implementação facilitada pois nosso projeto possuí um proxy por conta do gateway.
Além disso, temos a possibilidade de utilizar cache em processamentos pesados.
Essas ferramentas mitigando problemas do lado do servidor, como sobrecargas e inatividade.

### Uso de comunicação assíncrona

Neste projeto a comunicação assíncrona deve ser usada principalmente no microsserviço de order. Ao realizar um pedido, o pagamento pode demorar um tempo para ser aprovado ou negado, por isso o sistema deve retornar que o pagamento está sendo processado e aguardar a resposta.
