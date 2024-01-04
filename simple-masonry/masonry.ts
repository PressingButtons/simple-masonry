// This code is a modified version of the code featured here 
// https://blog.andri.co/021-building-a-stylish-masonry-layout-using-just-css-and-javascript/
// Credit to Adrico Karoula

export function Masonry( parent: HTMLElement, elementQuery: string, width: number ) {
    const elements = parent.querySelectorAll( elementQuery ) as Iterable<HTMLElement>;
    const columns  = Math.max(Math.floor(parent.getBoundingClientRect( ).width / width), 1);
    renderColumns( parent, elements, new Array(columns).fill(0), width );
}

const renderColumns = ( parent: HTMLElement, elements:Iterable<HTMLElement>, columns: number[], width: number ) => {
    parent.classList.add('simply-masonry-gallery');
    parent.style.gridTemplateColumns = `repeat(${columns.length}, ${width}px)`;
    for(const element of elements) placeElement( parent, element, columns );
}

const placeElement = ( parent: HTMLElement, element: HTMLElement, columns: number[] ) => {
    const min = Math.min(...columns);
    element.style.gridColumn = '' + columns.indexOf(min);
    parent.appendChild( element );
}