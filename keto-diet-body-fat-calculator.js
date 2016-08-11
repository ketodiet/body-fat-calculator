/**
 * Created by ketodiet on 03/07/2016.
 *
 * More information & a working example can be found at http://ketodietapp.com/Blog/page/KetoDiet-Buddy
 *
 */

var Gender = {
    FEMALE: 0,
    MALE: 1
};

class KetoDietBodyFatCalculator {

    //
    // Construct the KetoDietBodyFatCalculator calculator
    //
    // params *must* include:
    //    gender (see Gender)
    //    age (in years, can be float)
    //    Triceps (mm)
    //    Suprailiac (mm)
    //    Umbilicus (mm)
    //    Thigh (mm)
    //
    // see index.jsx for an example on how to use this class
    //
    static calculateJacksonPollockBodyFat(params) {

        function getSafe(value, min, max) {
            return Math.min(Math.max(min, value), max);
        }

        function roundBodyfat(floatValue) {
            return parseFloat(floatValue.toFixed(1));
        }

        var gender = params.gender;
        var age = getSafe(params.age, 0, 150);
        var triceps = getSafe(params.triceps, 0, 150);
        var suprailiac = getSafe(params.suprailiac, 0, 150);
        var umbilicus = getSafe(params.umbilicus, 0, 150);
        var thigh = getSafe(params.thigh, 0, 150);

        var bodyFat = 0;

        var sum = triceps + suprailiac + umbilicus + thigh;
        var sum2 = sum * sum;

        /* calculate BMR */
        switch (gender){
            default:
            case Gender.FEMALE:
                bodyFat = (.29669 * sum) - (.00043 * sum2) + (.02963 * age) + 1.4072;
                break;
            case Gender.MALE:
                bodyFat = (.29288 * sum) - (.0005 * sum2) + (.15845 * age) - 5.76377;
                break;
        }

        return roundBodyfat(bodyFat);
    }
}

//
// Exports
//

module.exports = {
    KetoDietBodyFatCalculator: KetoDietBodyFatCalculator,
    Gender: Gender,
};
