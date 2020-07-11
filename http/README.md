# Pipedrive API

## Setup

Plugin: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Add next code to the `.vscode/settings.json` file:

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
        "dev_url": "api.openweathermap.org/data/2.5/weather",
    },
  }
}
```