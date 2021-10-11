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
            fontSize: 35,
            fontFamily: 'sans-serif',
            fontWeight: 600,
        }
    },
    toc: {
        fontSize: 14,
        fontWeight: 300,
        fontStyle: 'italic',
    }
});