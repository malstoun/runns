# runns

## How to use

First of all, we need to install runns:

```
yarn add runns
```

After that we can use it in our `package.json` file:

```
{
	"scripts": {
		"start": "runns index.js"
	},
	"runns": {
		"start": {
			"env" {
				"NODE_ENV": "production"
			}
		}
	}
}
```
