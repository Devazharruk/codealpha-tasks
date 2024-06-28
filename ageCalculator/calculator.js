const birthDay = document.querySelector("#birthDay");
const birthMonth = document.querySelector("#birthMonth");
const birthYear = document.querySelector("#birthYear");
const totalDays = document.querySelector("#totalDays");
const totalMonths = document.querySelector("#totalMonths");
const totalYears = document.querySelector("#totalYears");
const calculateBtn = document.querySelector(".calculateBtn");

const review = document.querySelector(".review");
const errorBox = document.querySelector(".errorBox");

const messages = {
    child: "You're a kid! Enjoy those cartoons and endless energy!",
    young:
        "You're young! Time to conquer the world (or at least your social media)!",
    adult: "You're an adult! Embrace the joys of adulting (like paying bills)!",
    legend: "You're a legend! You've got stories that could fill a library!",
};


// Funtion to Show the Error Message.
const showError = (message) => {
    errorBox.textContent = message;
    errorBox.classList.add("active");

    setTimeout(() => {
        errorBox.classList.remove("active");
    }, 2000);
};


// Function to add the Review text depends on user age.
const setReviewText = (ageYears) => {
    if (ageYears <= 10) {
        review.textContent = messages.child;
    } else if (ageYears >= 11 && ageYears <= 25) {
        review.textContent = messages.young;
    } else if (ageYears >= 26 && ageYears <= 60) {
        review.textContent = messages.adult;
    } else {
        review.textContent = messages.legend;
    }
};


// Function to calculate the age.
const calculateAge = () => {
    const day = parseInt(birthDay.value);
    const month = parseInt(birthMonth.value) - 1;
    const year = parseInt(birthYear.value);

    if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        day < 1 ||
        day > 31 ||
        month < 0 ||
        month > 11 ||
        year < 1900 ||
        year > new Date().getFullYear()
    ) {
        showError("Please Enter a Valid Date!!");

        return;
    }

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    setReviewText(ageYears);

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    totalYears.value = ageYears;
    totalMonths.value = ageMonths;
    totalDays.value = ageDays;

    review.style.visibility = "visible";
};

calculateBtn.addEventListener("click", calculateAge);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateAge();
    }
});
