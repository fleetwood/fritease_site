$(document).ready(function () {
    const streamContent = $('#stream-content');
    const streamLoading = $('#stream-loading');
    let page = 0;

    const urlParams = {};
    new URLSearchParams(window.location.search).forEach((v, k) => urlParams[k] = v);

    const render = (content, next = false) => {
        loadVisibility(false);
        if (next) {
            streamContent.append(content);
            const top = $(`#page_${page}`).offset().top - 40;
            $('html, body').animate({ scrollTop: top }, 800);
            return;
        }
        streamContent.html(content);
    }

    const formats = {
        moment: 'YYYY-MM-DD',
        picker: 'yyyy-mm-dd'
    };

    // because some tweets may have posted on Thursday
    const lastThursday = (yyyymmdd) => {
        let thurs = moment(yyyymmdd);
        while (thurs.day() !== 4) {
            thurs.add(-1, 'd');
        }
        return thurs.format(formats.moment);
    }

    const loadVisibility = (loading) => {
        const hidden = 'u-hiddenVisually';
        const set = loading ? [streamLoading, streamContent] : [streamContent, streamLoading];
        set[0].removeClass(hidden);
        set[1].addClass(hidden);
    }

    const getStream = (next = false) => {
        loadVisibility(true);
        $.ajax({
            url: "api/ui/friTease",
            data: {
                ...urlParams,
                friTease: true,
                retweets: false,
                next
            },
            error: (err) => {
                render(err.statusText);
            },
            success: (result) => {
                render(result, next);
            }
        });
    }

    $('body').on('click', '#more-tweets', (e) => {
        console.log($(e.currentTarget).attr('data-next'));
        getStream($(e.currentTarget).attr('data-next'));
        streamContent.append(`<span id="page_${++page}"><hr /></span>`);
        $(e.currentTarget).remove();
    });

    getStream();
});