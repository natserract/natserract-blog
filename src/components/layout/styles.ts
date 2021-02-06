export default (theme) => ({
    mainLayout: {
        background: 'rgb(255, 255, 255) none repeat scroll 0% 0%',
        maxWidth: '50%',
        overflow: 'hidden',
        margin: '0 auto',
        padding: '25px 35px',
        minHeight: '100vh',

        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%',
        },

        [theme.breakpoints.only('xs')]: {
            padding: '15px',
        }
    },

    contentContainer: {

    }
})