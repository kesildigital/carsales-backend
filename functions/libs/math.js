const recalculateAvg = (oldAvg, oldCount, newValue) => {
  const newAvg = (oldAvg * oldCount + newValue) / (oldCount + 1)

  return Number(newAvg.toFixed(2))
}

module.exports = {
  recalculateAvg
}
