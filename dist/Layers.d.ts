import React from 'react';
interface Props {
    layers: number;
    fade: boolean;
    children: React.ReactNode;
    direction: string;
    depth: string;
}
declare const Layers: React.MemoExoticComponent<({ layers, fade, children, direction, depth }: Props) => JSX.Element>;
export default Layers;
