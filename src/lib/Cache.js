import Redis from 'ioredis';


class Cache {
    constructor(){
        this.redis = new Redis(process.env.REDIS_URL, {
            keyPrefix: 'cache:'
        });
    }

    set(key, value){
        return this.redis.set(key, JSON.stringify(value), 'EX', 60*60*24);
    }

    async get(key){
        const cached = await this.redis.get(key);
        return cached ? JSON.parse(cached) : null;
    }

    invalidate(key){
        return this.redis.del(key);
    }

    async invalidatePrefix(prefix){
        const keys = await this.redis.keys(`cache:${prefix}*`);
        const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));
        if(keysWithoutPrefix.length > 0){
            return this.redis.del(keysWithoutPrefix);
        }
    }
}

export default new Cache();
