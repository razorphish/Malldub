/* jshint -W079 */
var mockData = (function () {
    return {
        getMockCustomers: getMockCustomers,
        getMockContacts: getMockContacts,
        getMockAdditionalRoles: getMockAdditionalRoles,
        setContact: setContact,
        getMockStates: getMockStates,
        blackWidow: getMockCustomers()[0]
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockCustomers() {
        return [
            {
                id: 1017109,
                firstName: 'Black',
                lastName: 'Widow',
                city: 'Albany',
                state: 'NY',
                zip: '12205',
                thumbnail: 'colleen_papa.jpg'
            },
            {
                id: 1017105,
                firstName: 'Tony',
                lastName: 'Stark',
                city: 'Loudonville',
                state: 'NY',
                zip: '12211',
                thumbnail: 'john_papa.jpg'
            },
            {
                id: 1017108,
                firstName: 'Clint',
                lastName: 'Barton',
                city: 'Bothell',
                state: 'WA',
                zip: '98012',
                thumbnail: 'ward_bell.jpg'
            },
            {
                id: 1017104,
                firstName: 'Steve',
                lastName: 'Rogers',
                city: 'Orlando',
                state: 'FL',
                zip: '33746',
                thumbnail: 'jesse_liberty.jpg'
            },
            {
                id: 1017106,
                firstName: 'Thor',
                lastName: 'of Asgard',
                city: 'Raleigh',
                state: 'NC',
                zip: '27601',
                thumbnail: 'jason_salmond.jpg'
            }
        ];
    }

    function getMockContacts() {
        return [
            {
                OBJID: 1017109,
                FIRST_NAME: 'Black',
                LAST_NAME: 'Widow',
                city: 'Albany',
                state: 'NY',
                JOB_TITLE: 'test 1'
            },
            {
                OBJID: 1017105,
                FIRST_NAME: 'Tony',
                LAST_NAME: 'Stark',
                city: 'Loudonville',
                state: 'NY',
                JOB_TITLE: 'test 2'
            },
            {
                OBJID: 1017108,
                FIRST_NAME: 'Clint',
                LAST_NAME: 'Barton',
                city: 'Bothell',
                state: 'WA',
                JOB_TITLE: 'test 3'
            },
            {
                OBJID: 1017104,
                FIRST_NAME: 'Steve',
                LAST_NAME: 'Rogers',
                city: 'Orlando',
                state: 'FL',
                JOB_TITLE: 'test 4'
            },
            {
                OBJID: 1017106,
                FIRST_NAME: 'Thor',
                LAST_NAME: 'of Asgard',
                city: 'Raleigh',
                state: 'NC',
                JOB_TITLE: 'test 5'
            }
        ];
    }

    function getMockAdditionalRoles() {
        return [
            { 'ROLE_NAME': 'Billing Contact' },
            { 'ROLE_NAME': 'Business Office' },
            { 'ROLE_NAME': 'Dealer Principal' },
            { 'ROLE_NAME': 'Decision Maker' },
            { 'ROLE_NAME': 'Fixed Ops Director' },
            { 'ROLE_NAME': 'Fixed Ops Manager' },
            { 'ROLE_NAME': 'General Manager' },
            { 'ROLE_NAME': 'Marketing Manager' },
            { 'ROLE_NAME': 'New Sales Mgr.' },
            { 'ROLE_NAME': 'Owner' },
            { 'ROLE_NAME': 'Parts Manager' },
            { 'ROLE_NAME': 'Pre-Owned Sales Mgr.' },
            { 'ROLE_NAME': 'Sales Advisor' },
            { 'ROLE_NAME': 'Sales Primary' },
            { 'ROLE_NAME': 'Service Advisor' },
            { 'ROLE_NAME': 'Service Director' },
            { 'ROLE_NAME': 'Service Manager' },
            { 'ROLE_NAME': 'System Administrator' }
        ];
    }

    function setContact() {
        return [
           { 'STATUS': 0, 'MESSAGE': 'Success' }
        ];
    }
})();
