/**
 * @param {Object} options
 * @param {String} options.url Url of the stream
 * @param {String} options.loader Unique id of the loading div (Optional)
 * @param {String} options.content Unique id of the content div (Optional)
 * @param {Number} options.limit Number of items displayed (Optional, Default: 10)
 */
(function ($) {
    $.fn.uiStream = function (options) {
        var settings = $.extend({
            limit: 10
        }, options);

        // if(settings.loader) {
        //     const loader = $(this).find('[id="[LOADER_ID]"]');
        //         loader.attr('id',settings.loader);
        // }
        // if(settings.content) {
        //     const content = $(this).find('[id="[CONTENT_ID]"]')
        //         content.attr('id',settings.content);
        // }

        const render = (val) => {
            this.html(val);
            // showLoader(false);
        }

        const showLoader = (loading) => {
            const hidden = 'u-hiddenVisually';
            if(loader && content) {
                const set = loading ? [loader, content] : [content, loader];
                set[0].removeClass(hidden);
                set[1].addClass(hidden);
            } else if (loader) {
                if(loading) loader.addClass(hidden);
                else loader.removeClass(hidden);
            }
        }

        this.getStream = () => {
            // showLoader(true);
            $.ajax({
                url: settings.url,
                data: { ...settings },
                error: (err) => render(err.statusText),
                success: (result) => render(result)
            });
        }

        return this;
    };

}(jQuery));