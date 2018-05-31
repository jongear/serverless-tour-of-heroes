#! /bin/bash

echo '###### Starting API deployment! ######'

cd api
npm run-script sls deploy -- --stage dev --verbose --force

echo '###### API deployment finished! ######'