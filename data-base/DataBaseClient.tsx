import {createClient} from '@libsql/client'

async function getDataBaseClient() {
    const client = createClient({
        url: "libsql://task-list-m4rkdv.aws-us-east-1.turso.io",
        authToken: process.env.TURSO_AUTH_TOKEN!
    });
    return client;
}

export default getDataBaseClient