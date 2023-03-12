export const getHostInformation = () => {
    return 'http://45.8.249.57'
}

export const POSTCORS = (data) => {
    return ({
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
