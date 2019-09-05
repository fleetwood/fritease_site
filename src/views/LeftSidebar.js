import React from 'react';
import LeftSidebarItem from './items/LeftSideBarItem';

export default function LeftSidebar() {
    const title = 'Add title'
        , footer = 'Add footer'
        , items = [
            {
                title: 'John', 
                items: [
                    'This is one',
                    'This is two',
                    'This is three'
                ],
                footer: 'John Footer'
            },
            {
                title: 'Christina', 
                items: [
                    'This is Apple',
                    'This is Banana',
                    'This is Chrysanthemum'
                ],
                footer: 'Christina Feets'
            }
        ];
    return (
        <div id="dashboard-simplelist" class="module wtf-module js-wtf-module roaming-module has-content">

            <div class="flex-module">
                <div class="flex-module-header">
                    <h3>{title}</h3>
                </div>
                <div class="UserSmallListItem js-account-summary account-summary js-actionable-user">
                    <ul class="trend-items js-trends">
                        {items.map((index, item) => {
                            return <LeftSidebarItem key={index} item={items[item]} />
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