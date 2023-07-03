# NestJS REST API Gateway + gRPC microservices

This project is a [monorepo](https://gomonorepo.org/) containing a REST API gateway with [gRPC](https://grpc.io/) back-end microservices all written using the NestJS Framework and TypeScript. This project is mainly used for learning/trial purposes only.

## Architecture Overview

The REST API acts as a gateway/proxy for the different microservices it exposes. The controllers of the REST API make calls to the gRPC servers/microservices in the back-end. The gRPC microservices then handles the request to connect to databases or any other service it needs to serve requests.

### Diagram

A diagram of the architecture is shown below.

![Architecture Diagram](https://raw.githubusercontent.com/benjsicam/nestjs-rest-microservices/master/docs/img/archi-diagram.png)

### Design Patterns

This architecture implements the following Microservice Design Patterns:

1. [Microservice Architecture](https://microservices.io/patterns/microservices.html)
2. [Subdomain Decomposition](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html)
3. [Externalized Configuration](https://microservices.io/patterns/externalized-configuration.html)
4. [Remote Procedure Invocation](https://microservices.io/patterns/communication-style/rpi.html)
5. [API Gateway](https://microservices.io/patterns/apigateway.html)
6. [Database per Service](https://microservices.io/patterns/data/database-per-service.html)

## Layers

### API Layer

[NestJS + Express](https://nestjs.com/) acts as the API Layer for the architecture. It takes care of listening for client requests and calling the appropriate back-end microservice to fulfill them.

### Microservice Layer

[gRPC](https://grpc.io/) was chosen as the framework to do the microservices. [Protocol buffers](https://developers.google.com/protocol-buffers/) was used as the data interchange format between the client (REST API) and the server (gRPC microservices). NestJS is still the framework used to create the gRPC Microservices.

### Persistence Layer

PostgreSQL is used as the database and Sequelize is used as the Object-Relational Mapper (ORM).

## Deployment

Deployment is done with containers in mind. A Docker Compose file along with Dockerfiles for each project are given to run the whole thing on any machine. For production, it's always recommended to use [Kubernetes](https://kubernetes.io/) for these kinds of microservices architecture to deploy in production. [Istio](https://istio.io/) takes care of service discovery, distributed tracing and other observability requirements.

## Project Structure

```
.
├── _proto
├── api-gateway
│   └── src
│       ├── _proto
│       ├── users
│       └── utils
├── docs
├── microservices
│   └── users-svc
│       └── src
│           ├── _proto
│           └── users
└── scripts
└── shared
```

### Project Organization

1. `_proto` - This directory consists of all the gRPC Service Definitions/Protocol Buffers.

2. `api-gateway` - This directory consists of the API Gateway project. All code relating to the API Gateway resides here.

3. `docs` - This directory consists of all files relating to documentation. The OpenAPI Specification for the REST API and the gRPC Service Definitions/Protocol Buffers documentation can be found here.

4. `microservices` - This directory consists of all microservice projects.

5. `microservices/users-svc` - This directory consists of all files/code relating to the Users Microservice project.

6. `scripts` - This directory consists of shell scripts that automates building and running the whole project.

## How to Run

1. System Requirements - must be Linux/Mac
- [Node.js](https://nodejs.org/en/) - v12 Recommended
- [Docker](https://docs.docker.com/install/) - latest
- [Docker Compose](https://docs.docker.com/compose/install/) - latest

2. On the Terminal, go into the project's root folder (`cd /project/root/folder`) and execute `pnpm start`. The start script will install all npm dependencies for all projects, lint the code, compile the code, build the artifacts (Docker images) and run them via `docker-compose`.

3. Once the start script is done, the API Gateway will listening on [http://localhost:3000](http://localhost:3000)

4. To test the API, head to the Swagger UI running at [http://localhost:8080](http://localhost:3000)

![REST UI](https://raw.githubusercontent.com/benjsicam/nestjs-rest-microservices/master/docs/img/rest-ui.png)

## Roadmap

### General

- [x] Use RxJS Observables instead of Promises
- [ ] Add Integration Tests
- [ ] Add CI/CD Pipeline
- [ ] Add Kubernetes Manifests
- [x] Pre-populate DBs
- [ ] Distributed Tracing
- [x] Add TypeORM

### API Gateway

- [ ] Add authentication
- [ ] Add authorization
- [ ] Add event sourcing
- [x] Add request/input data validation
- [ ] Add health checks
- [x] Improve error handling
- [x] Add Express Adapter
- [x] Integrating with Newrelic APM
- [x] Add Versioning support
- [x] Add Rate Limiter
- [x] Implement Swagger OpenAPI support
- [x] Implement Translation i18n

### Microservices

- [ ] Add caching
- [x] Improve error handling
