require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class Api {
    /* HEADERS */
    static headers() {
        let interval = _spFormDigestRefreshInterval || 1440000;
        UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, interval);

        return {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'dataType': 'json',
            "X-RequestDigest": document.getElementById('__REQUESTDIGEST').value
        }
    }

    static postHeaders() {
    	let interval = _spFormDigestRefreshInterval || 1440000;
    	UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, interval);

    	return {
    		'Accept': 'application/json;odata=verbose',
    		'Content-Type': 'application/json;odata=verbose',
    		'dataType': 'json',
    		"X-RequestDigest": document.getElementById('__REQUESTDIGEST').value,
    		"X-HTTP-Method": "MERGE",
    		"If-Match": "*"
    	}
    }	

    static fileHeaders(size) {
        let interval = _spFormDigestRefreshInterval || 1440000;
        UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, interval);

        return {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            "X-RequestDigest": document.getElementById('__REQUESTDIGEST').value,
            "content-length": size
        }
    }

    /* METHODS */
    static get(url) {
        return this.xhr(url, null, 'GET');
    }
    static post(url, params, merge) {
        return this.xhr(url, params, 'POST', merge);
    }
    static postFile(url, data, size) {
        return this.xhrFile(url, data, size, 'POST');
    }
    static delete(url) {
        return this.xhr(url, null, 'DELETE');
    }

    /* FETCH ACTIONS */
    static xhr(url, params, verb, merge) {
        let options = Object.assign({method: verb}, params ? { body: JSON.stringify(params) } : null );
            options.headers = merge ? Api.postHeaders() : Api.headers();
            options.credentials = 'same-origin';

            return fetch(url, options).then( resp => {
            let json = resp.json();
            if(resp.ok) {
                if(resp.status === 204) {
                    return new Promise(function(resolve, reject){
                        return resolve({
                            status: 'success',
                            d: null
                        })
                    }) ;
                }
                return json;
            }
            return json.then(err => {throw err});
        }).then( json => json );
    }
    static xhrFile(url, data, size, verb,) {
        let options = Object.assign({ method: verb }, { body: data }, { processData: false }, { async: false });
        options.headers = Api.fileHeaders(size);
        options.credentials = 'same-origin';

        return fetch(url, options).then( resp => {
            let json = resp.json();
            if(resp.ok) {
                if(resp.status === 204) {
                    return new Promise(function(resolve, reject){
                        return resolve({
                            status: 'success',
                            d: null
                        })
                    }) ;
                }
                return json;
            }
            return json.then(err => {throw err});
        }).then( json => json );
    }
}