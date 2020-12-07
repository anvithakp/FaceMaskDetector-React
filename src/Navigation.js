import React from 'react';
import { Nav, initializeIcons } from '@fluentui/react';

const navigationStyles = {
    root: {
        height: '100vh',
        width: '25vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
        paddingTop: '12vh',
    },
};

const navLinks = [
    {
        links: [
            {
                name: 'DashBoard',
                key:'dashboard',
                url: '/',
                iconProps: {
                    iconName: 'ExploreData',
                    styles: {
                        root: {
                            fontSize: 30,
                            color: '#106ebe',
                        },
                    }
                }
            },
        ],
    },
];

const Navigation = () => {
    initializeIcons();
    return (
        <Nav
            groups={navLinks}
            selectedKey='dashboard'
            styles={navigationStyles}
        />
    );
};

export default Navigation;