// This code is a modified version of the code featured here 
// https://blog.andri.co/021-building-a-stylish-masonry-layout-using-just-css-and-javascript/
// Credit to Adrico Karoula

export function SimpleMasonry( parent: HTMLElement, elementQuery: string, width: number ) {
    const elements = parent.querySelectorAll( elementQuery ) as Iterable<HTMLElement>;
    masonry( parent, elements, width );
    window.addEventListener('resize', event => masonry(parent, elements, width));
}

export function masonry( parent: HTMLElement, elements: Iterable<HTMLElement>, width: number ) {
    const columns = generateColumns( parent, width );
    renderColumns( parent, elements, columns );
}

const generateColumns = ( parent: HTMLElement, width: number ): Array<HTMLDivElement> => {
    const numColumns  = Math.max(Math.floor(parent.getBoundingClientRect( ).width / width), 1);
    const columns: Array<HTMLDivElement> = Array(numColumns).fill(0).map( x => document.createElement('div'))
    for(const column of columns) {
        column.className = 'simple-masonry-column';
        if( numColumns > 1 ) column.style.width = width + 'px';
        else column.style.width = "100%";
    }
    return columns;
}

const renderColumns = ( parent: HTMLElement, elements:Iterable<HTMLElement>, columns: HTMLDivElement[] ) => {
    parent.classList.add('simple-masonry-gallery');
    while(parent.firstChild) parent.firstChild.remove( );
    parent.append( ...columns );
    for(const element of elements) placeElement( element, columns );
}

const placeElement = ( element: HTMLElement, columns: HTMLDivElement[] ) => {
    const heights = columns.map((x: HTMLDivElement, i: number) => {return x.offsetHeight });
    const min: number = Math.min(...heights);
    const index = heights.indexOf( min );
    element.classList.add('simple-masonry-item');
    columns[index].appendChild( element );

}