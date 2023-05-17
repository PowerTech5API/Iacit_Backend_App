from pymongo import MongoClient
import subprocess
import bson
from bson.objectid import ObjectId


def Conexaolocal():
    # Conectando ao banco de dados MongoDB local
    client = MongoClient('localhost', 27017)


    # Selecionando o banco de dados e coleção
    db = client['school']
    collection = db['scores']

    # Obtendo todos os documentos da coleção
    documents = collection.find()

    # Iterando sobre os documentos e imprimindo seus conteúdos

def mongodump():
    m="C:/Program Files/MongoDB/Server/6.0/backup/mongodump.exe"
    uri="mongodb+srv://powertechfatec2:BvIFSBKvzuRA05oM@cluster0.gcvjnlu.mongodb.net/test?retryWrites=true&w=majority"
    subprocess.run([m, "--uri",uri ])

def mongorestore():
    m="C:/Program Files/MongoDB/Server/6.0/backup/mongorestore.exe"
    uri="mongodb+srv://powertechfatec2:BvIFSBKvzuRA05oM@cluster0.gcvjnlu.mongodb.net/test?retryWrites=true&w=majority"
    subprocess.run([m, "--uri",uri ,"dump/test"])


def Conexao(bdN,collectionN):
    
    client = MongoClient("mongodb+srv://powertechfatec2:BvIFSBKvzuRA05oM@cluster0.gcvjnlu.mongodb.net/?retryWrites=true&w=majority")
    db = client[bdN]    
    collection=db[collectionN]
    return(collection)

    
# Caminho para o arquivo BSON
caminho_arquivo = "dump/test/users.bson"

# Abrir o arquivo BSON
with open(caminho_arquivo, "rb") as arquivo:
    # Ler os dados do arquivo
    dados_bson = arquivo.read()

    # Decodificar o BSON
    documento_decodificado = bson.decode_all(dados_bson)


client = MongoClient("mongodb+srv://lucca:11@cluster0.tr11zxk.mongodb.net/lgpd?retryWrites=true&w=majority")
lgpd = client["lgpd"]
banidos=lgpd["userlogmodels"]
idbanidos=[]
for doc in banidos.find():
    idbanidos.append(doc["users"])
idbanidos=idbanidos[0]
# users=test["users"]
# print(users.find_one({'_id': ObjectId(a[0][0])}))
#mongodump()
#mongorestore()

users=documento_decodificado


gindex=[]
for index,doc in enumerate(users):
    for idbanido in idbanidos:
       # print("iddoc:",doc['_id'],"-----idbanidos",idbanido)
        if doc['_id']== idbanido:
            gindex.append([idbanido,index])

print(idbanidos)
print("======================")
print(gindex)
print("======================")
# for banindo in gindex:
#     users[banindo[1]]={'_id': banindo[0], 'name': 'deletado', 'password': 'deletado', 'isAdmin': False, 'isSendEmail': False, '__v': 0}
for banindo in gindex:
    users.pop(banindo[1])
 
print(users)
print("======================")
juntando=b''
codificando=[bson.BSON.encode(x) for x in users]
for doc in codificando:
    juntando=juntando+doc
print(juntando)


print("======================")
with open(caminho_arquivo, "wb") as arquivo:
    arquivo.write(juntando)

mongorestore()



