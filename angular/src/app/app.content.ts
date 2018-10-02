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
            register: 'Register',
            forgotPassword: 'Forgot password?'
        },
        register: {
            username: {
                label: 'Username',
                required: 'Username is required',
                pattern: 'Username cannot contain symbols or spaces'
            },
            email: {
                label: 'Email',
                required: 'Email is required',
                invalid: 'Email is invalid'
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
            scheduledMessages: 'Scheduled Messages',
            templates: 'Templates',
            manageProfile: 'Manage Profile',
            contacts: 'Contacts'
        },
        userManagement: {
            email: {
                label: 'New Email',
                required: 'Email is required',
                invalid: 'Email is invalid'
            },
            password: {
                labelCurrent: 'Current Password',
                labelNew: 'New Password',
                required: 'Password is required',
                minlength: 'Password must be at least 8 characters'
            },
            update: 'Update',
            cancel: 'Cancel',
            submitSuccess: 'User details updated!'
        },
        resetPassword: {
            username: {
                label: 'Username',
                required: 'Username is required',
                pattern: 'Username cannot contain symbols or spaces'
            },
            email: {
                label: 'Email',
                required: 'Email is required',
                invalid: 'Email is invalid'
            },
            password: {
                label: 'New Password',
                required: 'Password is required',
                minlength: 'Password must be at least 8 characters'
            },
            reset: 'Reset Password',
            cancel: 'Cancel',
            resetSuccess: 'Password was reset successfully!'
        }
    }
};
