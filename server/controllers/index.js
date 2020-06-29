import { models } from "../config";

export const getRows = async (req, res) => {
  const rows = await models.Row.findAll({
    include: [
      {
        model: models.Cell,
        as: "cells",
      },
    ],
  });

  res.json({ rows });
};

export const saveCell = async (req, res) => {
  const { column, rowId, value } = req.body;
  const [row, created] = await models.Row.findOrCreate({
    where: { id: rowId },
    defaults: { id: rowId },
  });

  let [cell, cellCreated] = await models.Cell.findOrCreate({
    where: { rowId, column },
    defaults: { value, column, rowId },
  });

  if (cellCreated) {
    return res.json({ cell });
  }
  cell = await cell.update({ value });
  res.json({ cell });
};
