import { useEffect, useCallback } from 'react'

export const useLoadingIndicator = (state, setState) => {
    useEffect(() => {
        if (state) document.body.classList.add('loading-indicator')
        return () => document.body.classList.remove('loading-indicator')
    }, [state])

    const handleClick = useCallback(() => setState(true), [])

    return handleClick
}