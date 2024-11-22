# Palevá - Cozinha

- A Vue.js application that connects to the Restaurant Management System API to display and manage restaurant orders.
- Aplicação Vue.js que consome a API de pedidos do aplicativo [Palevá](https://github.com/cmf000/paleva).

## Features

Acessa a API de pedidos para:
- Receber pedidos
- Aceitar ou cancelar pedidos
- Atualizar o status de um pedido

Roda direto no navagador utilizando o Vue por uma CDN.

## Tecnologias
- Vue.js
- (vue-18n)[https://kazupon.github.io/vue-i18n/]


## Instalação

1. Clonar o repositório
```bash
git clone https://github.com/cmf000/paleva-client
cd paleva-client
```

## Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Safari, or Edge)
- Uma instância da aplicação Palevá rodando.

## Quick Start

1. Clonar o repositório
2. Abrir index.html no navegador

## Integração com a API

```javascript
 GET   ${API_URL}/api/v1/restaurants/:restaurant_code/orders                            # Listar pedidos
 GET   ${API_URL}/api/v1/restaurants/:restaurant_code/orders/:order_code                # Ver detalhes de um pedido
 PATCH ${API_URL}/api/v1/restaurants/:restaurant_code/orders/:order_code/preparing      # Aceitar um pedido
 PATCH ${API_URL}/api/v1/restaurants/:restaurant_code/orders/:order_code/ready          # Informar que um pedido está pronto
*PATCH ${API_URL}/api/v1/restaurants/:restaurant_code/orders/:order_code/cancelled      # Cancelar um pedido
```

*Cancelar um pedido precisa de um motivo de cancelamento no corpo da requisição:

```json
{
  "order": {
    "cancellation_note": "Motivo para cancelar"
  }
}
```

## Configuração

A URL da API de pedidos deve ser confgurada no arquivo `config.js`

```javascript
const API_URL = 'http://localhost:3000/api/v1';
```

## Licença

Este projeto está licenciado sob a [Licença MIT](https://mit-license.org/).

## Contato

César Faustino - contato@cesarmf.com.br