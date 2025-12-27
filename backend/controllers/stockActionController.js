import { prisma } from "../lib/prisma.js";

export const toggleWatchList = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { watchlist: true },
    });

    const watchList = user.watchlist.map((item) => item.symbol);
    const inWatchlist = watchList.includes(req.body.symbol);

    if (inWatchlist) {
      // delete action
      const updatedUser = await prisma.user.update({
        where: { id: req.userId },
        data: {
          watchlist: {
            delete: {
              userId_symbol: { userId: req.userId, symbol: req.body.symbol },
            },
          },
        },
        include: { watchlist: true },
        omit: { password: true },
      });
      res.status(200).json(updatedUser);
    } else {
      // insert action
      const updatedUser = await prisma.user.update({
        where: { id: req.userId },
        data: { watchlist: { create: { symbol: req.body.symbol } } },
        include: { watchlist: true },
        omit: { password: true },
      });
      res.status(201).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const trade = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { portfolio: true },
    });

    const type = req.body.type;
    const quantity = req.body.quantity;
    const symbol = req.body.symbol;
    const price = req.body.price;

    const presentCashBalance = Number(user.cashBalance);
    const tradeValue = quantity * price;
    const portfolioItem = user.portfolio.find((p) => p.symbol === symbol);

    if (type === "buy") {
      if (tradeValue > presentCashBalance) {
        return res.status(200).json({
          userInfo: null,
          errorMessage: "Insufficient funds to complete this purchase.",
        });
      }

      if (portfolioItem) {
        // Average down logic
        const totalCost =
          portfolioItem.quantity * Number(portfolioItem.avgBuyPrice) +
          tradeValue;
        const newQty = portfolioItem.quantity + quantity;
        const updatedUser = await prisma.user.update({
          where: { id: req.userId },
          data: {
            cashBalance: presentCashBalance - tradeValue,
            portfolio: {
              update: {
                where: {
                  userId_symbol: { userId: req.userId, symbol: symbol },
                },
                data: { quantity: newQty, avgBuyPrice: totalCost / newQty },
              },
            },
          },
          include: { portfolio: true, watchlist: true },
          omit: { password: true },
        });
        return res.status(200).json({
          userInfo: updatedUser,
          errorMessage: "",
        });
      } else {
        // New portfolio item
        const updatedUser = await prisma.user.update({
          where: { id: req.userId },
          data: {
            cashBalance: presentCashBalance - tradeValue,
            portfolio: {
              create: {
                symbol: symbol,
                quantity: quantity,
                avgBuyPrice: price,
              },
            },
          },
          include: { portfolio: true, watchlist: true },
          omit: { password: true },
        });
        return res.status(200).json({
          userInfo: updatedUser,
          errorMessage: "",
        });
      }
    } else {
      // Sell logic
      if (!portfolioItem) {
        return res.status(200).json({
          userInfo: null,
          errorMessage: "You do not own this stock.",
        });
      }

      if (quantity > portfolioItem.quantity) {
        return res.status(200).json({
          userInfo: null,
          errorMessage: "Cannot sell more shares than you own.",
        });
      }

      const newQty = portfolioItem.quantity - quantity;

      if (newQty <= 0) {
        // Closed position
        const updatedUser = await prisma.user.update({
          where: { id: req.userId },
          data: {
            cashBalance: presentCashBalance + tradeValue,
            portfolio: {
              delete: { userId_symbol: { userId: req.userId, symbol: symbol } },
            },
          },
          include: { portfolio: true, watchlist: true },
          omit: { password: true },
        });
        return res.status(200).json({
          userInfo: updatedUser,
          errorMessage: "",
        });
      } else {
        // Reduced quantity

        const updatedUser = await prisma.user.update({
          where: { id: req.userId },
          data: {
            cashBalance: presentCashBalance + tradeValue,
            portfolio: {
              update: {
                where: {
                  userId_symbol: { userId: req.userId, symbol: symbol },
                },
                data: { quantity: newQty },
              },
            },
          },
          include: { portfolio: true, watchlist: true },
          omit: { password: true },
        });
        return res.status(200).json({
          userInfo: updatedUser,
          errorMessage: "",
        });
      }
    }
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
