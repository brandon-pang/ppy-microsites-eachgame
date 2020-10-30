app.filter('time', function() {
    return function(value) {
        var h = Math.floor(value / 60);          
        var m = value % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }
});