// This code is a modified version of the code featured here 
// https://blog.andri.co/021-building-a-stylish-masonry-layout-using-just-css-and-javascript/
// Credit to Adrico Karoula
export function Masonry(parent, elementQuery, width) {
    const elements = parent.querySelectorAll(elementQuery);
    const columns = Math.max(Math.floor(parent.getBoundingClientRect().width / width), 1);
    renderColumns(parent, elements, new Array(columns).fill(0), width);
}
const renderColumns = (parent, elements, columns, width) => {
    parent.classList.add('simply-masonry-gallery');
    parent.style.gridTemplateColumns = `repeat(${columns.length}, ${width}px)`;
    for (const element of elements)
        placeElement(parent, element, columns);
};
const placeElement = (parent, element, columns) => {
    const min = Math.min(...columns);
    element.style.gridColumn = '' + columns.indexOf(min);
    parent.appendChild(element);
};
