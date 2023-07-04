const responseToViewModel = (res) => {
    return {
        total: res.length,
        results: res
    }
}

module.exports = {
    responseToViewModel
}