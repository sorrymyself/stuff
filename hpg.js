var loc = window.location.href + '';
if (loc.indexOf('http://') == 0) {
    window.location.href = loc.replace('http://', 'https://');
}

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
    easing: 'easeOutQuad'
});

////////////////////////////////////////
