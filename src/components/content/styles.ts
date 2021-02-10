export default (theme) => ({
    title: {
        marginBottom: '30px'
    },
    content: {
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
            display: 'block',
            opacity: '0.5',
        },
    }
})