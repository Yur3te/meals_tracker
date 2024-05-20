import React from 'react'

function BMRCalculations() {
    const height = 187
    const weight = 72
    const age = 19
    const BMR =  (10 * weight) + (6.25 * height) - (5 * age) + 5

    const activity_factor = 1.4
    const TDEE = (BMR * activity_factor).toFixed()
    // TODO: Zbierać dane z users z bazy danych

    return (
        <div>
            Your basic metabolic rate is {BMR} calories
            <br />
            Taking in count that your activity factor is <b>{activity_factor}</b>, your Total Daily Energy Expenditure is: <b>{TDEE}</b> kcal
            <br />
            Good healthy calorie deficit vary from 500 to 300 calories,
            taking that in count you should eat from <b>{TDEE - 500}</b> to <b>{TDEE - 300}</b> calories

        </div>
    )
}

export default BMRCalculations
