class OnRender {
    static watchRender(element, cb) {
        let timeout = 100;
        const watcher = setInterval(() => {
            const stop = () => clearInterval(watcher);
            if ($(element).length) {
                console.log(`${element} ready!`);
                stop();
                if (cb) {
                    cb();
                }
                else {
                    console.warn('Undefined callback.')
                }
            }
            else if (timeout > 100) {
                console.log(`Unable to render ${element}?`);
                stop();
            }
            timeout += 1;
        }, 100);
    }

    /**
     * 
     * @param {Number} timeout Time to wait in seconds.
     * @param {Function} cb Callback method.
     */
    static waitThen(timeout, cb) {
        const timer = setInterval(() => {
            clearInterval(timer);
            cb();
        }, timeout*1000);
    }

    /**
     * @param {String} options.type _(Optional)_ 'success', 'danger', 'warning', 'info'  Default: _'info'_
     * @param {String} options.title Title of alert.
     * @param {String} options.message The message for the alert.
     */
    static showAlert(options) {
        const rand = (x = 0, y = 9) => {
            return Math.floor(Math.random() * (y - x) + x);
        };
        const guid = (salt = 'XXXXXX-99999-XXXXXX', lower = true) => {
            let sep = salt.match(/[^0-9a-zA-Z\d\s:]/);
            sep = sep && sep[0] ? sep[0] : '-';
            const vals = salt.split(sep)
                , alpha = (lower ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('')
                , pad = (val, len) => {
                    let res = val.toString();
                    while (res.length < len) {
                        res = `0${res}`;
                    }
                    return res;
                };
            return vals.map(r =>
                isNaN(r)
                    ? r.split('').map(rm => alpha[rand(0, alpha.length)]).join('')
                    : pad(rand(0, r), r.toString().length)
            ).join(sep);
        };
        let title = options.title ? `<strong>${options.title}</strong><br />` : '';
        let type = options.type || 'info';
        let id = guid();
        let auto = type !== 'warning' && type !== 'danger';
        $('#alert-container').append(`
        <div id="${id}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            ${title}
            ${options.message}
        </div>
        `);
        // unless a warning or danger, automatically close
        if (auto) {
            OnRender.waitThen(4,() => {
                $(`#${id}`).alert('close');
            });
        }
    }
}

exports = OnRender;
