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
        } else if (rating <= 84 && rating > 74) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 75) * 5250000 + 8000000;
            }
            if (position == 'GK') {
                price = (rating - 75) * 2400000 + 4000000;
            }
            if (position == 'CAM' || position == 'RM' || position == 'LM' ||
                position == 'CM' || position == 'CDM') {
                price = (rating - 75) * 4000000 + 5000000;
            }
            if (position == 'LB' || position == 'RB' || position == 'CB' ||
                position == 'LWB' || position == 'RWB') {
                price = (rating - 75) * 3000000 + 5000000;
            }
        } else if (rating <= 74 && rating > 67) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 68) * 1000000 + 500000;
            }
            if (position == 'GK') {
                price = (rating - 68) * 500000 + 3000000;
            }
            if (position == 'CAM' || position == 'RM' || position == 'LM' ||
                position == 'CM' || position == 'CDM') {
                price = (rating - 68) * 500000 + 4000000;
            }
            if (position == 'LB' || position == 'RB' || position == 'CB' ||
                position == 'LWB' || position == 'RWB') {
                price = (rating - 68) * 500000 + 40000000;
            }
        } else if (rating <= 67 && rating > 61) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 62) * 50000 + 100000;
            }
            if (position == 'GK') {
                price = (rating - 62) * 100000 + 200000;
            }
        } else if (rating <= 61 && rating > 55) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 56) * 9000 + 50000;
            }
        } else if (rating <= 55 && rating > 49) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = (rating - 50) * 1500 + 40000;
            }
        } else if (rating <= 49) {
            if (position == 'ST' || position == 'CF' || position == 'LF' ||
                position == 'RF' || position == 'LW' || position == 'RW') {
                price = 39000 - (49 - rating) * 1000;
            }
        }

        return price;

    }
}

module.exports = new Pricer();