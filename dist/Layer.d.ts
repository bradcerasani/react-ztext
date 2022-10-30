import React from 'react';
interface Props {
    index: number;
    transform: string;
    opacity: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}
declare const Layer: React.MemoExoticComponent<({ index, opacity, transform, children }: Props) => JSX.Element>;
export default Layer;
