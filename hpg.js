function enQuery(data) {
    const ret = [];
    for (let d in data) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
    return ret.join("&");
}


function getPrice(requestBody) {

    var product = requestBody.product;
    var domain = requestBody.domain;

    switch (product) {
        case 'gd':
            switch (domain) {
                case 'nz':
                    return '35.00';
                case 'rs':
                    return '35.00';
                case 'best':
                    return '25.00';
            }
            break;
        case 'od':
            switch (domain) {
                case 'nz':
                    return '2.00';
                case 'rs':
                    return '3.00';
                case 'best':
                    return '1.00';
            }
            break;
    }

}


async function jlfakaapi(requestBody) {

    var url = 'http://116.62.128.125:233/pay/';

    var price = getPrice(requestBody);
    var payment_method = requestBody.payment_method;

    switch (payment_method) {
        case 'alipay':
            url += 'a/';
            break;
        case 'wechat':
            url += 'w/';
            break;
    }
    switch (price) {
        case '35.00':
            url += '5/7';
            break;
        case '25.00':
            url += '5/5';
            break;
        case '3.00':
            url += '1/3';
            break;
        case '2.00':
            url += '1/1';
            break;
        case '1.00':
            url += '1/1';
            break;
    }
    console.log(url);

    var response = await fetch(url, {
        method: 'GET'
    });
    var results = await response.json();
    console.log(results);

    if (results.method == payment_method) {
        return results;
    } else {
        console.log('jlfakaapi error');
        return false;
    }
}

/**
 * Respond to the request
 * @param {Request} request
 */

async function handleRequest(request) {

    let url = new URL(request.url);
    let path = url.pathname;

    switch (path) {

        case '/getPrice':
            var requestBody = await request.json();
            console.log(requestBody);

            var price = '￥ ' + getPrice(requestBody);
            return new Response(JSON.stringify({
                'price': price
            }));
            break;

        case '/checkout':
            var requestBody = await request.json();
            console.log(requestBody);

            var order_info = await jlfakaapi(requestBody);

            if (order_info == false) {
                return new Response('ERROR');
            } else {
                return new Response(JSON.stringify(order_info));
            }
            break;
        default:
            return new Response(enroll, {
                status: 200,
                headers: {
                    "Content-Type": "text/html; charset=utf-8"
                }
            });
            break;
    }
}



addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})
