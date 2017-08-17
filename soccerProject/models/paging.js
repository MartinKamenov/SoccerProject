class PageHandler {
    handle(collection, page, size) {
        let i = 1;
        const filteredCollection = [];
        let pagesNum = Math.ceil(collection.length / size);
        if (pagesNum < 1) {
            pagesNum = 1;
        }
        if (page < 1 || page > pagesNum) {
            const error = 'Page is above / bellow range.';
            return { error };
        }

        let index = (i + ((page - 1) * size) - 1);
        while (index < collection.length && i <= size) {
            filteredCollection.push(collection[index++]);
            i++;
        }
        const showPages = [];
        if (page > 1 && page < pagesNum) {
            showPages.push(page - 1, page, page + 1);
        } else if (page === 1 && pagesNum > 2) {
            showPages.push(page, page + 1, page + 2);
        } else if (page === pagesNum && pagesNum > 2) {
            showPages.push(page - 2, page - 1, page);
        } else {
            for (let j = 1; j <= pagesNum; j += 1) {
                showPages.push(j);
            }
        }

        return {
            filteredCollection: filteredCollection,
            numberOfPages: pagesNum,
            navigationNumbers: showPages,
        };
    }

    choosePage(page) {
        if (!page) {
            page = 1;
        } else if (isNaN(page)) {
            const error = 'Page is not a number.';
            return { error };
        } else {
            page = parseInt(page, 10);
        }

        return page;
    }
}

// @ts-ignore
module.exports = new PageHandler();
