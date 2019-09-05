import React from 'react';

export default function Navbar() {
    return (
        <div className="topbar js-topbar">
            <div className="global-nav" data-section-term="top_nav">
                <div className="global-nav-inner">
                    <div className="container">
                        <h1 className="Icon Icon--bird bird-topbar-etched">
                            <span className="visuallyhidden">Twitter</span>
                        </h1>
                        <div className="pushstate-spinner"></div>
                        <div role="navigation" style={{display: 'inline-block'}}>
                            <ul className="nav js-global-actions" id="global-actions">
                                <li id="global-nav-home" className="home active" data-global-action="home">
                                    <a className="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="/FriTease" data-component-context="home_nav" data-nav="home" data-original-title="">
                                        <span className="Icon Icon--home Icon--large"></span>
                                        <span className="Icon Icon--homeFilled Icon--large u-textUserColor"></span>
                                        <span className="text" aria-hidden="true">FriTease</span>
                                    </a>
                                </li>
                                <li className="people notifications" data-global-action="connect">
                                    <a className="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="http://twitter.com" target="top" data-component-context="connect_nav" data-nav="connect" data-original-title="">
                                        <span className="Icon Icon--notifications Icon--large"></span>
                                        <span className="Icon Icon--notificationsFilled Icon--large u-textUserColor"></span>
                                        <span className="text" aria-hidden="true">Twitter</span>
                                    </a>
                                </li>
                                <li className="people notifications" data-global-action="connect">
                                    <a className="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="https://twitter.com/i/notifications" target="top" data-component-context="connect_nav" data-nav="connect" data-original-title="">
                                        <span className="Icon Icon--notifications Icon--large"></span>
                                        <span className="Icon Icon--notificationsFilled Icon--large u-textUserColor"></span>
                                        <span className="text" aria-hidden="true">Notifications</span>
                                        <span className="count">
                                            <span className="count-inner">[TODO: Get notifications]</span>
                                        </span>
                                    </a>
                                </li>
                                <li className="people notifications" data-global-action="connect">
                                    <a className="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="/icons" data-component-context="connect_nav" data-nav="connect" data-original-title="">
                                        <span className="Icon Icon--cog Icon--large"></span>
                                        <span className="text" aria-hidden="true">Icons</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="pull-right nav-extras">
                            <div role="search">
                                <form className="t1-form form-search js-search-form" action="/search" id="global-nav-search">
                                    <label className="visuallyhidden" for="search-query">Search query</label>
                                    <input className="search-input" type="text" id="search-query" placeholder="Search FriTease" name="q" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-owns="typeahead-dropdown-5" />
                                    <span className="search-icon js-search-action">
                                        <button type="submit" className="Icon Icon--medium Icon--search nav-search" tabindex="-1">
                                            <span className="visuallyhidden">Search FriTease</span>
                                        </button>
                                    </span>
                                </form>
                            </div>
                            <ul className="nav right-actions">
                                <li className="me dropdown session js-session" data-global-action="t1me" id="user-dropdown">
                                    <a href="/#" className="btn js-tooltip settings dropdown-toggle js-dropdown-toggle" id="user-dropdown-toggle" title="Profile and settings" data-placement="bottom" rel="noopener noreferrer" role="button" aria-haspopup="true">
                                        <img className="Avatar Avatar--size32" src="https://pbs.twimg.com/profile_images/1129065277633781760/gMIz7IPd_normal.jpg" alt="Profile and settings" data-user-id="805852551090470914" />
                                    </a>
                                    <div className="DashUserDropdown dropdown-menu dropdown-menu--rightAlign is-forceRight is-autoCentered">
                                        <div className="dropdown-caret">
                                            <span className="caret-outer"></span>
                                            <span className="caret-inner"></span>
                                        </div>
                                        <ul>
                                            <li className="DashUserDropdown-userInfo" data-name="user-info">
                                                <a href="/johnfpendleton" className="DashUserDropdown-userInfoLink js-nav" data-nav="view_profile">
                                                    <b className="fullname">John Pendleton 🌹</b><span className="UserBadges"></span>
                                                    <p className="name"><span className="username u-dir u-textTruncate" dir="ltr">@<b>johnfpendleton</b></span></p>
                                                </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="current-user" data-name="profile">
                                                <a href="/johnfpendleton" className="js-nav" data-nav="view_profile">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--me"></span>Profile
                                                </a>
                                            </li>
                                            <li data-name="lists">
                                                <a className="js-nav" href="/johnfpendleton/lists" data-nav="all_lists">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--list"></span>Lists
                                                </a>
                                            </li>
                                            <li data-name="moments">
                                                <a className="js-nav" href="/johnfpendleton/moments" data-nav="all_moments">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--lightning"></span>Moments
                                                </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                                <a href="https://ads.twitter.com/subscriptions/mobile/landing?ref=gl-tw-tw-promote-mode" target="_blank" data-nav="promote-mode" rel="noopener noreferrer">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--promoteMode"></span>Promote Mode
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://ads.twitter.com/?ref=gl-tw-tw-twitter-ads" target="_blank" data-nav="ads" rel="noopener noreferrer">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--promotedStroked"></span>Twitter Ads
                                                </a>
                                            </li>
                                            <li>
                                                <a className="user-dropdown-analytics" href="https://analytics.twitter.com/" target="_blank" data-nav="user_dropdown_analytics" rel="noopener noreferrer">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium Icon--analytics"></span>Analytics
                                                </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li><a href="/settings" data-nav="settings" className="js-nav" rel="noopener noreferrer">Settings and privacy</a>
                                            </li>
                                            <li><a href="//support.twitter.com" data-nav="help_center" rel="noopener noreferrer">Help Center</a></li>
                                            <li className="js-keyboard-shortcut-trigger" data-nav="shortcuts">
                                                <button type="button" className="dropdown-link">Keyboard shortcuts</button>
                                            </li>
                                            <li id="signout-button" data-nav="logout">
                                                <button type="button" className="dropdown-link js-logout-button">Log out <span className="username u-dir u-textTruncate" dir="ltr">@<b>johnfpendleton</b></span></button>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="current-user nightmode-toggle" data-name="profile">
                                                <a className="js-nav" data-nav="view_profile">
                                                    <span className="DashUserDropdown-linkIcon Icon Icon--medium js-nightmode-icon Icon--lightBulbOff">
                                                    </span><span className="js-nightmode-label">Dark mode</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li role="complementary" aria-labelledby="global-new-tweet-button" className="topbar-tweet-btn">
                                    <button id="global-new-tweet-button" className="js-global-new-tweet js-tooltip EdgeButton EdgeButton--primary js-dynamic-tooltip" data-placement="bottom" data-component-context="new_tweet_button">
                                        <span className="text">Tweet</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="alert-container"></div>
        </div>
    )
}