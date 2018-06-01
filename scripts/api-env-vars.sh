cat <<EOF > env.yml
dev:
    DYNAMODB_TABLE: "dev-heroes"

EOF

git add -f env.yml
git add -f node_modules
git commit -am "local commit to expose to serverless" --quiet