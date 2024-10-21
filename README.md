<p align='center'>
<img src="https://firebasestorage.googleapis.com/v0/b/crwn-clothing-react-app.appspot.com/o/Inserir_um_ti%CC%81tulo-removebg-preview.png?alt=media&token=afe41da6-2e8d-4c40-9830-d49b9378cc33" width='500px'></img>
</p>

# Otimização de imagem API

![version](https://img.shields.io/badge/version-1.1-brightgreen)
![Yarn](https://img.shields.io/badge/Yarn-1.22.19-2C8EBB?logo=yarn&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-1.22.19-2C8EBB?logo=docker&logoColor=white)
[![Postman](https://img.shields.io/badge/Documentation-1.1-2C8EBB?logo=postman&logoColor=white)
](https://documenter.getpostman.com/view/39141157/2sAXxY2nVN)

Esta API conta com:
* Utilização de multi-region access point (bucket), com a utilização da disponibilidade mais geograficamente próxima do usuário ✅;
* Utilização de redis para armazenamento em cache, evitando re-processamento da mesma query requisitada ✅;
* Docker compose do servidor node, nginx, e redis ✅

Observação: para alterar o arn do bucket (coloquei um próprio para fins de teste), basta alterar a variável de ambiente 'AWS_MULTI_REGION_ACCESS_POINT_ARN='


# Pré-Requisitos:
* Docker e Docker compose instalados no sistema;

# Rodando o projeto:

1) Clone o repositório localmente
```bash
git clone https://github.com/VictorBenoiston/image-optimization.git
```

2) Clone a imagem do docker hub
```bash
docker pull victorbenoiston/image-optimization-api:1.1
```

3) Mude para o diretório
```bash
cd image-optimization
```

<!-- 3) Crie uma pasta .env no rootDir, e adicione: 
```bash
AWS_MULTI_REGION_ACCESS_POINT_ARN=your-arn-here
# Para exemplificação: <AWS_MULTI_REGION_ACCESS_POINT_ARN=arn:aws:s3::396608796594:accesspoint/mhcj7e7sny9ck.mrap>
``` -->

4) Rode o comando docker-compose up
```bash
docker-compose up
```

5) Acesse a aplicação:
```bash
http://localhost:3000/images/lenna.png?w=400&gray=0&h=600&q=100&fm=jpg
```

# Documentação:
https://documenter.getpostman.com/view/39141157/2sAXxY2nVN

# Considerações finais:

-> Nginx: 

Neste exemplo, fizemos uso do nginx como fonte externa para usuários, consequentemente, não foi configurado nenhum certificado ssl
    - Ações possíveis: Utilizar um certificadco público gratuito expedido pela própria amazon (checar serviço: certificate manager - AWS>)
    - Conclusão: Em uma arquitetura de produção, antes do acesso ao proxy reverso do nginx (e seus respectivos load balancers), seria ideal configurar um load balancer elástico com a devida certificação SSL, para suporte de requisições HTTPS.

Neste exemplo também foi configurado o proxy reverso (nginx), porém, para produção levar em consideração os comentários no arquivo /nginx.conf, para obter o resultado esperado no desafio (Acessando: https://images.weedo.it/pictures/clovis.png
Será buscado no bucket: /pictures/clovis.png). Para obter tal resultado localmente, seria necessário alterar o arquivo etc/hosts.

// Esta configuração é ideal para ec2, ou outros serviços de hospedagem de aplicações tendo em sua frente um elastic load balancer (custo baixo), com seu devido certificado ssl (grátis).

// Para um produto, caso o nginx fosse a porta de entrada para a aplicação, o ideal seria proteger o próprio nginx com o certificado ssl.

```bash
server {
    listen 80;  // A conexão não é protegida, é http, sem certificado ssl.
    server_name images.weedo.it;  // url de entrada (o domínio precisa existir)

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://localhost:3000;  # url de produção da api
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_hide_header X-Powered-By;
    }
}
```