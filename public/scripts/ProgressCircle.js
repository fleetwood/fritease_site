(function ($) {

    $.fn.progressCircle = function (options) {
        var settings = $.extend({
            baseCSS: 'c100 bitty',
            thresholds: [
                [90, 'red'],
                [70, 'orange'],
                [0, '']
            ],
            showCurrent: true,
            currentHtml: '.circle-percent',
            max: 240
        }, options);

        var current = 0;

        const percent = () => {
            return Math.floor((current / settings.max)*100);
        }

        const threshold = () => {
            return settings.thresholds.find(t => percent()+1 > t[0])[1];
        }

        this.setCurrent = (val) => {
            current = val;
            this.attr('class', `${settings.baseCSS} ${threshold()} p${percent()}`);
            if (settings.showCurrent) {
                $(settings.currentHtml).html(`${current}/${settings.max}`);
            }
        }

        return this;

    };

}(jQuery));
