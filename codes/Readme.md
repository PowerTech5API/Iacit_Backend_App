De acordo com a lgpd, uma pessoa tem o direito de pedir para ter seus dados apagados de um serviço e esses dados devem permanecer apagados. E esse diretorio existe para comprir com esse requisito.

Primeiro instale o python mais atualizado.

Para criar um backup use em um terminal neste diretorio.
```sh
python mongodump.py
```
caso precise recuperar os dados do banco usando o backup sem que ele retorne usuarios deletados depois da criação do backup.
```sh
python deleção.py
```
Com a execução do ultimo programa todos os usuarios deletados depois do backup não seram restaurados pois na aplicação principal ao deletar um usuario guardamos somente o id em uma base de dados a parte e utilisamos esses dados na hora de restaurar o backup para impedir os dados do usuario de retornar à aplicação.
