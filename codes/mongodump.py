import subprocess


def mongodump():
    m="C:/Program Files/MongoDB/Server/6.0/backup/mongodump.exe"
    uri="mongodb+srv://powertechfatec2:BvIFSBKvzuRA05oM@cluster0.gcvjnlu.mongodb.net/test?retryWrites=true&w=majority"
    subprocess.run([m, "--uri",uri ])
mongodump()