class Pricer {
    choosePrice(rating, position, age) {
        var price = 0;
        if (rating > 84) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 85) * 10000000 + 60000000;
            }
            if (position == 'GK') {
                price = (rating - 85) * 5000000 + 30000000;
            }
            if (position == 'CAM' || position == 'RM' || position == 'LM' ||
                position == 'CM' || position == 'CDM') {
                price = (rating - 85) * 7000000 + 50000000;
            }
            if (position == 'LB' || position == 'RB' || position == 'CB' ||
                position == 'LWB' || position == 'RWB') {
                price = (rating - 85) * 6000000 + 40000000;
            }
        }
        return price;
    }
}

module.exports = new Pricer();
