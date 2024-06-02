import React, { useState, useEffect } from "react";

function BMRCalculations() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetch(`http://localhost:8081/users/`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const height = user.height;
  const weight = user.weight;
  const age = new Date().getFullYear() - new Date(user.birth_date).getFullYear();
  const BMR = 10 * weight + 6.25 * height - 5 * age + 5;

  const activity_factor = user.activity_factor || 1;
  const TDEE = (BMR * activity_factor).toFixed();

  return (
    <div>
      <p>
        Your basic metabolic rate is <b>{BMR}</b> calories
      </p>
      <p>
        Taking in count that your activity factor is <b>{activity_factor}</b>,
        your Total Daily Energy Expenditure is: <b>{TDEE}</b> kcal
      </p>
      <p>Good healthy calorie deficit vary from 500 to 300 calories</p>
      <p>
        Taking that in count you should eat from <b>{TDEE - 500}</b> to{" "}
        <b>{TDEE - 300}</b> calories
      </p>
      <p>
        Also taking in count that you want to build muscle, you should eat from
        1.2 to 1.7 grams of protein per kg of your body mass, which is{" "}
        <b>{Math.round(weight * 1.2)}</b> - <b>{Math.round(weight * 1.7)}</b>{" "}
        grams
      </p>
    </div>
  );
}

export default BMRCalculations;
