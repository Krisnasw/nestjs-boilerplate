#!/bin/bash

cd api-gateway && pnpm run build && cd -
cd microservices/users-svc && pnpm run build && cd -