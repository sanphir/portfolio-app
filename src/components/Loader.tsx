import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react'
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
                position: 'fixed',
                width: '100%',
                height: '100vh',
            }}>
                <div style={{
                    position: 'relative',
                    top: '45%',
                    left: '47%'
                }} className='lds-dual-ring'></div>
            </div>)
            : 
            (
                <div style={{display: 'none'}}></div>
            )
    )
}

export default Loader