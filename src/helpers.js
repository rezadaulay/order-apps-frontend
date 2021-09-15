import sortSolidIcon from './assets/img/sort-solid.svg'
import sortDownSolidIcon from './assets/img/sort-down-solid.svg'
import sortUpSolidIcon from './assets/img/sort-up-solid.svg'

export function SortImage(selected, direction) {
    if (selected && direction === 'asc') {
        return sortDownSolidIcon
    } else if (selected && direction === 'desc') {
        return sortUpSolidIcon
    } else {
        return sortSolidIcon
    }
}
