import React, { Component } from 'react';

export default function LeftSidebarItem(props) {
    const item = props.item;
    return (
        <li class="trend-item js-trend-item promoted-trend context-trend-item" data-trend-name="{{name}}">
            <hr />
            <span class="u-linkComplex-target trend-name" dir="ltr"><strong>{item.title}</strong></span>
            <a class="pretty-link js-nav js-tooltip u-linkComplex promoted" href="#"
                data-query-source="promoted_trend_click" dir="ltr">
                <div class="js-nav trend-item-context js-ellipsis">
                    <ul>
                        {item.items.map((index, i) => {
                            return <li key={index}>{item.items[i]}</li>
                        })}
                    </ul>
                </div>

                <span class="with-icn js-disclosure js-tooltip" title="">
                    <span class="Icon Icon--small Icon--promoted"></span>
                    <b class="promoted-text">{item.footer}</b>
                </span>
            </a>
        </li>
    )
}
