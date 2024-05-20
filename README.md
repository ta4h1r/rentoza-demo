## Running the stack
1. Clone this repo
2. `cd` into the root folder (containing the `docker-compose.yml`) and run `
docker-compose up -d --build` (If you have not got docker/compose installed, visit https://docs.docker.com/compose/install/ for help)
1. If you correctly built all three containers, you will see a web-UI when you navigate to `localhost:8080`

## Interacting with the app 
You may use the provided UI to keep track of several bar patron's tallys. When a patron's saturation level increases beyond 1, their listing is highlighted in red. If you add more drinks to their tally, the saturation will increase. With time, the patron's saturation decreases and the listing color turns black again.

NB: If you hit a rate limit in the backend, just wait for 10 seconds (perks of open APIs). 