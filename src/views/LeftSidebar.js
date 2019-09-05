import React from 'react';
import LeftSidebarItem from './items/LeftSideBarItem';

export default function LeftSidebar(props) {
    const title = props.title || ''
        , footer = props.footer || ''
        , items = props.items || [];

    return (
        <div id="dashboard-simplelist" class="module wtf-module js-wtf-module roaming-module has-content">

            <div class="flex-module">
                <div class="flex-module-header">
                    <h3>{title}</h3>
                </div>
                <div class="UserSmallListItem js-account-summary account-summary js-actionable-user">
                    <ul class="trend-items js-trends">
                        {items.list.map((index, item) => {
                            return <LeftSidebarItem key={index} item={items.list[item]} />
                        })}
                    </ul>
                </div>
            </div>
            <div class="flex-module import-prompt">
                <div class="flex-module-footer u-table">
                    {footer}
                </div>
            </div>
        </div>
    )
}