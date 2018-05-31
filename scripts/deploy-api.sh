#! /bin/bash

echo '###### Starting API deployment! ######'

cd api

cat <<EOF > env.yml
dev:
    DYNAMODB_TABLE: "dev-heroes"

EOF

git add -f env.yml
git add -f node_modules
git commit -am "local commit to expose to serverless" --quiet

sls deploy --stage dev --verbose --force

echo '###### API deployment finished! ######'