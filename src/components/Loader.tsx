import "../styles/loader.css"

interface LoaderProps {
    isDisplayed: boolean;
}

const Loader = (props: LoaderProps) => {
    const { isDisplayed } = props;
    return (
        isDisplayed ?
            (<div style={{
                backgroundColor: 'rgba(83, 129, 168, 0.5)',
                position: 'absolute',
                width: '100%',
                height: '100vh',
                zIndex: 10000
            }}>
                <div style={{
                    position: 'relative',
                    top: '45%',
                    left: '47%'
                }} className='lds-dual-ring'></div>
            </div>)
            :
            (
                <div style={{ display: 'none' }}></div>
            )
    )
}

export default Loader