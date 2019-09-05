/**
 * @param {Object} options
 * @param {String} options.url Url of the stream
 * @param {String} options.loader Unique id of the loading div (Optional)
 * @param {String} options.content Unique id of the content div (Optional)
 * @param {Number} options.limit Number of items displayed (Optional, Default: 10)
 */
(function ($) {
    $.fn.profileCard = function (options) {
        var settings = $.extend({
            target: null,
            active: false,
            limit: 10
        }, options);

        const render = (val) => {
            this.html(val);
            show(true);
            OnRender.watchRender(FF5.ff5attr, () => {
                position();
                FF5.updateButtons();
            });
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

        const show = (show) => {
            settings.active = show;
            settings.target = settings.active ? settings.target : null;
            this.attr('style', settings.active ? `top: ${settings.y}px;left: ${settings.x}px;opacity: 1;display: block;` : '');
        }

        const position = () => {
            if (settings.active && settings.target) {
                const half = (a,b) => {
                    return Math.floor(a+((b-a)/2));
                }
                let rect = settings.target.get(0).getBoundingClientRect();
                    settings.x = rect.left; //Math.floor(rect.right -((rect.right - rect.left)/2));
                    settings.y = $(document).scrollTop()+rect.bottom; //Math.floor(rect.bottom -((rect.bottom - rect.top)/2));
                show(settings.active);
            }
        }

        /**
         * @param {Object} options Provide the id or screen name
         * @param {Number} options.user_id t.attr('data-user-id')
         * @param {String} options.screen_name t.attr('data-user-screen-name')
         */
        this.getStream = (options) => {
            // showLoader(true);
            $.ajax({
                url: settings.url,
                data: { ...options },
                error: (err) => render(err.statusText),
                success: (result) => render(result)
            });
        }

        $('body').on('click', settings.selector, (e) => {
            const t = settings.target = $(e.target);
            this.getStream({user_id: t.attr('data-user-id'), screen_name: t.attr('data-user-screen-name')});
        });

        $('body').on('click', '.profile-card-dismiss', (e) => {
            show(false);
        });

        return this;
    };

}(jQuery));