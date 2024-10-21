docker pull victorbenoiston/image-optimization-api
docker pull victorbenoiston/image-optimization-api:1.1

#Otimização de imagem API

![version](https://img.shields.io/badge/version-1.1-brightgreen)
![Yarn](https://img.shields.io/badge/Yarn-1.22.19-2C8EBB?logo=yarn&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-1.22.19-2C8EBB?logo=docker&logoColor=white)

# Pré-Requisitos:
* Docker e Docker compose instalados no sistema;

# Rodando o projeto:
* Opção 1 - Clonando o repositório e buildando localmente.


1) Clone o repositório localmente
```bash
git clone https://github.com/VictorBenoiston/image-optimization.git
```
2) Mude para o diretório
```bash
git clone https://github.com/VictorBenoiston/image-optimization.git
cd image-optimization
```
3) Crie uma pasta .env no rootDir, e adicione: 
```bash
AWS_MULTI_REGION_ACCESS_POINT_ARN=your-arn-here
```
4) Builde e rode os containers:
```bash
docker-compose build
docker-compose up
```
5) Acesse a aplicação:
```bash
http://localhost:3000
```

* Opção 2 - Utilizando docker hub:

1) Faça o pull da imagem:
```bash
docker pull victorbenoiston/image-optimization-api:1.1
```

2) Confirme os containers (opcional)
```bash
docker images
```

3) Execute o docker compose
```bash
docker-compose up
```

