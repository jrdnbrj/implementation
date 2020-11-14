class Http {
    static instance = new Http()

    get = async url => {
        try {
            let req = await fetch(url)
            return await req.json()
        } catch (err) {
            console.log('error get', err)
            throw Error(err)
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, { method: 'POST', body })
            return await req.json()
        } catch (err) {
            console.log('error post', err)
            throw Error(err)
        }
    }
}

export default Http