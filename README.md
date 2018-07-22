# mocha_ratemyagent
this repository is POC for API test using mocha

# Pre-requisite
make sure node js is installed in your machine.

# Running test
1. first of all you need to insall dependencies,
   please run command --> "npm install" in you project directory to install all dependencies.
   
2. To run test on any specific environment, you just need to invoke config.json file in your cli commands while running test.

eg .

To run test on PROD AUS environment , use following command -->
mocha test\user_test.js --config=conf/prod_aus_config.json --reporter spec

To run test on PROD USA environment , use following command -->
mocha test\user_test.js --config=conf/prod_usa_config.json --reporter spec

