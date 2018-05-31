#! /bin/bash

echo '###### Starting API deployment! ######'

cat <<EOF > api/env.yml
dev:
    DYNAMODB_TABLE: "dev-heroes"

EOF

git add -f api/env.yml
git add -f api/node_modules
git commit -am "local commit to expose to serverless" --quiet

cd api
sls deploy --stage dev --verbose --force

echo '###### API deployment finished! ######'