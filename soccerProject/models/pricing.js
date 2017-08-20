class Pricer {
    choosePrice(rating, position, age) {
        var price = 0;
        if (rating > 84) {
            if (position == 'ST' || position == 'CF' || position == 'LF' || position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 85) * 10000000 + 50000000;
            }
        }
        return price;
    }
}

module.exports = new Pricer();
