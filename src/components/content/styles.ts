export default (theme) => ({
    title: {
        lineHeight: '1.2',
        marginBottom: '20px',

        [theme.breakpoints.only("xs")]: {

        },
    },
    content: {
        paddingBottom: '30px',
        "& blockquote": {
            borderLeft: 'solid 4px #d2d6db',
            padding: '0 0 0 20px',
            margin: '0 0 15px',
        },
        "& code:not(.hljs)": {
            padding: '.2em .4em',
            margin: '0',
            fontSize: '85%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px',
        },
        "& .img-float": {
            [theme.breakpoints.up('sm')]: {
                float: 'right',
                width: '120px',
                height: '145px',
                marginLeft: '15px',
            }
        },
        "& small": {
            fontSize: '16px',
            display: 'block',
            opacity: '0.5',
        },
        "& ol": {
            padding: '0 0 0 20px',
        },
        "& .section-group-about": {
            margin: "0 0 35px",

            "&.noMargin": {
                margin: 0,
            },
            "& ul": {
                padding: '0',
                listStyleType: 'none',
            },

            "& strong": {
                fontWeight: 'bold',
            }
        },
        "& .container-sm": {
            maxWidth: '500px',
        }
    }
})