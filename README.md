<p align='center'>
<img src="https://drive.google.com/file/d/1ftvL5pM7p6tvaFX02l4LBoa0FPm5AgPp/view?usp=sharing" width='500px'></img>
</p>

# Otimização de imagem API

![version](https://img.shields.io/badge/version-1.1-brightgreen)
![Yarn](https://img.shields.io/badge/Yarn-1.22.19-2C8EBB?logo=yarn&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-1.22.19-2C8EBB?logo=docker&logoColor=white)
[![Postman](https://img.shields.io/badge/Documentation-1.1-2C8EBB?logo=postman&logoColor=white)
](https://documenter.getpostman.com/view/39141157/2sAXxY2nVN)


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