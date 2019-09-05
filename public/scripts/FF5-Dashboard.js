(function ($) {
    $.fn.ff5Dashboard = function (options) {
        var settings = $.extend({
            url: 'api/ui/ff5'
        }, options);

        const render = (val) => {
            this.html(val);
            OnRender.watchRender(FF5.ff5attr, () => {
                FF5.updateButtons();
            }); 
        }

        this.update = (options) => {
            let users = FF5.all;
            $.ajax({
                url: settings.url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ff5:true, users: users}),
                error: (err) => render(err.statusText),
                success: (result) => render(result)
            });
        }

        document.addEventListener(FF5.Events.updated, (e) => {
            this.update();
        });

        this.update();

        return this;
    };

}(jQuery));