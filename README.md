# NodeJS-Quickstart
Basic Node.js web application

## Setup

```sh
npm install -g yarn  # install yarn
yarn                 # install dependencies
```

Using MongoDB? It should be running at localhost:27017

## Run

```sh
yarn run all   # run server and watch (server + client) changes
```

#### MANUAL RELOADING
- templates load pre-compiled `bundle.js` (file-written)

```bash
# Production (build once - no watch)
yarn run build
yarn start

# Manual client reloading (F5 refresh)
yarn run build-and-watch    # bundle client-side + watch client changes only
yarn run server             # run server and watch server changes only
```

#### HOT RELOADING
- templates load webpack-dev-server's `bundle.js` (in-memory)

```bash
# Hot client reloading (iframed)
# - safer when our app uses WebSockets
yarn run webpack-dev-iframe
yarn run server
firefox localhost:8081/webpack-dev-server/

# Hot client reloading (inline)
# - could be buggy if app also uses WebSockets (conflicts)
yarn run webpack-dev-inline
yarn run server
firefox localhost:8080

```

## DEV

### Yarn tutorial
```bash
yarn                       # Install all dependencies
yarn init                  # Starting a new project
yarn add [package]         # Add dependency
yarn add --dev [package]   # Add dev dependency
yarn remove [package]      # Remove dependency
yarn outdated              # Check for outdated deps
yarn upgrade [package]     # Update dependency
yarn upgrade               # Update all dependencies
```

## Screenshots

![01](https://github.com/Dalimil/NodeJS-Quickstart/blob/master/docs/screenshots/demo.png)
