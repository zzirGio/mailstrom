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
            scheduledMessages: 'Messages',
            templates: 'Templates',
            manageProfile: 'Manage Profile',
            contacts: 'Contacts',
            recentMessages: {
                title: 'Recent Messages',
                placeholder: 'No recent messages...'
            },
            upcomingMessages: {
                title: 'Upcoming Messages',
                placeholder: 'No upcoming messages...'
            },
            glyphicons: {
                contacts: 'contacts',
                create: 'create',
                schedule: 'schedule',
                settings: 'settings',
                template: 'template',
                speech: 'speech',
                chatBubbleBlue: 'chat-bubble-blue',
                chatBubbleGreen: 'chat-bubble-green',
            },
            stats: {
                numScheduled: {
                    title: 'Schedule',
                    description: 'total messages scheduled'
                },
                numSent: {
                    title: 'Messages',
                    description: 'messages sent'
                },
                numContacts: {
                    title: 'Contacts',
                    description: 'total contacts'
                },
                numTemplates: {
                    title: 'Templates',
                    description: 'total templates'
                },
                na: 'N/A'
            }
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
