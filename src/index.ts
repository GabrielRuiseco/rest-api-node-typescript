import server from "./server";
import colors from 'colors'

server.listen(process.env.PORT || 4000, () => {
    console.log(colors.cyan.bold(`REST API en el puerto 4000`))
})