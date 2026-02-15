import server from "./src/server.ts"

const myServer = new server()

myServer.run()

//process.on("SIGINT", myServer.close)
//process.on("SIGTERM", myServer.close)