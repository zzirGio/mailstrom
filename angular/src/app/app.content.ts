export const content = {
    views: {
        landing: {
            title: 'Mailstrom',
            getStartedButton: 'Get Started',
            login: 'Login',
            register: 'Register'
        },
        login: {
            username: {
                label: 'Username',
                required: 'Username is required'
            },
            password: {
                label: 'Password',
                required: 'Password is required'
            },
            login: 'Login',
            register: 'Register'
        },
        register: {
            username: {
                label: 'Username',
                required: 'Username is required',
                pattern: 'Username cannot contain symbols or spaces'
            },
            password: {
                label: 'Password',
                required: 'Password is required',
                minlength: 'Password must be at least 8 characters'
            },
            register: 'Register',
            cancel: 'Cancel'
        },
        dashboard: {
            title: 'Mailstrom',
            create: 'Create',
            templates: 'Templates',
            manage: 'Manage',
            contacts: 'Contacts'
        }
    }
};