/**
 * @param {Object} options
 * @param {String} options.modalUrl Url of the modal ui api
 * @param {String} options.imageUrl Url of the image api
 * @param {String} options.contentContainer Unique id of the content div
 * @param {String} options.imageContainer Unique id of the imageContainer div
 * @param {String} options.textForm Unique id of the textForm form
 * @param {String} options.loader Unique id of the loading div (Optional)
 */
(function ($) {
    $.fn.tweetStorm = function (options) {
        var settings = $.extend({
            limit: 10,
            promptImage: {
                date: '',
                imageUrl: '',
                theme1: '',
                theme2: ''
            },
            promptImg: '#prompt-image'
        }, options);

        const defaultText = 
`#FriTease [date]
THEME 1: "[THEME_1]"
THEME 2: "[THEME_2]"

#FF 5 peeps to follow 👁👁:
[FF1]
[FF2]
[FF3]
[FF4]
[FF5]

L/RT your favorites!
@PromptList @PromptAdvant @thewritelist @writevent`
        
        ////////////////////////////////
        // SETUP
        const urlParams = new URLSearchParams(window.location.search)
            , fromDate = urlParams.get('fromDate')
            , contentContainer = $(settings.contentContainer)
            , params = {
                imageUrl: () => $(settings.promptImg).attr('src'),
                statusText: () => $(settings.textForm).val(),
                scheduled_date: () => $(settings.promptImg).attr('data-prompt-date') || nextFriday()
            };

        ////////////////////////////////
        // METHODS
        const nextFriday = (format = 'MM/DD/YYYY') => {
            let date = moment()
            while (date.day() !== 5) {
                date.add(1, 'd');
            }
            return date.format(format);
        }

        const render = (val) => {
            contentContainer.html(val);
            OnRender.watchRender(settings.textForm, () => {
                $(settings.textForm).keyup(this.setCurrent());
                showModal(true);
                getImage();
            });
        }

        const renderImage = (val) => {
            $(settings.imageContainer).html(val);
            OnRender.watchRender(settings.imageContainer,() => {
                this.setCurrent();
            });
        }

        const showModal = (show) => {
            this.attr('style', show ? 'z-index: 4002; display: block;' : '');
        }

        const getImage = () => {
            $.ajax({
                url: settings.imageUrl,
                data: { date: params.scheduled_date() },
                error: (err => render(err.statusText)),
                success: (result => renderImage(result))
            });
        };

        const getStream = () => {
            showModal(false);
            $.ajax({
                url: settings.modalUrl,
                data: { ...settings },
                error: (err) => render(err.statusText),
                success: (result) => render(result)
            });
        }

        this.setCurrent = () => {
            textForm = $(settings.textForm);
            const promptImage = $(settings.promptImg);
            let text = defaultText;

            FF5.all
                // first add all FF5 users from sessionStorage
                .map((user, index) => {
                    return {
                        term: `[FF${index + 1}]`,
                        replace: '@' + user.screen_name
                    };
                })
                // Apply attributes for the current image
                .concat([
                    { term: '[date]', replace: promptImage ? promptImage.attr('data-prompt-date') : '' },
                    { term: '[THEME_1]', replace: promptImage ? promptImage.attr('data-prompt-theme1') : '' },
                    { term: '[THEME_2]', replace: promptImage ? promptImage.attr('data-prompt-theme2') : '' }
                ])
                // then iterate through the results and update the default text
                .forEach(r => text = text.replace(r.term, r.replace));
            textForm.val(text);
        }

        this.addUser = (params) => {
            setCurrent();
        }

        ////////////////////////////////////
        // EVENT BINDINGS
        let me = this;
        this.click(e => {
            const mid = me.attr('id');
            const bid = $(settings.closeButton).attr('id');
            const cid = $(e.target).attr('id');
            if (cid === mid || cid == bid) {
                showModal(false);
            }
        });

        $(settings.showButton).click(e => getStream());

        $('body').on('click', '.PostPromptButton',(e) => {
            $.ajax({
                url: '/api/postPrompt',
                type: 'GET',
                contentType: 'application/json',
                data: {
                    statusText: params.statusText(),
                    imageUrl: params.imageUrl(),
                    ff5_users: FF5.asString
                },
                error: (err) => FF5.dispatch(FF5.Events.notice, err.statusText),
                success: (result) => {
                    showModal(false);
                    FF5.clear();
                    FF5.dispatch(FF5.Events.notice, `Tweet posted!\n${JSON.stringify(result.data)}`);
                }
            });
        });
        
        $('body').on('click', '.SchedulePromptButton',(e) => {
            $.ajax({
                url: '/api/schedulePrompt', 
                type: 'GET',
                contentType: 'application/json',
                data: {
                    statusText: params.statusText(),
                    imageUrl: params.imageUrl(),
                    date: params.scheduled_date(),
                    ff5_users: FF5.asString
                },
                error: (err) => FF5.dispatch(FF5.Events.notice, err.statusText),
                success: (result) => {
                    showModal(false);
                    FF5.clear();
                    FF5.dispatch(FF5.Events.notice, `Tweet scheduled!\n${params.scheduled_date()}`);
                }
            });
        });

        return this;
    };

}(jQuery));