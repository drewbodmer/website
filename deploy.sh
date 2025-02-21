#/bin/bash

rm -rf ./dist && npm run build && echo "copying files" && aws s3 cp ./dist s3://drewbodmer.com/ --recursive --profile personal

