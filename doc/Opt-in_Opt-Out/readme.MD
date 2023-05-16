# LGPD Opt-in e Opt-out

Conforme estabelecido pela Lei Geral de Proteção de Dados (LGPD). A finalidade principal desta API é garantir que os usuários tenham controle sobre a coleta e uso de seus dados pessoais. 

O opt-in refere-se à prática em que o usuário precisa dar explicitamente seu consentimento para que seus dados pessoais sejam coletados e usados. Ou seja, sem a permissão prévia do usuário, nenhuma informação pessoal pode ser coletada ou processada.

Já o opt-out, permite que o usuário retire seu consentimento e opte por não permitir o uso de seus dados pessoais. Nesse caso, é necessário fornecer uma opção acessível, para que o usuário possa cancelar o consentimento assim que desejar.

Ambos os conceitos são importantes na LGPD, pois garantem que os indivíduos tenham o controle sobre suas informações pessoais, permitindo-lhes decidir quais dados desejam compartilhar e como eles podem ser utilizados. Isso promove a transparência, a privacidade e a proteção dos direitos dos usuários em relação aos seus dados.

No caso da API, foi implementado para definir quando o usuário deseja receber e-mail e quando aceita/recusa os termos.

## Endpoints usados na API

Abaixo estão os endpoints disponíveis nesta aplicação:

---
### `POST /config/saveConfig`


Endpoint responsável por permitir as configurações que o usuário deseja salvar

#### Parâmetros

Nenhum parâmetro é necessário para este endpoint.

#### Exemplo de Requisição
- `userId`: o ID único do usuário.
- `termsAccepted`: um valor booleano indicando se você aceita os termos de uso.
- `receiveEmails`: um valor booleano indicando se você deseja receber e-mails.

```json
{
	"userId": "643fcbec9d11b12d13ad014f",
    "termsAccepted": true,
	"receiveEmails": false
}
```
#### Exemplo de Resposta

```json
{
	"userId": "643fcbec9d11b12d13ad014f",
    "termsAccepted": true,
	"receiveEmails": false
}
```

### Sobre a requisição
Sempre que uma configuração é realizada, ela é armazenada em uma tabela de histórico , onde é salvo o momento que foi alterado aquela configuração do usuário, além de versão atual dos termos

---
### `Get /config/getLastConfigByUserId/USERID`

Endpoint responsável por listar a ultima configuração que foi definida pelo usuário.

#### Parâmetros

Deve ser informado o id do usuário no lugar de USERID

#### Exemplo de Requisição
```json
{
	"userId": "643fcbec9d11b12d13ad014f",
    "termsAccepted": true,
	"receiveEmails": false
}
```

#### Exemplo de Resposta

```json
{
	"_id": "645b916d44dd1853421a9356",
	"termsAccepted": true,
	"termsVersion": "1.0",
	"receiveEmails": false,
	"day": "10/05/2023",
	"hour": "09:43"
}
```
---
### `Get /config/getByUserId/USERID`

A API mantém um histórico das configurações anteriores do usuário para fornecer um registro das alterações e servir como prova em casos jurídicos ou disputas relacionadas à aceitação ou recusa dos termos. Cada registro no histórico inclui a data e hora em que a configuração foi alterada, bem como a versão atual dos termos de uso.

#### Parâmetros

Deve ser informado o id do usuário no lugar de USERID

#### Exemplo de Resposta

```json
[
	{
		"_id": "645b916d44dd1853421a9356",
		"termsAccepted": true,
		"termsVersion": "1.3",
		"receiveEmails": false,
		"day": "10/05/2023",
		"hour": "09:43"
	},
	{
		"_id": "645b915444dd1853421a9352",
		"termsAccepted": true,
		"termsVersion": "1.3",
		"receiveEmails": true,
		"day": "10/05/2023",
		"hour": "09:43"
	},
	{
		"_id": "645b914244dd1853421a933c",
		"termsAccepted": false,
		"termsVersion": "1.3",
		"receiveEmails": false,
		"day": "10/05/2023",
		"hour": "09:42"
	},
	{
		"_id": "645b90a644dd1853421a9323",
		"termsAccepted": true,
		"termsVersion": "1.2",
		"receiveEmails": true,
		"day": "10/05/2023",
		"hour": "09:40"
	},
	{
		"_id": "645b8e3744dd1853421a9313",
		"termsAccepted": false,
		"termsVersion": "1.2",
		"receiveEmails": false,
		"day": "10/05/2023",
		"hour": "09:29"
	},
	{
		"_id": "644d6a6b2083ca56cf6bae08",
		"termsAccepted": false,
		"termsVersion": "1.1",
		"receiveEmails": false,
		"day": "29/04/2023",
		"hour": "16:05"
	},
	{
		"_id": "644d68bdbb5e430cd6033a35",
		"termsAccepted": false,
		"termsVersion": "1.0",
		"receiveEmails": false,
		"day": "29/04/2023",
		"hour": "15:58"
	}
]
```

---

### `POST /terms/create`

Sempre que uma nova versão dos termos de uso da aplicação é criada, é necessário que os usuários revisem e aceitem esses novos termos.

- `version`: a versão do novo termo.
- `content`: o conteúdo do novo. 
- `topics`: tópicos relacionados ao conteúdo do novo. 

#### Exemplo de Requisição

```json
{
  "version": "2",
  "content": "Nós podemos coletar, utilizar e compartilhar seus dados pessoais de acordo com a nossa Política de Privacidade. Ao nos fornecer o seu endereço de e-mail. Você pode cancelar o recebimento desses e-mails a qualquer momento, seguindo as instruções de cancelamento contidas em cada mensagem.",
  "topics": [
    {
      "title": "Permissão de envio de e-mails",
      "content": "Ao fornecer o seu endereço de e-mail, você concorda em receber e-mails promocionais de nossa parte.",
      "subtopics": [
        {
          "title": "Cancelamento de recebimento",
          "content": "Você pode cancelar o recebimento desses e-mails a qualquer momento, seguindo as instruções de cancelamento contidas em cada mensagem."
        }
      ]
    }
  ]
}
```


---
### `Get /terms/getAll`

Endpoint responsável por listar todos termos do sistema.

#### Parâmetros

Nenhum parâmetro é necessário para este endpoint.
#### Exemplo de Resposta

```json
[
    {
        "_id": "644d68bdbb5e430cd6033a1b",
        "version": "1.0",
        "content": "Nós utilizamos cookies e outras tecnologias similares para melhorar a sua experiência em nossos serviços. Ao utilizar os nossos serviços, você concorda com a utilização de cookies e outras tecnologias similares de acordo com a nossa Política de Cookies. Além disso, nós podemos coletar, utilizar e compartilhar seus dados pessoais de acordo com a nossa Política de Privacidade."
    },
    {
        "_id": "644d6a6a2083ca56cf6badf6",
        "version": "1.1",
        "content": "Nós utilizamos cookies e outras tecnologias similares para melhorar a sua experiência em nossos serviços. Ao utilizar os nossos serviços, você concorda com a utilização de cookies e outras tecnologias similares de acordo com a nossa Política de Cookies. Além disso, nós podemos coletar, utilizar e compartilhar seus dados pessoais de acordo com a nossa Política de Privacidade. Ao nos fornecer o seu endereço de e-mail, você concorda em receber e-mails promocionais de nossa parte. Você pode cancelar o recebimento desses e-mails a qualquer momento, seguindo as instruções de cancelamento contidas em cada mensagem."
    }
]
```
---


---
### `Get /config/sendEmail`

Endpoint responsável por listar usuários que desejam receber e-mail.

#### Parâmetros

Nenhum parâmetro é necessário para este endpoint.

#### Exemplo de Resposta

```json
[
	{
		"_id": "643fcbec9d11b12d13ad014f",
		"name": "Lucca",
		"email": "lucca@gmail.com"
	}
]
```

### Sobre a requisição

Nesse retorno apenas são listados os usuários que aceitaram receber os e-mails, caso ele não queria mais receber, seu nome não aparecerá nessa listagem.

---