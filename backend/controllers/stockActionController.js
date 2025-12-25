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
