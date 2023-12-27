
class Calendar {
    constructor() {
        this.currentDate = document.querySelector(".current-data");
        this.daysTag = document.querySelector(".days");
        this.prevNextIcon = document.querySelectorAll(".icons span");

        this.date = new Date();
        this.currYear = this.date.getFullYear();
        this.currMonth = this.date.getMonth();

        this.months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];

        this.renderCalendar();
        this.addIconListeners();
    }

    renderCalendar() {
        let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
        let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth()
                && this.currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }

        this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
        this.daysTag.innerHTML = liTag;
    }

    addIconListeners() {
        this.prevNextIcon.forEach(icon => {
            icon.addEventListener("click", () => { //ეს ასახავს ფუნქციის პარამეტრებს. ამ შემთხვევაში, ფუნქცია არ იღებს რაიმე პარამეტრს ეს განსაზღვრავს ისრის ფუნქციას. ეს არის JavaScript-ში ფუნქციის ჩაწერის მოკლე გზა.
                this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;

                if (this.currMonth < 0 || this.currMonth > 11) {
                    this.date = new Date(this.currYear, this.currMonth);
                    this.currYear = this.date.getFullYear();
                    this.currMonth = this.date.getMonth();
                } else {
                    this.date = new Date();
                }
                this.renderCalendar();
            });
        });
    }
}

const calendar = new Calendar();
