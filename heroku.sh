#!/bin/bash
docker login --username=_ --password=0b713543-b112-4314-9542-99edc61534ab registry.heroku.com
docker tag api registry.heroku.com/advanced2heroku/web
docker push registry.heroku.com/advanced2heroku/web
