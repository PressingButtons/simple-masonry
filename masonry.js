// This code is a modified version of the code featured here 
// https://blog.andri.co/021-building-a-stylish-masonry-layout-using-just-css-and-javascript/
// Credit to Adrico Karoula
export function SimpleMasonry(parent, elementQuery, width) {
    const elements = parent.querySelectorAll(elementQuery);
    masonry(parent, elements, width);
    window.addEventListener('resize', event => masonry(parent, elements, width));
}
export function masonry(parent, elements, width) {
    const columns = generateColumns(parent, width);
    renderColumns(parent, elements, columns);
}
const generateColumns = (parent, width) => {
    const numColumns = Math.max(Math.floor(parent.getBoundingClientRect().width / width), 1);
    const columns = Array(numColumns).fill(0).map(x => document.createElement('div'));
    for (const column of columns) {
        column.className = 'simple-masonry-column';
        if (numColumns > 1)
            column.style.width = width + 'px';
        else
            column.style.width = "100%";
    }
    return columns;
};
const renderColumns = (parent, elements, columns) => {
    parent.classList.add('simple-masonry-gallery');
    while (parent.firstChild)
        parent.firstChild.remove();
    parent.append(...columns);
    for (const element of elements)
        placeElement(element, columns);
};
const placeElement = (element, columns) => {
    const heights = columns.map((x, i) => { return x.offsetHeight; });
    const min = Math.min(...heights);
    const index = heights.indexOf(min);
    element.classList.add('simple-masonry-item');
    columns[index].appendChild(element);
};
