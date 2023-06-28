!/bin/bash

cd api-gateway && pnpm run lint && cd -
cd microservices/users-svc && pnpm run lint && cd -