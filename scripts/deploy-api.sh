#! /bin/bash

echo '###### Starting API deployment! ######'

cd api
sls deploy --stage prod --verbose --force

echo '###### API deployment finished! ######'