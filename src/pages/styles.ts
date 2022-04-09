export default (theme) => ({
    title: {},
    introSection: {
        padding: '5px 0 20px',
    },
    blogSection: {
        "& h2": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 'solid 2px #1d1d27',
            paddingBottom: '7px',
            marginBottom: 25,
            fontSize: 41,
            fontWeight: 600,
        }
    },
    toc: {
        fontSize: 16,
        fontWeight: 300,
        fontStyle: 'italic',
    },
    introImg: {
        
    }
});