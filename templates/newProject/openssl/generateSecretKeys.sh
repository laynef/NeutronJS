NAME=$1
SECURITY=($2 | 1024)
openssl genrsa -out $NAME.pem $SECURITY
