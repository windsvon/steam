exports.loadCss = (url) ->
    return new Promise (resolve, reject) ->
        element = document.createElement('link')
        element.type = 'text/css'
        element.rel = 'stylesheet'
        element.onload = ->
            resolve(url)
        element.onerror = ->
            reject(url)
        element.href = url
        document.head.appendChild(element)





