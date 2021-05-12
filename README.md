# clubs-website

## Project setup

```shell script
yarn install
```

### Compiles and hot-reloads for development

```shell script
yarn dev
```

### Compiles and minifies for production

```shell script
yarn build
```

### Lints and fixes files

```shell script
yarn lint
```

### Deploys to GitHub Pages

```shell script
yarn deploy
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Development

### Branches

There are 3 main branches on this repository: `dev`, `master`, and `gh-pages`. The `dev` branch is where the main development occurs; this branch does not get deployed to GitHub pages. The `master` branch contains the most recent code that has been deployed to GitHub Pages (using an automated GitHub action). The `gh-pages` branch contains the built and minified code that is hosted by GitHub actions; you should not need to interact with this branch. For certain features/development-in-progress, it is recommended to create your own branch before merging with the `dev` branch to avoid breaking things for other developers.
