import React from 'react';
interface Props {
    depth: string;
    direction: string;
    event: string;
    eventRotation: string;
    eventDirection: string;
    fade: boolean;
    layers: number;
    perspective: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}
declare const Ztext: React.FC<Props>;
export default Ztext;
