const chart = document.querySelector("#chart");

async function getData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    const currentDay = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(Date.now());

    const maxAmount = Math.max(...data.map((element) => element.amount));
    data.forEach((element) => {
      const bar = document.createElement("article");
      bar.classList.add("bar");

      const barHeight = (element.amount / maxAmount) * 100;

      if (element.day === currentDay.toLocaleLowerCase()) {
        bar.style.backgroundColor = "#87bec4";
      }
      bar.style.height = `${barHeight}%`;

      bar.innerHTML = `<span> ${element.day}
      </span>`;

      const tooltip = document.createElement("p");

      tooltip.classList.add("tooltip");
      tooltip.textContent = `$${element.amount}`;

      chart.appendChild(bar);
      bar.appendChild(tooltip);
    });
  } catch (err) {
    console.log("unable to fetch data!", err);
  }
}
getData();
