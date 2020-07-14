'use strict';

// app.directive('tb', function($compile) {
//   	return {
// 		restrict: 'E',
// 		link: function(scope, el, attrs) {
// 			var url = attrs.url;
// 			el.html('<svg x="0px" y="0px" width="90.1px" height="100px" viewBox="3.2 -26.9 90.1 100"><g id="white-border"><path d="M68.4,68.8h-58c-3.9,0-6.8-3.3-6.6-7l-0.5,2.8c-0.8,4.4,2.6,8.4,7.1,8.4h56.4c6.2,0,11.5-4.4,12.5-10.5l0.5-2.8C78.5,65,73.8,68.8,68.4,68.8z"/><path d="M84.6-26.9H30c-6.2,0-11.5,4.4-12.5,10.5L17-13.9c1.3-5.1,5.9-8.7,11.2-8.7h56.5c4.7,0,8.4,4.1,7.8,8.8l0.5-2.9C94-22.1,90-26.9,84.6-26.9z"/></g><path id="shape" d="M68.4,68.8h-58c-4.1,0-7.2-3.7-6.5-7.7l13-74.1c1-5.5,5.8-9.6,11.4-9.6h56.5c4.9,0,8.6,4.4,7.8,9.2L79.9,59.2C78.9,64.8,74,68.8,68.4,68.8z"/></g><defs><pattern id="imgpattern" x="0" y="0" width="1" height="1"><image width="90.1" height="100" xlink:href="' + url + '"/></pattern></defs><path fill="url(#imgpattern)" d="M68.4,68.8h-58c-4.1,0-7.2-3.7-6.5-7.7l13-74.1c1-5.5,5.8-9.6,11.4-9.6h56.5c4.9,0,8.6,4.4,7.8,9.2L79.9,59.2C78.9,64.8,74,68.8,68.4,68.8z"/></svg>');
// 			$compile(el.contents())(scope);
// 		}
// 	}
// });

app.directive('tooltip', function () {
	return {
		restrict: 'A',
		link: function link(scope, el, attrs) {
			$(el).hover(function () {
				// on mouseenter
				$(el).tooltip('show');
			}, function () {
				// on mouseleave
				$(el).tooltip('hide');
			});
		}
	};
});

app.filter('time', function () {
	return function (value) {
		var h = Math.floor(value / 60);
		var m = value % 60;
		h = h < 10 ? '0' + h : h;
		m = m < 10 ? '0' + m : m;
		return h + ':' + m + 'h';
	};
});
//# sourceMappingURL=directive.js.map
