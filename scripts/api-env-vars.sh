cat <<EOF > env.yml
prod:
    DYNAMODB_TABLE: "prod-heroes"

EOF

git add -f env.yml
git add -f node_modules
git commit -am "local commit to expose to serverless" --quiet