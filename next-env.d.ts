import React from 'react'

declare global {
    declare type ComponentType<Props> = React.FunctionComponent<Props> | React.FC<Props> | null;
}
