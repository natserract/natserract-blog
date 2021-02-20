import React from 'react'

declare global {
    declare type ComponentType<Props> = React.FunctionComponent<Props> | React.FC<Props> | null;

    interface PostI {
        title?: string;
        content?: string;
        excerpt?: string;
        date?: Date | number;
        slug?: string;
        author?: string;
        content?: string;
        coverImage?: string;
        coverImageAlt?: string;
    }
}
