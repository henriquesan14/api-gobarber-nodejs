import Redis from 'ioredis';


class Cache {
    constructor(){
        this.redis = new Redis({
            host: 'ec2-34-203-26-254.compute-1.amazonaws.com',
            port: 8019,
            password: 'p6b954d41803cc224607065da023563e2932e7dd7f384ae99148c56776d2b02f8',
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
        return this.redis.del(keysWithoutPrefix);
    }
}

export default new Cache();
