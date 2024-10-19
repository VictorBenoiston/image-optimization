import { server } from './server/Server';

server.listen(process.env.PORT || 3000, () => 
    console.log(`Server Running on port ${process.env.PORT || 4040} ! ✅`))
