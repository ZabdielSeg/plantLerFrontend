class FilterService {

    sortByName = products => {
        const sorted = [...products].sort((a, b) => {
            if (a.plantName.toLowerCase() > b.plantName.toLowerCase()) { return 1 }
            if (b.plantName.toLowerCase() > a.plantName.toLowerCase()) { return -1 }
            return 0;
        });
        return sorted
    }

    sortByCost = products => {
        const sorted = [...products].sort((a, b) => a.price - b.price);
        return sorted;
    }

    onlyIndoor = products => {
        const filtered = [...products].filter(plant => plant.location === 'Indoor')
        return filtered;
    }

    onlyOutdoor = products => {
        const filtered = [...products].filter(plant => plant.location === 'Outdoor')
        return filtered;
    }
};

export default FilterService;