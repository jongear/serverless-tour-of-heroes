#! /bin/bash

echo '###### Starting API deployment! ######'

cd api
sls deploy --stage dev --verbose --force

echo '###### API deployment finished! ######'