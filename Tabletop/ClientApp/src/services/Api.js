export default class Api {

    static __urls = {
        create: '/api/table/create',
        join: '/api/table/join',
    }

    static create(id) {
        return fetch(Api.__urls.create, { method: 'post', body: { id } });
    }

    static async join(id, password) {
        return await fetch(Api.__urls.join, { method: 'post', body: JSON.stringify({ id, password }) });
    }
}