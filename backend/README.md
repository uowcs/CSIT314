## Getting Started

0. Ensure you have Go installed & download task <https://taskfile.dev/installation/>
1. Download the needed packages ```task install```
2. Create and populate the ```app.env``` file with the needed environment variables, can be found in ```app.env.example```
3. Start the dev server ```task dev```
4. View the API docs at <http://localhost:8080/swagger>

 Note: for Windows users, update your `bin` & `cmd` string to include the `.exe` extension in .air.toml file before running `task dev`

```toml
bin = "./tmp/main.exe"
cmd = "go build -o ./tmp/main.exe cmd/http/main.go"
```

## Deployment

Railway is the recommended deployment platform, but any platform that supports Docker should work.
