import { server, redisClient } from './server/Server';

const startup = async () => {
    try {
        await redisClient.ping();
        console.log('Redis connected successfully');
        const port = process.env.PORT || 3000;
        server.listen(port, () => {
            console.log(`Server Running on port ${port} ! ✅`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startup();

process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await redisClient.quit();
    process.exit(0);
});
