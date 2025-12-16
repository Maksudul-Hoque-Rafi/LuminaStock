export const chartData = (data) => {
  const priceList = data.reverse();
  const points = [];
  const today = new Date();

  // Generate 30 days of data backwards from today to ensure the chart ends at current price
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    points.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: priceList[i].Close,
    });
  }

  return points.reverse();
  //   console.log("Price List is ", priceList);
  //   console.log("points is ", points.reverse());
};

export const syntheticChartData = (stockPrice) => {
  const points = [];
  let currentPrice = stockPrice;
  const today = new Date();

  // Generate 30 days of data backwards from today to ensure the chart ends at current price
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    points.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: currentPrice,
    });

    // Calculate previous day's price (reverse random walk)
    // volatility factor approx 2-3%
    const volatility = 0.03;
    const change = 1 + (Math.random() - 0.5) * volatility;
    currentPrice = currentPrice / change;
  }

  return points.reverse();
};
