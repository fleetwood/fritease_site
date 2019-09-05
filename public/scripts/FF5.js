/**
 * @description A class to manage adding Users to sessionStorage
 * @see cref:comp/twitter/Users
 */
class FF5 {

    /**
     * @property {String} 'data-ff5-id
     */
    static get ff5tag() {
        return 'data-ff5-id';
    }

    /**
     * @property {String} "[FF5.ff5tag]"
     */
    static get ff5attr() {
        return `[${FF5.ff5tag}]`;
    }

    /**
     * 
     * @param {CustomEvent} event One of the FF5 custom events
     * @param {String} message Attach a message to the event
     * @see cref:Events
     */
    static dispatch(event, detail) {
        document.dispatchEvent(new CustomEvent(event, {bubbles:true, detail}));
    }

    /**
     * @property {CustomEvent} Events.updated 'When a user is added to or removed from FF5'
     * @property {CustomEvent} Events.notice "A notice or error from FF5"
     * @property {CustomEvent} Events.user.added "A user was added"
     * @property {CustomEvent} Events.user.removed "A user was removed"
     */
    static Events = {
        updated: 'ff5-updated',
        notice: 'ff5-notice',
        user: {
            added: 'ff5-user-added',
            removed: 'ff5-user-removed'
        }
    }

    /**
     * 
     * @param {Number} id Select a user from storage by id (Strings will be converted to Number)
     */
    static get(id) {
        let result = sessionStorage.getItem(id);
        if (result) {
            return JSON.parse(result);
        }
        return null;
    }

    /**
     * 
     * @param {Object} data The user's id and screen_name, bc Twitter is unreliable
     * @param {Number} data.user_id The user's twitter id
     * @param {String} data.screen_name The user's screen_name
     */
    static add(data) {
        if (sessionStorage.length >= 5) {
            FF5.dispatch(FF5.Events.notice,{message: 'Already five items in storage!'});
            return;
        }
        if (FF5.get(data.user_id)) {
            FF5.dispatch(FF5.Events.notice,{message: 'That user has already been added!'});
            return;
        }
        $.ajax({
            url: '/api/user',
            data,
            error: (err) => FF5.dispatch(FF5.Events.notice,{message: JSON.stringify(err)}),
            success: (result) => {
                sessionStorage.setItem(result.id, JSON.stringify(result));
                FF5.updateButtons();
                FF5.dispatch(FF5.Events.updated, {message: `<b>${result.name}</b> added!`, type: FF5.Events.user.added, id: result.id});
            }
        });
    }

    /**
     * 
     * @param {Object} data The user's id and screen_name, bc Twitter is unreliable
     * @param {Number} data.user_id The user's twitter id
     * @param {String} data.screen_name The user's screen_name (Not used)
     */
    static remove(data) {
        if (FF5.get(data.user_id)) {
            
        $.ajax({
            url: '/api/user',
            data,
            error: (err) => FF5.dispatch(FF5.Events.notice,{message: JSON.stringify(err)}),
            success: (result) => {
                sessionStorage.removeItem(data.user_id);
                FF5.updateButtons();
                FF5.dispatch(FF5.Events.updated,{ message: `<b>${result.name}</b> removed!`, type: FF5.Events.user.added, id: result.id});
            }
        });
        }
        else {
            FF5.dispatch(FF5.Events.notice, {message: `User ${data.user_id} not found.`});
        }
    }

    /**
     * @property {Number} count The number of items in FF5 sessionStorage
     */
    static get count() {
        return sessionStorage.length;
    }

    /**
     * @description The number of slots remaining.
     */
    static get remaining() {
        return 5 - FF5.count;
    }

    /**
     * @description Updates all buttons on screen with an attribute of _data-ff5-id_
     */
    static updateButtons() {
        let remaining = FF5.remaining
            , buttons = FF5.ff5attr+':not(.Icon--follow)';

        if (remaining<1) {
            $(buttons)
                .html(`FF5 FULL (${remaining})`)
                .parent().addClass('disabled');
        }
        else {
            $(buttons)
                .html(`Add (${remaining})`)
                .parent().removeClass('disabled');
        }
    }

    /**
     * @function all Returns all items in the FF5 sessionStorage
     */
    static get all() {
        let all = [];
        for (var i = 0; i < sessionStorage.length; i++){
            let item = sessionStorage.getItem(sessionStorage.key(i));
            all.push(item);
        }
        return all.map(u => JSON.parse(u));
    }

    /**
     * Get all objects in a semi-colon separated string, ex "_{id:123,user_name:sue};{...}_"
     */
    static get asString() {
        let all = [];
        for (var i = 0; i < sessionStorage.length; i++){
            let item = sessionStorage.getItem(sessionStorage.key(i));
            all.push(item);
        }
        return JSON.stringify(all.map(u => {
            let t = JSON.parse(u);
            return {id: t.id, screen_name: t.screen_name};
        }));
    }

    /**
     * @function clear Removes all items from FF5 sessionStorage
     */
    static clear() {
        sessionStorage.clear();
        FF5.updateButtons();
        FF5.dispatch(FF5.Events.updated,{message: 'Storage cleared!'});
    }

    static FF5_User_Data(e) {
        const t = $(e.target);
        return {
            user_id: Number(t.attr('data-ff5-id')), 
            screen_name: t.attr('data-ff5-name')
        }
    }
    
    static init() {
        
        $('body').on('click', '.Add-FF5-User', (e) => {
            FF5.add(FF5.FF5_User_Data(e));
        });

        $('body').on('click', '[data-ff5-remove-id]', (e) => {
            const t = $(e.target);
            const data = {
                user_id: Number(t.attr('data-ff5-remove-id'))
            }
            FF5.remove(data);
        });

        $('body').on('click', '#global-ff5-clear', (e) => {
            FF5.clear();
        });

        document.addEventListener(FF5.Events.notice,(e) => {
            OnRender.showAlert({title: 'FF5 Notice', message: e.detail.message, type: 'warning'});
        });

        document.addEventListener(FF5.Events.updated,(e) => {
            OnRender.showAlert({title: 'FF5 updated.', message: e.detail.message, type: 'success'});
        });

        FF5.updateButtons();
    }
}

exports = FF5;